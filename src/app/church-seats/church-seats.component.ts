import { Component, OnInit } from '@angular/core';
import { ChurchService } from '../services/church.service';
import { FormArray, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { LiturgicalCalendar } from '../models/chuch.info.model';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../user/services/users.services';
import { AuthService } from '../user/services/auth.service';
import { OdasService } from '../services/odas.service';
import { forkJoin } from 'rxjs';
import { adjustTimeZone } from '../shared/common';

@Component({
  selector: 'app-church-seats',
  templateUrl: './church-seats.component.html',
  styleUrls: ['./church-seats.component.css']
})
export class ChurchSeatsComponent implements OnInit {

  constructor(private _ChurchService: ChurchService, private toastr: ToastrService, private _UsersService: UsersService,
    private _AuthService: AuthService, private _OdasService: OdasService) { }

  ngOnInit() {
    this.getChurchOfUser()
  }
  currForm = new FormGroup({
    Details: new FormArray([])
  });
  churchId: any;
  churchName: any;

  getChurchOfUser() {
    this._UsersService.getUserById(this._AuthService.getUserId()).subscribe(user => {
      if(user.churches.length > 0){
        //get all details (odasat) in church
    this._ChurchService.getChurchInfo(user.churches[0].id).subscribe(a => {
      let res: any = a;
        this.churchName = a.name;
        this.churchId = a.id;
        debugger;
        if(!res.details || res.details.length <= 0) {
          res.details = [];
          this.Details.push(this.createFormDetail(null));
        }
        res.details.map((a, index) => {
        this.Details.push(this.createFormDetail(a))
      });
    });
  }
  });
  }
  get Details() {
    return this.currForm.get('Details') as FormArray;
  }

  createFormDetail(a: LiturgicalCalendar): AbstractControl {
    a = a != null ? a : new LiturgicalCalendar();
    if(a.date != null){
      debugger;
      a.date = new Date(a.date);

    }
    return new FormGroup({
      'id': new FormControl(a.id),
      'date': new FormControl(a.date),
      'StartTime': new FormControl(a.startTime),
      /* 'EndTime': new FormControl(a.endTime), */
      'availableSeats': new FormControl(a.availableSeats),
    });
  }
  addDetail(){
    this.Details.push(this.createFormDetail(null));
  }

  deletedIds = [];
  deleteDetail(event: any, i: number) {
    let ctrl = this.Details.controls[i];
    let existedId = ctrl.get('id').value;
    if(existedId > 0){
      this.deletedIds.push(existedId);
    }
    this.Details.removeAt(i);
    debugger;
  }
  convertTime(time){
    var res = time.split(' ');
    let result;
    if(res.length >= 1){
       result = res[0].split(':');
    }
    let val = {
      hour: +result[0],
      min: +result[1]
    }
    if(res.length >= 2){
      if(res[1] == "PM" || res[1] == "pm") {
        val.hour += 12
      }
    }
    return val;
  }
  save(){
    let v = this.currForm.value;
    let servicesArr = [];
    v.Details.forEach(element => {
      debugger;
      let tim = this.convertTime(element.StartTime);
      element.date = new Date(element.date.year(), element.date.month() +1, element.date.date(), tim.hour, tim.min);
      element.name = this.churchName + ' ' + adjustTimeZone(element.date).toISOString();
      element.capacity = element.availableSeats;
      element.church = {"id": this.churchId};
      element.type = "odas";
      delete element.StartTime;
      delete element.id;
      servicesArr.push(this._OdasService.create(element));
      /* this._OdasService.create(element).subscribe(a=> {
        debugger
      }); */
    });
    forkJoin(servicesArr).subscribe(results => {
      debugger
      this.toastr.success("Saved Successfully .. ");
    });
    /* v.deletedIds = this.deletedIds;
    v.churchId = this.churchId;
    debugger;
    this._ChurchService.update(v).subscribe(a =>{
      debugger;
      if(a == true) {
        this.toastr.success("Saved Successfully .. ");
      }
    }); */
  }
}

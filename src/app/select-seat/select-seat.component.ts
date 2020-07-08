import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChurchService } from '../services/church.service';
import { ChurchInfo } from '../models/chuch.info.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OdasService } from '../services/odas.service';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {

  constructor(private _OdasService: OdasService, private _BookingService: BookingService,
     private activeRoute: ActivatedRoute, private toastr: ToastrService) { }

  churchId: any;
  nationalId: any;
  odasat: any [];
  currChurch: ChurchInfo;
  currForm = new FormGroup({
    selectedSeats: new FormControl(null, Validators.required),
    Liturgy: new FormControl(null, Validators.required)
  });
  
  ngOnInit() {
    this._OdasService.getAll().subscribe(a => {
      debugger;
      this.odasat = a;
    });
    /* this.activeRoute.params.subscribe(params => {
      this.churchId = params['churchId'];
      
      if(this.churchId > 0){
        
      }
    }
    ); */
  }

  save(){
    debugger;
    let v = this.currForm.value;
    this._BookingService.create({"service":{"id":v.Liturgy},
    "numberOfPersons": v.selectedSeats}).subscribe(a => {
      if(a.errors && a.errors.lenght> 0) {
        this.toastr.error(a.errors[0]);
      }
      else{
        this.toastr.success("Saved Successfully .. ");
      }
    }, err => {
      debugger;
      this.toastr.error('An error happened during booking');
    })
  }
}

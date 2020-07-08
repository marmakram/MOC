import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UserModel } from '../models/User.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.services";
import { ToastrService } from 'ngx-toastr';
import { ChurchService } from 'src/app/services/church.service';
import { ChurchModel } from 'src/app/models/church.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isView: boolean = false;

  errorMessage: string;

  public RequestForm: FormGroup; 

  constructor(private router: Router, private activeRoute: ActivatedRoute, private userService : UsersService, 
    private churchService: ChurchService , private toastr: ToastrService) {

  }

  cancel() {
    this.router.navigate(['users/user-list']);
  }

  ngOnInit() {
    this.getAllPeople();
    this.activeRoute.params.subscribe(params => {
      this.currId = params['id'];
      if (this.router.url.indexOf('/view') > -1) {
        this.isView = true;
      }
      this.getCurrUser();
    });
    this.getAllChurches();
  
    var model = new UserModel();
    this.RequestForm = new FormGroup({
      userNumber: new FormControl(model.userNumber, Validators.required),
      password: new FormControl(model.password, Validators.required),
      confirmPassword: new FormControl(null, [IsMatchPasswordValid]),//
      arabicName: new FormControl(model.arabicName, Validators.required),
      englishName: new FormControl(model.englishName, Validators.required),
      email: new FormControl(model.email, [Validators.required]),//, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")
      primePhone: new FormControl(model.primePhone, [isMobileStartValid]),
      churchId: new FormControl(model.churchId, Validators.required),
      currUser: new FormControl(null),
      status: new FormControl()
    }, { validators: [] });
  }
  
  people: any[];

  getAllPeople() {
    this.userService.getAllUsers().subscribe(a => {
      debugger;
      this.people = a;//.filter(a => a.roles.length == 0);
    })
  }
  onSelectedUser(val) {//
    let a = val.option.value;
    debugger;
    if(a != null){
      this.RequestForm.patchValue(a);
      this.RequestForm.get('currUser').setValue(a);
    }
      
  }
  allChurches: ChurchModel[];
  getAllChurches() {
    this.churchService.getChurchList().subscribe(a => {
      debugger;
      this.allChurches = a;
    });
  }

  selectedUser: any;
  private getCurrUser() {
    if (this.currId) {
      this.userService.getUserById(this.currId).subscribe(a => {
        debugger;
        if (!a)
          return;

          debugger;
          this.RequestForm.patchValue(a);
          this.selectedUser = a;
          if(a.churches && a.churches.length > 0) {
            this.RequestForm.get('churchId').setValue(a.churches[0].id);
          }
        /* this.RequestForm.get('userNumber').setValue(a.userNumber);
        this.RequestForm.get('churchId').setValue(a.churchId);
        this.RequestForm.get('primePhone').setValue(a.primePhone);
        this.RequestForm.get('email').setValue(a.email);
        this.RequestForm.get('password').setValue(a.password);
        this.RequestForm.get('arabicName').setValue(a.arabicName); */
      });
    }
  }

  resendEmail() {
    this.userService.confirmMail(this.currId).subscribe(a => {
      console.log("mail");
      this.toastr.success("The mail has been sent Successfully ");
      this.getCurrUser();
    }
    );
  }

  isMailConfirmed: boolean = false;
  currId: any;

  saveUser() {
    if (this.RequestForm.valid) {
      let model: any = this.getDataFromForm();
      model.churches = [{id: model.churchId}]
      model.roles = [ {id: 2} ]
      if( model.currUser != null) {
        model.id = model.currUser.id;
        this.currId = model.id;
      }
      debugger;
      if (this.currId) {
        //TODO invoke edit user
        this.userService.updateUser(model).subscribe(a => {
          debugger;
          let res = a.data;
          if(res){
          this.toastr.success("Saved Successfully .. Redirecting");
          this.router.navigate(["/users/user-list"]);
          }
        }, error => console.log(error));
      }
      else{
        //TODO invoke Create user
        this.userService.saveUser(model).subscribe(a => {
          let res = a;
          if(res == 1){
            this.toastr.success("Saved Successfully .. Redirecting");
            this.router.navigate(["/users/user-list"]);
          }
        }, error => console.log(error));
      }
      
    }

  }

  private getDataFromForm() {
    let model = this.RequestForm.value;
    debugger;
   /*  model.userNumber = this.RequestForm.value.userNumber;
    model.primePhone = this.RequestForm.value.primePhone;
    model.email = this.RequestForm.value.email;
    model.churchId = this.RequestForm.value.churchId;
    model.arabicName = this.RequestForm.value.arabicName;
    model.password = this.RequestForm.value.password; */
    return model;
  }
  
  confirmPassword(): FormControl{
    return this.RequestForm.get('confirmPassword') as FormControl
  }
}

export const IsMatchPasswordValid: ValidatorFn = (group: FormControl): ValidationErrors | null => {
  let ismatchPassword: boolean = false;
  let isPasswordEmpty: boolean = false;
if(!group.parent) return null;

  var confirm = group.parent.get('confirmPassword').value;
  var pass = group.parent.get('password').value;
  isPasswordEmpty = !group.value;
  ismatchPassword = pass != confirm;
  //debugger;
  if (group.errors != null) {
    if (!ismatchPassword) {
      if (group.errors['matchPassword'] != null)
        delete group.errors.matchPassword;
    }
    if (!isPasswordEmpty) {
      if (group.errors['requiredPassword'] != null)
        delete group.errors.requiredPassword;
    }
  }
  if (isPasswordEmpty) {
    return { ...group.errors, 'requiredPassword': true }
  }
  if (ismatchPassword) {
    return { ...group.errors, 'matchPassword': true }
  }
  return group.errors;
}

export const isMobileStartValid: ValidatorFn = (group: FormControl): ValidationErrors | null => {
  if (group && group.value && ((group.value.length > 11 || group.value.length < 7) ||
    ! /^\d+$/.test(group.value))) {
    return { 'workPhoneIsInvalid': true }
  }
  else {
    return null;
  }
}
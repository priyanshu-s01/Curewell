import { Component, OnInit, DoCheck } from '@angular/core';
import { Doctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {

  doctorList: Doctor[];
  showMsgDiv: boolean = false;
  doctorId: number;
  errorMsg: string;
  status: boolean;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    //To do implement necessary logic
    this.getDoctor();
  }

  getDoctor() {
    //To do implement necessary logic
    this._curewellService.getDoctors().subscribe(
      responseProductData => {
        this.doctorList = responseProductData;
        this.showMsgDiv = false;
      },
      responseProductError => {
        this.doctorList = null;
        this.errorMsg = responseProductError;
        console.log(this.errorMsg);
      },
       () => console.log("Doctors Fetched Successfully")
    )
  }

  editDoctorDetails(doctor: Doctor) {

    //To do implement necessary logic
    this.router.navigate(['/editDoctorDetails', doctor.doctorId, doctor.doctorName]);
  }

  removeDoctor(doctor: Doctor) {
    //To do implement necessary logic
    this._curewellService.deleteDoctor(doctor).subscribe(
      responseRemoveDoctorStatus => {
        this.status = responseRemoveDoctorStatus;
        if (this.status) {
          alert("Doctor Details deleted successfully.");
         
        }
        else {
          let docName = doctor.doctorName;
          alert(docName + " not deleted");
        }
      },
      responseRemoveDoctorError => {
        this.errorMsg = responseRemoveDoctorError;
        alert("Some error occurred");
      },
      () => console.log("RemoveProductFromCart method executed successfully")
    );
  }

}

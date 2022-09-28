import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
  templateUrl: './update-doctor.component.html'
})
export class UpdateDoctorComponent implements OnInit {

  doctorId: number;
  doctorName: string;
  status: boolean = false;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
    //To do implement necessary logic
    this.doctorId = parseInt(this.route.snapshot.params['doctorId']);
    this.doctorName = this.route.snapshot.params['doctorName'];
  }

  editDoctorDetails(doctorname: string) {
    //To do implement necessary logic
    console.log(this.doctorName);
    console.log(typeof this.doctorId);
    this._cureWellService.editDoctorDetails(this.doctorId, doctorname).subscribe(
      responseUpdateDocDetails => {
        this.status = responseUpdateDocDetails;
        console.log(this.status);
        if (this.status) {
          alert(doctorname + " updated successfully");
          this.router.navigate(["/viewDoctors"]);
        }
        else {
          alert(doctorname + " not updated");
          
         this.router.navigate(["/viewDoctors"]);
        }
      },
      responseUpdateError => {
        this.errorMsg = responseUpdateError;
        alert("Some error occurred");
        this.router.navigate(["/viewDoctors"]);
      },
      () => console.log("Updated Doctor Details Successfully")
    );
  }
}

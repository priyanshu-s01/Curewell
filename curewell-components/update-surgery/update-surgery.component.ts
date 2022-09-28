import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Surgery } from '../../curewell-interfaces/surgery';

@Component({
  templateUrl: './update-surgery.component.html'
})
export class UpdateSurgeryComponent implements OnInit {

  doctorId: number;
  surgeryId: number;
  surgeryDate: Date;
  startTime: number;
  endTime: number;
  surgeryCategory: string;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
    //To do implement necessary logic
    this.surgeryId = parseInt(this.route.snapshot.params['surgeryId']);
    this.surgeryCategory = this.route.snapshot.params['surgeryCategory'];
    this.surgeryDate = this.route.snapshot.params['surgeryDate'];
    this.startTime = parseInt(this.route.snapshot.params['startTime']);
    this.endTime = parseInt(this.route.snapshot.params['endTime']);
    this.doctorId = parseInt(this.route.snapshot.params['doctorId']);
  }

  editSurgery(startTime: number, endTime: number) {
    //To do implement necessary logic
    this._cureWellService.editSurgery(this.doctorId, this.endTime, this.startTime, this.surgeryCategory, this.surgeryDate, this.surgeryId).subscribe(
      responseUpdateSurgery => {
        this.status = responseUpdateSurgery;
        if (this.status) {
          alert("Surgery Details Updated Successfully");
          this.router.navigate(['/viewTodaySurgery']);

        }
        else {
          alert("Surgery Details Not Updated");
          this.router.navigate(['/viewTodaySurgery']);
        }
        
      },
      responseErrorUpdate => {
        this.errorMsg = responseErrorUpdate;
        alert('Some error occurred')
        this.router.navigate(['/viewTodaySurgery']);
      },
      () => console.log("Updated Surgery Details Successfully")
    );
  }
}

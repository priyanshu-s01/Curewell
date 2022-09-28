import { Injectable } from '@angular/core';
import { Doctor } from '../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../curewell-interfaces/doctorspecialization';
import { Specialization } from '../curewell-interfaces/specialization';
import { Surgery } from '../curewell-interfaces/surgery';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  doctorList: Doctor[];
  surgeryList: Surgery[];
  specializationList: Specialization[];
  doctorSpecializationList: DoctorSpecialization[];

  constructor(private http: HttpClient) { }
  
  //GetDoctor
  getDoctors(): Observable<Doctor[]> {
    let temp = this.http.get<Doctor[]>("http://localhost:50476/api/CureWell/GetDoctors").pipe(catchError(this.errorHandler));
    return temp;
  }

  //GetSpecialization
  getAllSpecializations(): Observable<Specialization[]> {
    //To do implement necessary logic
    let temp = this.http.get<Specialization[]>("http://localhost:50476/api/CureWell/GetSpecializations").pipe(catchError(this.errorHandler));
  
    return temp;
  }

  //GetSurgeries
  getAllSurgeriesForToday(): Observable<Surgery[]> {
    //To do implement necessary logic
    let temp = this.http.get<Surgery[]>("http://localhost:50476/api/CureWell/GetAllSurgeryTypeForToday").pipe(catchError(this.errorHandler));
    return temp;
  }

  //AddDoctor
  addDoctor(doctorName: string): Observable<boolean> {

    //To do implement necessary logic
    var docObj: Doctor;
    docObj = {
      doctorName: doctorName,
      
    
    }
    let temp = this.http.post<boolean>("http://localhost:50476/api/CureWell/AddDoctor", docObj).pipe(catchError(this.errorHandler));
    return temp;
  }

  //EditDoctor
  editDoctorDetails(doctorId: number, doctorName: string): Observable<boolean> {
    //To do implement necessary logic
    var docObj: Doctor;
    docObj = {
      doctorId: doctorId,
      doctorName: doctorName,
    };
    let temp = this.http.put<boolean>("http://localhost:50476/api/CureWell/UpdateDoctorDetails", docObj).pipe(catchError(this.errorHandler));

    return temp;
  }

  //editSurgery
  editSurgery(doctorId: number, endTime: number, startTime: number, surgeryCategory: string, surgeryDate: Date, surgeryId: number): Observable<boolean> {
    //To do implement necessary logic
    var surObj: Surgery;
    surObj = {
      "doctorId": doctorId,
      "endTime": endTime,
      "startTime": startTime,
      "surgeryCategory": surgeryCategory,
      "surgeryDate": surgeryDate,
      "surgeryId": surgeryId
    }
    let temp = this.http.put<boolean>("http://localhost:50476/api/CureWell/UpdateSurgery", surObj).pipe(catchError(this.errorHandler));

    return temp;
  }

  //RemoveDoctor
  deleteDoctor(doctor: Doctor) {
    //To do implement necessary logic

    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: doctor };
    let temp = this.http.delete<boolean>('http://localhost:50476/api/CureWell/DeleteDoctor', httpOptions).pipe(catchError(this.errorHandler));

    return temp;
  }

  //ErrorHandler
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}

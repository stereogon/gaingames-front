import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../types';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  constructor(private http: HttpClient, private router: Router) {}

  url = 'http://localhost:8080/trainers/v1';

  getTrainerByIdObservable(trainerId: number) {
    return this.http.get<any>(`${this.url}/trainers/trainer-id/${trainerId}`);
  }

  getTrainersObservable() {
    return this.http.get<any>(`${this.url}/trainers`).pipe<Trainer[]>(
      map((response: any) => {
        let data: Trainer[] = response.map((dataObj: any) => {
          return {
            trainerId: dataObj.trainerId,
            name: dataObj.name,
            age: dataObj.age,
            gender: dataObj.gender,
            phone: dataObj.phone,
            hourlyRate: dataObj.hourlyRate,
            speciality: dataObj.speciality,
            experience: dataObj.experience,
            rating: dataObj.rating,
          };
        });

        return data;
      })
    );
  }

  postTrainer(trainer: Trainer) {
    this.http.post(`${this.url}/trainers`, trainer).subscribe(() => {
      this.router.navigate(['trainers', 'list']);
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Trainer } from 'src/app/types';
import { TrainerService } from '../../trainer.service';

function getRandomIntInclusive(mn: number, mx: number) {
  mn = Math.ceil(mn);
  mx = Math.floor(mx);
  return Math.floor(Math.random() * (mx - mn + 1) + mn); // The maximum is inclusive and the minimum is inclusive
}

@Component({
  selector: 'app-trainer-add',
  templateUrl: './trainer-add.component.html',
  styleUrls: ['./trainer-add.component.scss'],
})
export class TrainerAddComponent {
  trainerForm: FormGroup;
  private trainer: Trainer = {} as Trainer;

  constructor(private fb: FormBuilder, private trainerSvc: TrainerService) {
    this.trainerForm = this.fb.group({
      name: [''],
      experience: [''],
      gender: [''],
      hourlyRate: [''],
      phone: [''],
      rating: [''],
      speciality: [''],
      age: [''],
    });
  }

  onSubmit(): void {
    this.trainer = {
      ...this.trainerForm.value,
      trainerId: getRandomIntInclusive(0, 1000000),
    };
    console.log(this.trainer);
    this.trainerSvc.postTrainer(this.trainer);
  }
}

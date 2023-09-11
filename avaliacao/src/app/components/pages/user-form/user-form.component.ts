import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<User>();
  @Input() btnText?: string;

  userForm!: FormGroup;
  isSubmitClicked = false;

  constructor() {}

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.isSubmitClicked = true;
    if (this.userForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.userForm.value);
  }
}

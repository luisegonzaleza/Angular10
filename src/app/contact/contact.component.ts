import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactRequest } from '../model/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mesage: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  send(): void{
    const name = this.formContact.get('name')?.value;
    const email = this.formContact.get('email')?.value;
    const mesage = this.formContact.get('mesage')?.value;

    const data = {
      name: name,
      email: email,
      mesage: mesage
    } as ContactRequest;

    console.log(data);
  }

}

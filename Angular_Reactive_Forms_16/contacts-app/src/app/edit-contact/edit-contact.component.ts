import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  firstName = new FormControl();
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return
  }

  saveContact() {
    console.log(this.firstName.value + ' ' + this.lastName.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  firstName = new FormControl('Jack');
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      this.firstName.setValue(contact.firstName);
      this.lastName.setValue(contact.lastName);
      this.dateOfBirth.setValue(contact.dateOfBirth);
      this.favoritesRanking.setValue(contact.favoritesRanking);
    })
  }

  saveContact() {
    console.log(this.firstName.value + ' ' + this.lastName.value);
  }
}

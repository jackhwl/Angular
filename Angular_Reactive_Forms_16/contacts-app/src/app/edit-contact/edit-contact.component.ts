import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),
  })

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe(contact => {
      if (!contact) return;

      this.contactForm.controls.id.setValue(contact.id);
      this.contactForm.controls.firstName.setValue(contact.firstName);
      this.contactForm.controls.lastName.setValue(contact.lastName);
      this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.value).subscribe({
      next: () => this.router.navigate(['/contacts']),
    })
  }
}

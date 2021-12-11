import { Component, Input } from '@angular/core';

@Component({
  selector: 'nrwl-ngconf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = '';
}

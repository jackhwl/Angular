import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PersonContainerComponent } from './components/person-container-component/person-container.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { EditDisplayComponent } from './components/edit-display/edit-display.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { SavePersonComponentComponent } from './components/save-person-component/save-person-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PersonContainerComponent, PersonListComponent, EditDisplayComponent, EditPersonComponent, SavePersonComponentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

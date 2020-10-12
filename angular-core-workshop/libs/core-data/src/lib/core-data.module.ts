import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ProjectsService } from './projects/projects.service';
import { StateModule } from './state/state.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, StateModule],
  providers: [ProjectsService]
})
export class CoreDataModule {}

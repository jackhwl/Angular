import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ProjectsService } from './projects/projects.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ProjectsService]
})
export class CoreDataModule {}

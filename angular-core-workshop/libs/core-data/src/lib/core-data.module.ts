import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from './projects/projects.service';

@NgModule({
  imports: [CommonModule],
  providers: [ProjectsService]
})
export class CoreDataModule {}

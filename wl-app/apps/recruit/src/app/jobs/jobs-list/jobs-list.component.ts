import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Job } from '@wl/api-interfaces';

@Component({
  selector: 'wl-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {
  @Input() jobs: Job[];
  constructor() {}

  byId(job: Job) {
    return job.JobId;
  }

  ngOnInit(): void {}
}

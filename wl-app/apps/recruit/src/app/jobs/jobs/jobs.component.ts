import { Component, OnInit } from '@angular/core';
import { JobsFacade } from '@wl/core-state';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'wl-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  vm$ = combineLatest([this.facade.jobs$, this.facade.loading$]).pipe(
    filter(Boolean),
    map(([jobs, loading]) => ({
      jobs,
      loading
    }))
  );

  constructor(private facade: JobsFacade) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.facade.getAll();
  }
}

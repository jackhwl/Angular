import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');

    // this.crisis$ = this.service.getCrisis(id);

    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getCrisis(params.get('id')))
    );
  }

  gotoCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisList component can select that crisis.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], {
      relativeTo: this.route
    });
  }

  getCrisis(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.service.getCrisis(id).subscribe(crisis => (this.crisis = crisis));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    //this.crisisService.updateCrisis(this.crisis).subscribe(() => this.goBack());
  }
}

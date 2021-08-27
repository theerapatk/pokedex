import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnDestroy {

  readonly defaultMainUrl = '/admin/manage-trainers';

  fillerNav = [{
    relativePath: './manage-trainers',
    label: 'Manage Trainers'
  }, {
    relativePath: './pokedex',
    label: 'Pokédex App'
  }];

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  onRefreshClicked(): void {
    this.router.navigate(['/admin']);
  }

}

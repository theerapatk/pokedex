import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

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
    private workspaceService: WorkspaceService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    const lastVisitedUrl = this.workspaceService.getLastVisitedUrl() || this.defaultMainUrl;
    this.router.navigate([lastVisitedUrl]);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  onRefreshClicked(): void {
    this.router.navigate(['/admin']);
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-loading',
  templateUrl: './detail-loading.component.html',
  styleUrls: ['./detail-loading.component.scss']
})
export class DetailLoadingComponent {

  @Input() isLoading = false;

}

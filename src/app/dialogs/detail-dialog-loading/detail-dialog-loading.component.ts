import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-dialog-loading',
  templateUrl: './detail-dialog-loading.component.html',
  styleUrls: ['./detail-dialog-loading.component.scss']
})
export class DetailDialogLoadingComponent {

  @Input() isLoading = false;

}

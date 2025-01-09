import { Component } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.html',
  styleUrls: ['./back-arrow.scss']
})

export class BackArrowComponent {
  goBack() {
    window.history.back();
  }
}
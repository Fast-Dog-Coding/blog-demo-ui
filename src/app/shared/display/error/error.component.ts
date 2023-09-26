import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() error: HttpErrorResponse | Error | undefined
  @Input() title: string = 'Oops! Sorry About That'
  @Input() message: string = 'Something didn\'t go right.'

  get errorMessage(): string {
    if (this.error) {
      return JSON.stringify(this.error, null, 2);

    } else {
      return 'Unknown error';
    }
  }
}

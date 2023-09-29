import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Represents an error component that displays an error message.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() error: HttpErrorResponse | Error | undefined
  @Input() title: string = 'Oops! Sorry About That'
  @Input() message: string = 'Something didn\'t go right.'

  /**
   * Returns the error message.
   *
   * @returns {string} The error message. If an error object is available, it
   *    is converted to a formatted JSON string. If no error object is
   *    available, it returns 'Unknown error'.
   */
  get errorMessage(): string {
    if (this.error) {
      return JSON.stringify(this.error, null, 2);

    } else {
      return 'Unknown error';
    }
  }
}

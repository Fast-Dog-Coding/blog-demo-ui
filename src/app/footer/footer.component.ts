import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private startYear = 2023;

  copyright() {
    const thisYear = (new Date()).getFullYear();
    const thisYearStr = thisYear.toString(10);
    const startYearStr = this.startYear.toString(10);
    const yearRange = (this.startYear === thisYear ? thisYearStr : `${startYearStr}-${thisYearStr}`);

    return `© ${yearRange} Fast Dog Coding, LLC`
  }
}

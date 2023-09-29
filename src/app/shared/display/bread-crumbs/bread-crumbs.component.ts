import { Component, Input } from '@angular/core';
import { BreadCrumb } from '../../../models/bread-crumb';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: [ './bread-crumbs.component.css' ]
})
export class BreadCrumbsComponent {

  @Input() breadcrumbs: BreadCrumb[] = [];

  constructor() {
  }

}

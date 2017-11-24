import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMMM YYYY',
    monthLabel: 'MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DatePickerComponent implements OnInit {
  @Input('min')
  public set minDate(value: Moment | string) {
    this._minDate = moment(value);
  }

  @Input('max')
  public set maxDate(value: Moment | string) {
    this._maxDate = moment(value);
  }

  @Output() public onDateChange: EventEmitter<string> = new EventEmitter();
  private _minDate: Moment = moment().subtract(10, 'year');
  private _maxDate: Moment = moment().endOf('day');
  public date: FormControl = new FormControl(new Date());

  constructor(private adapter: DateAdapter<any>) {}

  ngOnInit() {
    this.onDateChange.emit(moment(this.date.value).format('DD.MM.YYYY'));
  }

  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.onDateChange.emit(moment(event.value).format('DD.MM.YYYY'));
  }

  public changeLocale(): void {
    this.adapter.setLocale('uk');
  }

  public get minDate(): Moment | string {
    return this._minDate;
  }

  public get maxDate(): Moment | string {
    return this._maxDate;
  }
}

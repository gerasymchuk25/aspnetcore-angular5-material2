import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements OnInit {

  @Output() public onDateChange: EventEmitter<Date> = new EventEmitter();

  public date: FormControl = new FormControl(new Date());

  constructor() { }

  ngOnInit() {
    this.onDateChange.emit(this.date.value);
  }

  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event);
    this.onDateChange.emit(event.value);
  }

}

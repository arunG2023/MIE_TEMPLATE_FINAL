import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-event-request',
  templateUrl: './new-event-request.component.html',
  styleUrls: ['./new-event-request.component.css']
})
export class NewEventRequestComponent implements OnInit {

  selectedEvent : string = 'select';

  // Event List -- TEST   *Will be from backend
  eventList : any[] = [
    {event_id: 1, name : 'Class I'},
    {event_id: 2, name : 'Webinar'},
    {event_id: 3, name : 'Medical Utility'},
    {event_id: 4, name : 'Stall Fabrication'},
    {event_id: 5, name : 'HCP Consultants'},
    {event_id: 6, name : 'Class II'},
    {event_id: 7, name : 'Class III'},
    {event_id: 8, name : 'Demo Meetings'},
    {event_id: 9, name : 'Hands on Training Workshops'},
    {event_id: 10, name : 'Class IV'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
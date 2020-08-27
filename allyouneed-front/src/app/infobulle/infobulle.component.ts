import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infobulle',
  templateUrl: './infobulle.component.html',
  styleUrls: ['./infobulle.component.css']
})
export class InfobulleComponent implements OnInit {

  @Input() movie;
  
  constructor() { }

  ngOnInit(): void {
  }

}

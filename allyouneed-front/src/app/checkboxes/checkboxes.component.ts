import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent implements OnInit{

  @Input() itemFound;
  @Input() itemInput;
  @Input() items;
  @Input() itemsSelectedFromMain
  @Output() itemsSelected = new EventEmitter();
  itemSelected: Array<string>;

  constructor() { 
    this.itemSelected = new Array();
  }

  ngOnInit(): void {
    for(let item of this.itemsSelectedFromMain){
      this.itemSelected.push(item)
    }
  }

  selected(selected: string){  
    if(typeof this.itemInput !== "undefined" && this.itemInput === selected){
      this.itemFound = false
    }
    this.items.splice(this.items.indexOf(selected), 1)
    this.itemSelected.push(selected)
    this.itemsSelected.next(this.itemSelected)
  }

  restored(restored: string){
    this.itemSelected.splice(this.itemSelected.indexOf(restored), 1)
    this.items.push(restored)
    this.itemsSelected.next(this.itemSelected)
  }

  showItemsExclus(){
    document.getElementById("itemsExclus").style.display = "block";
  }

  hideItemsExclus(){
    document.getElementById("itemsExclus").style.display = "none";
  }

}

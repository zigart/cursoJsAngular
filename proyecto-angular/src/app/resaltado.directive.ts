import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(public el:ElementRef) {
 
   
  }

  ngOnInit(){
   var element =  this.el.nativeElement;
   element.style.background = "#ccc";
   element.style.padding = "20px";
   element.style.marginTop = "15px";
   element.style.color = "#000000";
   element.innerText = element.innerText.toUpperCase();
  }

}

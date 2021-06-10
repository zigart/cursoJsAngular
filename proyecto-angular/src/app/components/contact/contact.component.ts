import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  
  public widthSlider: number | null;
  public anchuraToSlider: number | null;
  public caption: boolean;
  public autor:any;

  @ViewChild('textos',{static: true}) textos:any;


  

  constructor() {
    this.widthSlider = null;
    this.anchuraToSlider = null;
    this.caption = true;
  }

  ngOnInit(): void {
  
    console.log(this.textos.nativeElement.textContent);
   
  
  }

  cargarSlider(){
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = null;
  }

  getAutor(event:any){
    this.autor = event;
  }
}

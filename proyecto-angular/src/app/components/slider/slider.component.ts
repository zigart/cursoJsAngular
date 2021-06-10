import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number | null;
  @Input() etiquetas:boolean;
  @Output() conseguirAutor = new EventEmitter();

  public autor:any;

  constructor() { 
    this.anchura = null;
    this.etiquetas = false

    this.autor = {
      nombre:"Agustin Zigart",
      web: "no tengo",
      youtube: "tampoco"
    }
  }

  ngOnInit(): void {
    ($('.galeria')as any).bxSlider({
      mode: 'fade',
      captions: this.etiquetas,
      slideWidth: this.anchura
    });
  }

  lanzar(event:any){
    
    this.conseguirAutor.emit(this.autor);
  }

}

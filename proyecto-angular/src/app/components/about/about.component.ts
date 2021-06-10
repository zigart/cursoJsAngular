import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;
  constructor() {
    this.title = 'Agustín Zigart'
    this.subtitle = 'Desarrollador web frontend'
    this.email = 'agustinzigart@gmail.com'
   }

  ngOnInit(): void {
  }

}

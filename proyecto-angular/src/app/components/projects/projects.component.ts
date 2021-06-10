import { Component, OnInit } from '@angular/core';
import { Project} from '../../models/project';
import { projectServices} from '../../services/project.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[projectServices]
})
export class ProjectsComponent implements OnInit {
  public projects:Project[];
  public url: string;
  constructor(
    private _projectSerive: projectServices,

    
  ) { 
    this.projects = [];
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._projectSerive.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects = response.projects;
        }
      },
      error =>{
        console.log(error);
      }
    )
  }

}

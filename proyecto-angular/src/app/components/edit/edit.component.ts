import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { projectServices} from '../../services/project.service';
import { uploadService} from '../../services/upload.services';
import { global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [projectServices,uploadService]
})
export class EditComponent implements OnInit {

  public title: String;
  public project: any;
  public status: String = "";
  public filesToUpload: Array<File>;
  public save_project:any;
  public url: string;


  constructor(
    private _projectService: projectServices,
    private _uploadService: uploadService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) { 
    this.title = "Editar proyecto";
    this.filesToUpload = [];
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProject(id);
    })
  }

  getProject(id:string){
    this._projectService.getProject(id).subscribe(
      Response =>{
        this.project = Response.project;
      },
      error =>{
        console.log(<any>error);
      }
    )}

    onSubmit(form:any){
      this._projectService.editProject(this.project).subscribe(
        response => {
          if(response.project){
                //subir imagen
                if(this.filesToUpload){
                  this._uploadService.makeFileRequest(global.url + '/upload-image/' + response.project._id,[], this.filesToUpload, 'image').then((result:any)=>{
                    this.save_project = result.project;
                    this.status = 'success';
                  })
                }  
          }else{
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
      fileChangeEvent(fileInput: any){
        this.filesToUpload =<Array<File>>fileInput.target.files;
      }

}

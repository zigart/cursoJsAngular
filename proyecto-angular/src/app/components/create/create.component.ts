import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { projectServices} from '../../services/project.service';
import { uploadService} from '../../services/upload.services';
import { global } from '../../services/global';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [projectServices,uploadService]
})
export class CreateComponent implements OnInit {

  public title: String;
  public project: Project;
  public status: String = "";
  public filesToUpload: Array<File>;
  public save_project:any;
  public url: string;


  constructor(
    private _projectService: projectServices,
    private _uploadService: uploadService
  ) { 
    this.title = "crear proyecto";
    this.project = new Project('','','','','','','');
    this.filesToUpload = [];
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.project);

    this._projectService.saveProject(this.project).subscribe(
			response => {
				if(response.project){
					
           
          //subir imagen

          if(this.filesToUpload){
            
            this._uploadService.makeFileRequest(global.url + '/upload-image/' + response.project._id,[], this.filesToUpload, 'image').then((result:any)=>{

              this.save_project = result.project;
              this.status = 'success';
              form.reset();
            })

          }else{
            this.save_project = response.project;
            this.status = 'success';
            form.reset();
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



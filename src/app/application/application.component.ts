import { Component, OnInit, ɵExtraLocaleDataIndex } from '@angular/core';
import { Application } from './application.model';
import { ApplicationService } from './application.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {

  constructor(private appService:ApplicationService){}

  ngOnInit(): void {
    this.getApplications();
  }
  newApp:Application = {jobId:NaN, studentId:NaN, applicationDate:new Date(""),status:""};

   applicationList:Application[] = [];
   editingApplication:Application|null=null;
   updateApplication:Application={jobId:NaN, studentId:NaN, applicationDate:new Date(""),status:""};


  addApplication()
  {
    this.appService.addApplication(this.newApp).subscribe(result=> {
      this.applicationList.push(result);

      this.newApp = {jobId:NaN, studentId:NaN, applicationDate:new Date(""),status:""};

    })
  }

  getApplications()
  {
    this.appService.getApplications().subscribe(result=> {
      this.applicationList=result;
    })
  }

  editApplication(editApplication:Application) 
  {
     this.editingApplication=editApplication;
     this.updateApplication= {...editApplication}  // create a copy for editApplication
  }



  updateApplicationById()
  {
    this.appService.updateApplication(this.editingApplication!.applicationId!, this.updateApplication).subscribe(result=> {
      const index= this.applicationList.findIndex((app)=>app.applicationId == this.editingApplication!.applicationId);


      if(index!==-1)
      {
        this.applicationList[index]=result;
      }

    });

    this.updateApplication = {jobId:NaN, studentId:NaN, applicationDate:new Date(""),status:""};

  }


  deleteApplicationById() 
  {
    this.appService.deleteApplication(this.editingApplication!.applicationId!).subscribe(()=> 
    {
       this.getApplications();
    }
    );
  }

}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from './application.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient:HttpClient) { }

  apiURL= "http://localhost:8080/application"


  addApplication(a:Application):Observable<Application>
  {
    return this.httpClient.post<Application>(this.apiURL,a);
  }

  getApplications():Observable<Application[]>
    {
      return this.httpClient.get<Application[]>(this.apiURL);
    }

  updateApplication(applicationId:number, a:Application):Observable<Application>
  {
    return this.httpClient.put<Application>(this.apiURL+'/'+applicationId,a);
  }

  deleteApplication(applicationId:number)
  {
    return this.httpClient.delete(this.apiURL+'/'+applicationId);
  }


}

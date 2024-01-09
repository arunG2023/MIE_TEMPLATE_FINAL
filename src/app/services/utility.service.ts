import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private baseAPIUrl : string = environment.basiApiUrl;

  constructor(private http : HttpClient) { }

  // TO get event types
  getEventTypes(): Observable<any>{
    return this.http.get(this.baseAPIUrl+"/EventType/GetEventData")
  }

  // Get Roles
  getRoles(): Observable<any>{
    return this.http.get(this.baseAPIUrl+'/EventType/GetRoleData')
  }

  // Get employee details from Employee Master
  getEmployees(): Observable<any>{
    return this.http.get(this.baseAPIUrl+'/LoginAndRegister/GetSheetData')
  }

  // Add New Employees to User Role Master Sheet
  addEmployees(postData:any): Observable<any>{
    return this.http.post('http://localhost:5098/api/UserRoleMaster/AddData', postData)
  }

  // Get Added employees from UserRole Master sheet
  getAddedEmployees(): Observable<any>{
    return this.http.get(this.baseAPIUrl+'/UserRoleMaster/GetEventData')
  }

  // Get HCP roles from HCP Role Master
  getHcpRoles(): Observable<any>{
    return this.http.get(this.baseAPIUrl+'/EventType/GetHCPRoleData')
  }
  
  // Update employees:
  updateEmployees(putData:any): Observable<any>{
    return this.http.put(this.baseAPIUrl+'/UserRoleMaster/UpdateData',putData)
  } 



}

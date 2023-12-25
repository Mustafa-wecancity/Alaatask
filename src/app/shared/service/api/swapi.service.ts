import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  BaseUrl: string = "https://swapi.dev/api/people";
  constructor(private http: HttpClient) { }

  // GetPeople(type: string, page: number): Observable<any> {
  //   return this.http
  //     .get<any>(`${env.Server_URL}/` + type + '/' + '/' + page)
  //     .pipe(map((res) => res));
  // }



  GetPeople(page = 1) {
    return this.http.get(this.BaseUrl + '/?page=' + page);
  }
  OnePeople(name: any) {
    return this.http.get(this.BaseUrl + '?search=' + name);
  }

}

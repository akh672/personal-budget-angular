import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = []; // Initialize as an empty array

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    // Check if data is already populated
    if (this.data.length === 0) {
      // Make an HTTP call to fetch data from the backend
      return this.http.get('http://localhost:8000/budget');
    } else {
      // Return the data as an Observable
      return new Observable((observer) => {
        observer.next(this.data);
        observer.complete();
      });
    }
  }

  setData(data: any[]): void {
    this.data = data;
  }
}
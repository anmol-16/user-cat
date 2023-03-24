import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideCloudflareLoader } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:1010';
  userInfo = [];
  res: any = [];
  paginatedUser = [];

  constructor(private http: HttpClient) {}

  searchInput(event: any) {
    console.log(event, 'hjeelllo');
    return this.http.get(
      `${this.baseUrl}/api/63b6bacabf38bc2eb8d72307/search?firstName=` +
        `${event}`
    );
  }

  getFilteredList() {
    return this.res;
  }

  fetchUserInPagination(page: any) {
    // console.log(event,"hjeelllo");
    return this.http.get(
      `${this.baseUrl}/api/63b6bacabf38bc2eb8d72307/all-users?pageNumbers=` +
        `${page}`
    );
  }
  getPaginatedUsers() {
    return this.paginatedUser;
  }
  updateDetails() {
    return this.http.get(
      `${this.baseUrl}/api/63b6bacabf38bc2eb8d72307/all-users?pageNumbers=`);
  }
  deleteUser() {
    return this.http.get(
      `${this.baseUrl}/api/63b6bacabf38bc2eb8d72307/all-users?pageNumbers=`);
  }
}

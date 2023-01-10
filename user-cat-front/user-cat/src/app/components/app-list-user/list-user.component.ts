import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent {
  userInfo: any = [];
  allUserInfo: any = [];
  baseUrl: any = '';
  routeDa: Boolean = false;
  pageNumber: any = 1;
  isDisabled = true;
  searchInput = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userInfo = this.route.snapshot.data;
    this.allUserInfo = this.userInfo.listUser.data;
  }

  onSearch() {
    console.log(this.searchInput, 'heloooo');
    let input = this.searchInput;
    this.userService.searchInput(input).subscribe((response:any)=>{
      this.allUserInfo = response.data
      console.log(this.allUserInfo,"inside searchInput");
    });;
  }
  prevBtn() {
    this.pageNumber = this.pageNumber - 1;
    let page = this.pageNumber;
    if (page <= 1) {
      this.pageNumber = 0;
      this.ngOnInit();
      return;
    } else {
      this.allUserInfo = this.userService
        .fetchUserInPagination(page)
        .subscribe((response: any) => {
          this.allUserInfo = response.data;
          console.log(this.allUserInfo, 'my paginated users');
        });
    }
  }
  nextBtn() {
    this.pageNumber = this.pageNumber + 1;
    let page = this.pageNumber;
    this.userService.fetchUserInPagination(page).subscribe((response: any) => {
      this.allUserInfo = response.data;
    });
  }
  
}

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
  numberOfDocs: any = 0;
  totalPages = 0;
  tempArr:any = []
  tableHeadingList:any=  ['First Name','Last Name','Email','Phone Number','Image','Actions']
  pageIndex = 1;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userInfo = this.route.snapshot.data;
    this.numberOfDocs = this.userInfo.listUser.count;
    if (this.numberOfDocs % 3 != 0) {
      this.totalPages = Math.floor(this.numberOfDocs % 3) + 1;
    }
    else{
      this.totalPages = this.numberOfDocs / 3;
    }
    this.tempArr = Array(this.totalPages -1 ).fill(0).map((x,i)=>i);
    this.allUserInfo = this.userInfo.listUser.data;
  }

  onSearch() {
    console.log(this.searchInput, 'heloooo');
    let input = this.searchInput;
    this.userService.searchInput(input).subscribe((response: any) => {
      this.allUserInfo = response.data;
      console.log(this.allUserInfo, 'inside searchInput');
    });
  }
  prevBtn() {
    this.pageNumber = this.pageNumber - 1;
    this.pageIndex = this.pageIndex -1;
    let page = this.pageNumber;
    if (page <= 1) {
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
    this.pageIndex = this.pageIndex +1;
    let page = this.pageNumber;
    this.userService.fetchUserInPagination(page).subscribe((response: any) => {
      this.allUserInfo = response.data;
    });
  }
  pageSearch(particularPage:any){
    this.pageNumber = particularPage;
    let page = this.pageNumber;
    this.userService.fetchUserInPagination(page).subscribe((response: any) => {
      this.allUserInfo = response.data;
    });
  }
  updateBtn(id: any) {

  }

}

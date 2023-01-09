import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  userInfo:any = []
  allUserInfo :any= [];
  baseUrl:any = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
    ){
    }
    ngOnInit(){
        this.userInfo = this.route.snapshot.data;      
        this.allUserInfo = this.userInfo.listUser.data;  
    }

}

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
  p = 1;
  count = 10;
  constructor(
    private route: ActivatedRoute
    ){
    }
    ngOnInit(){
      this.userInfo = this.route.snapshot.data;
      this.allUserInfo = this.userInfo.listUser.data;
      
    }
    

}

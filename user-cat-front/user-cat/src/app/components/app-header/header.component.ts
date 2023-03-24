import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  baseUrl : String = 'http://localhost:1010'
  searchedQueryParams : String = ''
  searchInput:String = ''
  searchUserArr : any = []
  constructor(
    private http:HttpClient,
    private route:ActivatedRoute,
    private userService: UserService
    ){}


  
}

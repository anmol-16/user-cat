import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  baseUrl : String = 'http://localhost:1010'
  searchedQueryParams : String = ''
  searchInput:String = ''
  constructor(
    private http:HttpClient,
    private route:ActivatedRoute
    ){}


  onSearch(){
    console.log(this.searchInput,"helooooooooooooooooo");
    // console.log();
    
    return this.http.get(`${this.baseUrl}/api/63b6bacabf38bc2eb8d72307/search?firstName=`+`${this.searchInput}`);

  }
}

import { Component,Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-cat';
  userData : any= [];
  constructor(private route: ActivatedRoute) {}
  
}

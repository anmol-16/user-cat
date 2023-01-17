import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {
	
baseApiUrl = "https://localhost:1010/"
	
constructor(private http:HttpClient) { }

upload(file:any):Observable<any> {
	const formData = new FormData();
	formData.append("file", file, file.name);
	return this.http.post(`${this.baseApiUrl}/api/63b6bacabf38bc2eb8d72307/bulk-import`, formData)
}
}

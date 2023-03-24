import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable()
export class ListUserResolver implements Resolve<any> {
    constructor(
        private http: HttpClient,
    ) { }

    resolve(): Observable<any> | Promise<any> | any {

        let url = 'http://localhost:1010/api/63b6bacabf38bc2eb8d72307/all-users';

        return this.http.get(url);

    }
}
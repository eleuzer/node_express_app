import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Settings } from "app/util/settings";

@Injectable()
export class ProdutoService {

    constructor(private httpClient: HttpClient) {

    }

    insert(produto: any): Observable<any> {
        return this.httpClient.post(`${Settings.URL_SERVICE}/produto`, produto);
    }



}
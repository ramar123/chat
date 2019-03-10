import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class UserreportProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserreportProvider Provider');
  }

}

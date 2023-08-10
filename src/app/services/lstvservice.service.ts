import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LSTVServiceService {

  constructor(private http: HttpClient) { }

  private getUrl = 'http://localhost/lstvdatabase/selectall.php';
  private selectUrl = 'http://localhost/lstvdatabase/selectdata.php';

  private checkUrl = 'http://localhost/lstvdatabase/login.php';

  private addUrl = 'http://localhost/lstvdatabase/adddata.php';
  private updateUrl = 'http://localhost/lstvdatabase/updatedata.php';
  private deleteUrl = 'http://localhost/lstvdatabase/deletedata.php';

  private problem1c1Url = 'http://localhost/lstvdatabase/problem1c1.php';
  private problem1c2Url = 'http://localhost/lstvdatabase/problem1c2.php';
  private problem1c3Url = 'http://localhost/lstvdatabase/problem1c3.php';

  private problem2t1Url = 'http://localhost/lstvdatabase/problem2t1.php';
  private problem2t2Url = 'http://localhost/lstvdatabase/problem2t2.php';
  private problem2t3Url = 'http://localhost/lstvdatabase/problem2t3.php';

  private problem3Url = 'http://localhost/lstvdatabase/problem3.php';

  private problem4Url = 'http://localhost/lstvdatabase/problem4.php';

  private problem5Url = 'http://localhost/lstvdatabase/problem5.php';
  private problem5DUrl = 'http://localhost/lstvdatabase/problem5D.php';

  act?:number;

  checkCredentials(username: string, password:string): Observable<any> {
    return this.http.post<any>(this.checkUrl, { user:username, pass:password, query:1 });
  }

  addData(fn: string, ad:string, bd:string, ag:string, gn:string, st:string, cn:string, sl:string, activate:string): Observable<any> {
    let age = parseInt(ag, 10);
    let salary = parseFloat(sl);

    
    if(activate === "Inactive"){
      this.act = 0;
    }
    else if(activate === "Active"){
      this.act = 1;
    }

    if (isNaN(age)) {
      age = 0;
    }

    if (isNaN(age)) {
      salary = 0;
    }

    return this.http.post<any>(this.addUrl, { first:fn, addr:ad, bday:bd , ag:age , gen:gn , stat:st , cont:cn , sal:salary , acti:this.act , query:1 });
  }

  updateData(id:string, fn: string, ad:string, bd:string, ag:string, gn:string, st:string, cn:string, sl:string, activate:string): Observable<any> {
    let age = parseInt(ag, 10);
    let salary = parseFloat(sl);

    console.log(id)

    
    if(activate === "Inactive"){
      this.act = 0;
    }
    else if(activate === "Active"){
      this.act = 1;
    }

    if (isNaN(age)) {
      age = 0;
    }

    if (isNaN(age)) {
      salary = 0;
    }

    console.log(id);
    console.log(fn);
    console.log(ad);
    console.log(bd);
    console.log(ag);

    return this.http.post<any>(this.updateUrl, { recid:id, fn:fn, addr:ad, bday:bd , ag:age , gen:gn , stat:st , cont:cn , sal:salary , acti:this.act , query:1 });
  }

  deleteData(recid: string): Observable<any> {
    let id = parseInt(recid, 10);
    return this.http.post<any>(this.deleteUrl, { id:id, query:1 });
  }

  getData(recid: string): Observable<any> {
    let id = parseInt(recid, 10);
    return this.http.post<any>(this.selectUrl, { id:id, query:1 });
  }

  getAllData(): Observable<any> {
    return this.http.get<any>(this.getUrl);
  }

  getProb1c1(): Observable<any> {
    return this.http.get<any>(this.problem1c1Url);
  }

  getProb1c2(): Observable<any> {
    return this.http.get<any>(this.problem1c2Url);
  }

  getProb1c3(): Observable<any> {
    return this.http.get<any>(this.problem1c3Url);
  }

  getProb2t1(): Observable<any> {
    return this.http.get<any>(this.problem2t1Url);
  }

  getProb2t2(): Observable<any> {
    return this.http.get<any>(this.problem2t2Url);
  }

  getProb2t3(): Observable<any> {
    return this.http.get<any>(this.problem2t3Url);
  }

  getProb3(): Observable<any> {
    return this.http.get<any>(this.problem3Url);
  }

  getProb4(): Observable<any> {
    return this.http.get<any>(this.problem4Url);
  }

  getProb5(): Observable<any> {
    return this.http.get<any>(this.problem5Url);
  }

  getProb5D(): Observable<any> {
    return this.http.get<any>(this.problem5DUrl);
  }

}

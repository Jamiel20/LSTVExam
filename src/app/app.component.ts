import { Component, OnInit } from '@angular/core';
import { LSTVServiceService } from './services/lstvservice.service';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  fn:string = "";
  ad?:string;
  bd?:string;
  ag?:string;
  gn:string = "Male";
  cn?:string;
  sl?:string;

  id:string = "";

  showaddbtn:boolean = false;

  showerror1:boolean = false;
  showerror2:boolean = false;
  showerror3:boolean = false;
  showerror4:boolean = false;

  showm?:boolean = false;
  showf?:boolean = false;
  showo?:boolean = false;

  check?:boolean = false;

  crederror:boolean = false;

  showhome:boolean = false;
  showlogin:boolean = true;

  stat:boolean = false;
  status?:string;

  activate:string = "Inactive";

  selectedDate!: NgbDateStruct;
  selectedDate2!: NgbDateStruct;

  data: any;

  getdata: any;

  prob1c1data: any;
  prob1c2data: any;
  prob1c3data: any;

  prob2t1data: any;
  prob2t2data: any;
  prob2t3data: any;

  prob3data: any;

  prob4data: any;

  prob5data: any;
  prob5data2: any;
  prob5data3: any[] = [];

  sum1!: number;
  sum2!: number;
  sum3!: number;

  gt:number = 0;

  trntotdata!: number[];

  constructor(private service1: LSTVServiceService) {}

  ngOnInit(): void {

    const user = localStorage.getItem('user');
    const pass = localStorage.getItem('pass');

    if(user && pass){
      this.LogIn(user, pass);
    }

  }

  log1(event: any) {
    const inputVal = event.target.value;
    const inputLength = inputVal.length;
    if(inputLength == 0){
      this.showerror1 = true;
    }
    else{
      this.showerror1 = false;
      this.fn = inputVal;
    }

    this.showAdd();
  }

  log2(event: any) {
    const inputVal = event.target.value;
    if (!isNaN(inputVal)) {
      this.showerror2 = false;
      this.ag = inputVal;
    } else {
      this.showerror2 = true;
    }

    this.showAdd();

  }

  log3(event: any) {
    const inputVal = event.target.value;
    if (!isNaN(inputVal)) {
      this.showerror3 = false;
      this.cn = inputVal;
    } else {
      this.showerror3 = true;
    }

    this.showAdd();
  }

  log4(event: any) {
    const inputVal = event.target.value;
    if (!isNaN(inputVal)) {
      this.showerror4 = false;
      this.sl = inputVal;
    } else {
      this.showerror4 = true;
    }

    this.showAdd();
  }

  onOptionSelected(option: number) {

    if(option == 1){
      this.showm = true;
      this.showf = false;
      this.showo = false;
      this.gn = "Male";
    }
    else if(option == 2){
      this.showf= true;
      this.showm = false;
      this.showo = false;
      this.gn = "Female";
    }
    else if(option == 3){
      this.showo= true;
      this.showm = false;
      this.showf = false;
      this.gn = "Other";
    }
    
  }

  onOptionSelected2(option: number) {

    if(option == 1){
      this.status = "Single";
      this.stat = true;
    }
    else if(option == 2){
      this.status = "Married";
      this.stat = true;
    }
    else if(option == 3){
      this.status = "Seperated";
      this.stat = true;
    }
    else if(option == 4){
      this.status = "Widowed";
      this.stat = true;
    }
  
  }

  onActivate() {

    if(this.activate == "Inactive"){
      this.activate = "Active";
    }
    else{
      this.activate = "Inactive";
    }
  
  }

  showAdd(){
    if(this.showerror1 == false && this.showerror2 == false && this.showerror3 == false && this.showerror4 == false){
      this.showaddbtn = true;
    }
    else{
      this.showaddbtn = false;
    }
  }

  getInputValue(inputValue1: string, inputValue2: string) {

    this.ad = inputValue1;
    this.bd = inputValue2;

    if(this.ag === undefined || this.ag === null){
      this.ag = "";
    }

    if(this.status === undefined || this.status === null){
      this.status = "";
    }

    if(this.cn === undefined || this.cn === null){
      this.cn = "";
    }

    if(this.sl === undefined || this.sl === null){
      this.sl = "";
    }

    this.service1.addData(this.fn, this.ad, this.bd, this.ag, this.gn, this.status, this.cn, this.sl, this.activate).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      },
    });

    window.location.reload();

  }

  LogIn(username: string, password: string){

    this.service1.checkCredentials(username, password).subscribe({
      next: (response) => {

        if (!Array.isArray(response) || response.length === 0) {
          this.crederror = true;
        }

        else{

          this.showlogin = false;

          this.service1.getAllData().subscribe(response => {
            this.data = response;
            console.log(response);
          });

          localStorage.setItem('user', response[0].username);
          localStorage.setItem('pass', response[0].password);

          this.showhome = true;

        }

      },
      error: (error) => {
        console.error(error);
      },
    });

  }

  Logout(){

    localStorage.clear();
    window.location.reload();
  }

  DeleteId(recid:string){
    this.id = recid;
  }

  Delete(){
    this.service1.deleteData(this.id).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      },
    });

    window.location.reload();
  }

  UpdateId(recid:string){
    this.service1.getData(recid).subscribe(response => {
      this.getdata = response;

      this.fn = this.getdata[0].fullname;
      this.ad = this.getdata[0].address;
      this.bd = this.getdata[0].birthdate;
      this.ag = this.getdata[0].age;
      this.gn = this.getdata[0].gender;

      if(this.gn === "Male"){
        this.showm = true;
        this.showf = false;
        this.showo = false;
      }
      else if(this.gn === "Female"){
        this.showf= true;
        this.showm = false;
        this.showo = false;
      }
      else if(this.gn === "Other"){
        this.showo= true;
        this.showm = false;
        this.showf = false;
      }

      this.status = this.getdata[0].civilstat;

      this.cn = this.getdata[0].contactnum;
      this.sl = this.getdata[0].salary;
      this.activate = this.getdata[0].isactive;

      if(this.activate === "0"){
        this.check = false;
        this.activate = "Inactive";
      }
      else if(this.activate === "1"){
        this.check = true;
        this.activate = "Active";
      }
      

    });
  }

  updateInputValue(inputValue1: string, inputValue2: string) {

    this.id = this.getdata[0].recid;

    this.ad = inputValue1;
    this.bd = inputValue2;

    if(this.ag === undefined || this.ag === null){
      this.ag = "";
    }

    if(this.status === undefined || this.status === null){
      this.status = "";
    }

    if(this.cn === undefined || this.cn === null){
      this.cn = "";
    }

    if(this.sl === undefined || this.sl === null){
      this.sl = "";
    }

    this.service1.updateData(this.id, this.fn, this.ad, this.bd, this.ag, this.gn, this.status, this.cn, this.sl, this.activate).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      },
    });

    window.location.reload();

  }

  prob1(){

    this.service1.getProb1c1().subscribe(response => {

      this.prob1c1data = response;

      const trntotData = response.map((item: { trntot: any }) => parseInt(item.trntot, 10));

      this.sum1 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum1;

    });

    this.service1.getProb1c2().subscribe(response => {
  
      this.prob1c2data = response;
      const trntotData = response.map((item: { trntot: any }) => parseInt(item.trntot, 10));

      this.sum2 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum2;

    });

    this.service1.getProb1c3().subscribe(response => {

      this.prob1c3data = response;
      const trntotData = response.map((item: { trntot: any }) => parseInt(item.trntot, 10));

      this.sum3 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum3;

    });
    
  }

  prob2(){

    this.service1.getProb2t1().subscribe(response => {

      this.prob2t1data = response;

      const trntotData = response.map((item: { total: any }) => parseInt(item.total, 10));
      this.sum1 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum1;

    });

    this.service1.getProb2t2().subscribe(response => {

      this.prob2t2data = response;

      const trntotData = response.map((item: { total: any }) => parseInt(item.total, 10));
      this.sum2 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum2;

    });

    this.service1.getProb2t3().subscribe(response => {

      this.prob2t3data = response;

      const trntotData = response.map((item: { total: any }) => parseInt(item.total, 10));
      this.sum3 = trntotData.reduce((total: any, num: any) => total + num, 0);

      this.gt = this.gt + this.sum3;

    });
    
  }

  prob3(){

    this.service1.getProb3().subscribe(response => {

      this.prob3data= response;

    });

  }

  prob4(){

    this.service1.getProb4().subscribe(response => {

      this.prob4data= response;

      const month = response.map((item: { cremon: any }) => parseInt(item.cremon, 10));
      const year = response.map((item: { creyer: any }) => parseInt(item.creyer, 10));
      const type: string[] = response.map((item: { datetyp: any }) => item.datetyp);

      for (let i = 0; i < month.length; i++) {
        const y = year[i];
        const m = i;
        const t = type[i];
        if(t === "L"){
          const lastDate = this.getLastDate(y, m);
          this.prob4data[i].trndte = lastDate;
        }
        else if(t === "F"){
          const firstDate = this.getFirstDate(y, m);
          this.prob4data[i].trndte = firstDate;
        }
      }

    });

  }

  prob5(){

    this.service1.getProb5().subscribe(response => {

      this.prob5data= response;

      this.service1.getProb5D().subscribe(response => {

        this.prob5data2= response;
  
        const dupli: string[] = [];
  
        for (let i = 0; i < this.prob5data2.length; i++) {
          dupli.push(this.prob5data2[i].concat);
        }
  
        const duplicates = dupli.filter((value, index, self) => {
          return self.indexOf(value) !== index;
        });
  
        
        const uniques = dupli.filter((value, index, self) => {
          return duplicates.indexOf(value) === -1 && self.indexOf(value) === index;
        });
  
        for (let i = 0; i < uniques.length; i++) {
  
            for (let j = 0; j < this.prob5data2.length; j++) {
  
              if(this.prob5data2[j].concat === uniques[i]){
  
                this.prob5data3.push({ recid: this.prob5data[j].recid, field1: this.prob5data[j].field1, field2: this.prob5data[j].field2, field3:this.prob5data[j].field3 });
  
              }
  
            }
        }
    
      });

    });

  }

  getLastDate(year: number, month: number): Date {
    const currentDate = new Date(year, month + 1, 0);
  
    return currentDate;
  }

  getFirstDate(year: number, month: number): Date {
    const firstDate = new Date(year, month, 1);
  
    return firstDate;
  }

  reload(){
    window.location.reload();
  }


}

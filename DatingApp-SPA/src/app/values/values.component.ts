import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
})
export class ValuesComponent implements OnInit {
  values: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    return this.http.get('http://localhost:5000/api/values').subscribe(
      (res) => {
        this.values = res;
        for (const key in this.values) {
          if (this.values.hasOwnProperty(key)) {
            const element = this.values[key];
            console.log(element.name);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

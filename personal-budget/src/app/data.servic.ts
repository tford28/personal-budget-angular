import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Item {
  name: string;
  value: number;
  abs: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly MIN_ITEM = 10;
  private readonly MAX_ITEM = 20;
  private readonly MAX_VALUE = 100;

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#f6db19',
            '#fdbb19',
            '#f2d6b19',
        ],
    }],
    labels: []
  };

  constructor(private http: HttpClient) {
   }

  async testData(){
    if(this.dataSource.datasets[0].data.length <= 1){
      await this.search();
    }
    return this.dataSource;
  }

  async search() {
    let promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/budget')
        .toPromise()
        .then(
          (res: any) => { // Success
            for(var i = 0; i < res.myBudget.length; i++){
              this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
              this.dataSource.labels[i] = res.myBudget[i].title;
            }
            console.log(res);
            resolve();
          }
        );
    });
    return promise;
  }
}

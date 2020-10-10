import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements AfterViewInit {

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  async ngAfterViewInit(): Promise<void> {

    await this.dataService.testData();
    this.createChart();

  }

  createChart(){
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataService.dataSource
    });
  }
}
import {Component, ViewChild} from '@angular/core';

import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent} from "ng-apexcharts";
import {OrderService} from "../services/order-service";
import {Order, ShippingStatus} from "../interfaces/order-interface";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  latestOrders: Order[] = [];
  ordersCount: number = 0;
  boxesSold: number = 0;
  ordersToday: number = 0;
  data: number[] = [];

  constructor(public orderService: OrderService) {
    this.loadOrders();
    this.loadStatistics();
    this.fetchDataForChart().then(data => this.data = data);

    this.chartOptions = {
      series: [
        {
          name: "Orders",
          data: this.data
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Order overview"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        title: {
          text: "Orders"
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          }
        }
      }
    };
  }

  async loadOrders() {
    try {
      this.latestOrders = await this.orderService.getLatest();
      this.ordersToday = this.latestOrders.filter(o => o.createdAt.toDateString() == new Date().toDateString()).length;
      this.latestOrders = this.latestOrders.filter(o => o.shippingStatus == ShippingStatus.Received);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  async loadStatistics() {
    try {
      this.ordersCount = await this.orderService.getOrdersCount();
      this.boxesSold = await this.orderService.getBoxesSold();
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  async fetchDataForChart() {
    const monthOrderCountMap = await this.orderService.getOrdersCountByMonth();
    const data = [] as number[];

    for (let i = 0; i < 12; i++) {
      data.push(monthOrderCountMap.get(i)? monthOrderCountMap.get(i)! : 0);
    }

    // Create a new object for chartOptions to trigger change detection
    this.chartOptions = {
      ...this.chartOptions,
      series: [{
        name: "Orders",
        data: data
      }]
    };
    return data;
  }
}

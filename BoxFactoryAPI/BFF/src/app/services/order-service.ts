import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Order, OrderCreateDto, ShippingStatusDto} from "../interfaces/order-interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  private apiUrl = environment.baseUrl + '/Order';

  constructor(private http: HttpClient) {
    this.get();
  }

  async get() {
    const call = this.http.get<Order[]>(`${this.apiUrl}`);
    this.orders = await firstValueFrom<Order[]>(call);
    this.orders.map(o => o.createdAt = new Date(o.createdAt));
    this.orders.map(o => o.updatedAt = new Date(o.updatedAt? o.updatedAt : o.createdAt));
  }

  public async getbyId(id: string): Promise<Order> {
    const order = await firstValueFrom(this.http.get<Order>(`${this.apiUrl}/${id}`));
    order.createdAt = new Date(order.createdAt);
    order.updatedAt = new Date(order.updatedAt? order.updatedAt : order.createdAt);
    return order;
  }

  public async create(orderCreateDto: OrderCreateDto) {
    const order = await firstValueFrom(this.http.post<Order>(`${this.apiUrl}`, orderCreateDto));
    order.createdAt = new Date(order.createdAt);
    order.updatedAt = new Date(order.updatedAt? order.updatedAt : order.createdAt);
    return order;
  }

  public updateStatus(id: string, status: ShippingStatusDto) {
    return firstValueFrom(this.http.patch<Order>(`${this.apiUrl}/${id}`, status));
  }
  public delete(id: string) {
    return firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  public async getLatest() : Promise<Order[]> {
    const call = this.http.get<Order[]>(`${this.apiUrl}/latest`);
    const orders = await firstValueFrom(call);
    orders.map(o => o.createdAt = new Date(o.createdAt));
    orders.map(o => o.updatedAt = new Date(o.updatedAt? o.updatedAt : o.createdAt));
    return orders;
  }

  public async getTotalRevenue() : Promise<number> {
    const call = this.http.get<number>(`${this.apiUrl}/revenue`);
    return await firstValueFrom(call);
  }

  public async getBoxesSold() : Promise<number> {
    const call = this.http.get<number>(`${this.apiUrl}/boxes-sold`);
    return await firstValueFrom(call);
  }

  public async getOrdersCount() : Promise<number> {
    const call = this.http.get<number>(`${this.apiUrl}/orders-count`);
    return await firstValueFrom(call);
  }

  public async getOrdersCountByMonth() : Promise<Map<number, number>> {
    const call = this.http.get<{[key: number]: number }>(environment.baseUrl + "stats");
    return new Map(Object.entries(await firstValueFrom(call)).map(([key, value]) => [parseInt(key), value]));
  }
}

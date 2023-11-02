import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = environment.baseUrl + '/stats';

  constructor(private http: HttpClient) {

  }

  public async getOrdersCountByMonth(): Promise<Map<number, number>> {
    const call = this.http.get<{ [key: number]: number }>(`${this.apiUrl}`);
    return new Map(Object.entries(await firstValueFrom(call)).map(([key, value]) => [parseInt(key), value]));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {Box, BoxCreateDto, BoxUpdateDto, PaginatedBoxList} from "../interfaces/box-inteface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  boxes: Box[] = [];
  pageSize: string = "10";
  public pageCount?: number;

  private apiUrl = environment.baseUrl + 'box';

  constructor(private http: HttpClient) {
    this.get(1,this.pageSize);
  }

  async get(currentPage:number, count?: string | "10",  searchTerm?: string) {
    const call = this.http.get<PaginatedBoxList>(`${this.apiUrl}?currentPage=${currentPage}&boxesPerPage=${count}&searchTerm=${searchTerm ?? ''}`);
    let result = await firstValueFrom(call);
    this.boxes = result.boxes;
    this.pageCount = result.pageCount;
    return result;
  }

  public getbyId(id: string) {
    return firstValueFrom(this.http.get<Box>(`${this.apiUrl}/${id}`));
  }

  public create(boxCreateDto: BoxCreateDto) {
    return firstValueFrom(this.http.post<Box>(`${this.apiUrl}`, boxCreateDto));
  }

  public update(id: string, boxUpdateDto: BoxUpdateDto) {
    return firstValueFrom(this.http.put<Box>(`${this.apiUrl}/${id}`, boxUpdateDto));
  }

  public delete(id: string) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/box/${id}`);
  }

  public getColours(): string[] {
    return ['red', 'blue', 'green', 'yellow', 'black', 'white', 'brown', 'grey', 'orange', 'purple', 'pink', 'gold', 'silver', 'bronze', 'copper'];
  }

  public getMaterials(): string[] {
    return ['cardboard', 'plastic', 'wood', 'metal'];
  }
}

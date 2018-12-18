import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  httpGet(url: string) {
    return this.httpClient.get(url)
  }
}

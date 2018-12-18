import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class RService {
  constructor() {}

  OrdersKey: string = 'Orders'

  findIndex(array: any, id: number) {
    var low = 0,
      high = array.length,
      mid: number
    while (low < high) {
      mid = (low + high) >>> 1
      array[mid]._Id < id ? (low = mid + 1) : (high = mid)
    }
    return low
  }
}

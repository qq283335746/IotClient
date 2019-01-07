import {OrderInfo} from './OrderInfo'

export class OrderPackageModel {
  ParentOrder: string;
  Orders: Array<OrderInfo>;
  BatchRandomCode:string;
}

import { ApiResult } from "./ApiResult";

export class ApiOrderResult implements ApiResult{
    public ResCode: number;    
    public Message: string;
    //public OrderId:string;
}
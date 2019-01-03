import { ApiResult } from "./ApiResult";

export class ApiFindOrderRouterResult implements ApiResult{
    public ResCode: number;
    public Message: string;
    public Orders:any;
}
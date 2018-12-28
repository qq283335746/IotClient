import { ApiResult } from "./ApiResult";

export class ApiTestResult implements ApiResult{
    public ResCode: number;
    public Message: string;
    public Data: any;
}
import { ApiResult } from "./ApiResult";

export class LoginResult implements ApiResult{
    public ResCode: number;
    public Message: string;
    public Data: any;
    public Token:string;
    public Roles:Array<string>;
}
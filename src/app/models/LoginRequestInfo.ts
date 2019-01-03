import { RequestBaseInfo } from "./RequestBaseInfo";

export class LoginRequestInfo implements RequestBaseInfo{
    public AppId: string;    
    public AppSecret: string;
    public DeviceId:string;
    public Token: string;
    public UserName:string;
    public Password:string;
}
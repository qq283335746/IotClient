import { RequestBaseInfo } from "./RequestBaseInfo";

export class FindOrderRouterRequestInfo implements RequestBaseInfo{
    public AppId: string;    
    public AppSecret: string;
    public DeviceId: string;
    public Token: string;
    public OrderCode:string;

}
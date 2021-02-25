export class UserModelServer {
    id_user:number;
    fname: string;
    lname:string;
    username: string;
    email: string;
    roles: string;
    status: number;
    createdAt:Date;
    updatedAt:Date;
}

export interface UserResponse{
    count:number;
    users: UserModelServer[]
}
import {ProductModelServer} from './products'
export interface CartModelServer {
    total: number;
    data:[{
        numInCart: number,
        product: ProductModelServer
    }]
}

export interface CartModelPublic {
total:number,
prodData:[
    {
        id:number,
        incart:number}]
}

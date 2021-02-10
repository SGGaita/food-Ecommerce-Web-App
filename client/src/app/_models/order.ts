export class OrderModelServer {
    id_product: number;
    id_product_cat_fk: number;
    id_product_sub_cat:number;
    id_supplier_fk:number;
    product_name: string;
    product_description:string;
    image:string;
    product_price:number;
    quantity:number;
    createdAt:Date;
    updatedAt: Date;
}

export interface OrderResponse{
    count:number;
    orders: OrderModelServer[]
}

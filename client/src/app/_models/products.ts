export class ProductModelServer {
    id_product: number;
    id_product_cat_fk: number;
    id_product_sub_cat:number;
    id_supplier_fk:number;
    product_name: string;
    product_description:string;
    image:string;
    images:string;
    status:number;
    product_price:number;
    quantity:number;
    createdAt:Date;
    updatedAt: Date;
}

export interface ServerResponse{
    count:number;
    products: ProductModelServer[]
}

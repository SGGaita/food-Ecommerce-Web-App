export class SupplierModelServer {
    id_supplier:number;
    supplier_name:string;
    id_supplier_cat_fk: number;
    supplier_description:string;
    supplier_image:string;
    status: number;
    createdAt:Date;
    updatedAt:Date;
}

export interface SupplierResponse{
    count:number;
    suppliers: SupplierModelServer[]
}
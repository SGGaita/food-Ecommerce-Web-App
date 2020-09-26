export class Categories {
    id_product_cat:number;
    prod_category_name:string;
    prod_category_description:string;
    createdAt:Date;
    updatedAt:Date;
}


export class SubCategories {
    id_product_sub_cat:number;
    id_product_cat_fk:number;
    sub_name:string;
    sub_description:string;
    createdAt:Date;
    updatedAt:Date;
}

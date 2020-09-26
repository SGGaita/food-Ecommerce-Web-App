export class PaymentMode {
    id_payment: number;
    payment_name: string
}

export interface ServerResponse{
    count:number;
    modes: PaymentMode[]
}

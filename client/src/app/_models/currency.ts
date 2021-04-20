export class CurrencyModelServer {
    id_currency: number;
    currency_name: string;
    iso_code: string;
    conversion_rate:number;
    active:number;
}

export interface CurrencyResponse{
    count:number;
    currencies: CurrencyModelServer[]
}
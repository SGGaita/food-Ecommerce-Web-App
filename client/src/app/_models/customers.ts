export class CustomersModelServer {
  id_customer: number;
  id_customer_fk: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  primaryPhone: string;
  address: string;
  city:string;
  region: string;
  additional_info:string
  secondaryPhone:string
}

export interface CustomerResponse {
  count: number;
  customers: CustomersModelServer[];
}

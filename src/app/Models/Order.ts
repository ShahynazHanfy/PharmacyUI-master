import { Drug } from './Drug';
import { OrderDetails } from './OrderDetails';
export class Order {
  id: number;
    code: string;
    number:number;
    description: string;
    comments: string;
    date:Date;
    supplierID:number;
    pharmacyID:number;
    pharmacyDeliverdID:number;
    pledgeID:number
   orderDetailList:OrderDetails[]
  }
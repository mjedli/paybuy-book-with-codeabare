import { Line } from '../model/line';

export class Invoice {
  id:string;
  idCustomer:string;
  date:string;
  listline:Line[];
  total:number;
  totalTva:number;
  credit:number;
  newCredit:number;
  paid:number;
}
import {DrugInEachOrder} from '../Models/DrugInEachOrder'
export class OrderVM {
    orderId: number
    date: Date
    number: number
    description: string
    comments: string
    listDetails:DrugInEachOrder[]
}

import { Component, OnInit } from '@angular/core';
import { Drug } from '../../../Models/Drug'
import { DrugService } from '../../../services/drug.service'
import { PrimeNGConfig } from 'primeng/api';
import { Order } from '../../../Models/Order'
import { OrderService } from '../../../services/order.service'
import { error } from '@angular/compiler/src/util';
import { OrderDetails } from '../../../Models/OrderDetails'
import { Pharmacy } from 'src/app/Models/Pharmacy';
import { Pledge } from 'src/app/Models/Pledge';
import { Supplier } from 'src/app/Models/Supplier';
import { PharmacyService } from '../../../services/pharmacy.service'
import { DrugDetails } from '../../../Models/DrugDetails'
import { OrderVM } from 'src/app/Models/OrderViewModel';
import {DrugInEachOrder} from '../../../Models/DrugInEachOrder'

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  ExistDrugs: any;
  drug: Drug
  drug1: Drug
  DrugAdded: Drug[]
  Orders: Order[]
  order: Order
  drugDetailsNeeded: OrderDetails[];
  orderDetailObj: OrderDetails;
  newOrder: Order
  newOrderDetails: OrderDetails[]
  selectedDrug: Drug
  orderDetails: OrderDetails[]
  pharmacy: Pharmacy[]
  pledge: Pledge[]
  supplier: Supplier[]
  selectedDrugName: string
  selectedsource: any = null
  selectedTarget: any = null
  drugDetailsObj: DrugDetails
  pharmacyLoggedInID:Number
  pharmacyObj:Pharmacy
  pharmacyName:string
  orderVM:OrderVM[]
  drugInEachOrder:DrugInEachOrder[]


  // checked:boolean=true
  DrugExistAfterElementDeleted: Drug[]
  constructor(private drugService: DrugService, private orderService: OrderService, private pharmacyService: PharmacyService) {

    this.DrugAdded = []
    this.newOrderDetails = []
    this.DrugExistAfterElementDeleted = []
    this.drugService.GetAll().subscribe(drugs => {
    this.ExistDrugs = drugs, console.log(this.ExistDrugs),
    this.DrugExistAfterElementDeleted = this.ExistDrugs
    this.orderDetails = []
    this.pharmacy = []
    this.orderVM =[]

    });
  }
  ngOnInit() {
    this.order = {
      code: '', comments: '', date: new Date(), description: '', number: 0,
      pharmacyLoggedInID:0,pharmacySourceID:0,pharmacyTargetID:0,
      pledgeID: 0, supplierID: 0, orderDetailList: [], id: 0

    }
    this.drugDetailsObj = {
      IsActive: true, IsChecked: true, barCode: '', code: '', exp_Date: new Date(), id: 0, license: '', pack: '', price: 2,
      prod_Date: new Date(), quentity: 20, reOrderLevel: '', size: null, strength: '', drugID: 0, pharmacyLoggedInID: 0
    }
    this.newOrder = {
      code: '', comments: '', date: new Date(), description: '', number: 0,pharmacyTargetID:0,pharmacySourceID:0,
      pharmacyLoggedInID:0,
      pledgeID: 0, supplierID: 0, orderDetailList: [], id: 0

    }
    this.orderDetailObj = {
      quentity: 0, price: 0, orderId: 0, drugId: 0, exp_Date: new Date(), prod_Date: new Date(), tradeName: '', img: ''
    }
    this.pharmacyService.GetAllPharmacies()
      .subscribe(pharmacy => {
        this.pharmacy = pharmacy
        console.log("pharmacies" + this.pharmacy)
      })

    this.drugService.GetAllPledges().subscribe(pledge => {
      this.pledge = pledge
    })
    this.drugService.GetAllSuppliers().subscribe(supplier => {
      this.supplier = supplier
    })
    this.pharmacyLoggedInID=Number(localStorage.getItem("pharmacyLoggedInID"))

    this.pharmacyLoggedInID=Number(this.pharmacyLoggedInID)

    this.orderService.GetAllOrdersByPharmacyId(this.pharmacyLoggedInID).subscribe(A=>{
      this.orderVM =A
      
      console.log("orderVMMM"+this.orderVM)
    })


    this.pharmacyService.getPharmacyById(this.pharmacyLoggedInID)
    .subscribe(d=>{
        this.pharmacyObj=d
        console.log(this.pharmacyObj)
        this.pharmacyName=this.pharmacyObj.name
        console.log(this.pharmacyName)
    })
    this.drugService.GetAll()
      .subscribe(drugs => {
        this.ExistDrugs = drugs,
          console.log(drugs)
      }
        , error => {
          console.log(error);
        });

    // this.selectedsource = "pharmacy"
    console.log(this.DrugExistAfterElementDeleted)
    // console.log(this.order)
  }

  
  saveDrug(id) {
    console.log(id)
    this.drugService.getDrugByID(id).subscribe(drug => {
      this.drug = drug;
      //   this.order.number = Number(this.order.number);
      // console.log(element)  
      // element2.setAttribute("value","Added To Form")
      // element2.setAttribute("style","background-color: green;")
      console.log(drug)
      this.DrugAdded.push(drug)
      // var element = document.querySelector("#t");
      // console.log(element)  
      // element.setAttribute("value","Added To Form")
      // element.setAttribute("style","background-color: #2196F3;")

      // var element2 = document.querySelector("#tt");
      // console.log(element)  
      // element2.setAttribute("value","Added To Form")
      // element2.setAttribute("style","background-color: green;")

      // this.ExistDrugs.splice()
      // this.ExistDrugs.splice(this.ExistDrugs.indexOf(drug), 1) 
      // this.drugService.GetAll().subscribe(drugs => {this.ExistDrugs = drugs,console.log(this.ExistDrugs)});

      // this.DrugAdded.splice(this.DrugAdded.indexOf(drug), 1) 
    })
    // this.drug.IsChecked = !this.drug.IsChecked
  }
  deleteFromAddedList(id) {
    console.log(id)
    this.drugService.getDrugByID(id).subscribe(drug => {
      this.drug1 = drug
      console.log(this.drug1)
      var index = this.DrugAdded.indexOf(this.drug1);
      console.log(this.DrugAdded.indexOf(this.drug1))
      if (index > -1) {

        this.DrugAdded.splice(index, 1);
      }
      //  console.log(this.DrugAdded.indexOf()) 
      //   this.DrugAdded.splice(this.DrugAdded.indexOf(this.drug1), 1) 
    })
  }

  //   saveOrder(){
  //     // console.log(this.DrugAdded)
  //     // this.order.number=Number(this.order.number);
  //     for(var i=0;i<  this.DrugAdded.length;i++)
  //     {
  //        this.orderDetailObj = {
  //       drugId: this.DrugAdded[i].id,
  //       prod_Date:this.DrugAdded[i].prod_Date,
  //       price: this.DrugAdded[i].price,
  //       exp_Date:this.DrugAdded[i].exp_Date,
  //       quentity:this.DrugAdded[i].quentity,
  //       orderId:this.order.id
  //       };
  //       this.order.orderDetailList.push(this.orderDetailObj);
  //     }



  // //this.order.orderDetailList=this.DrugAdded
  //     // console.log(this.DrugAdded)
  //     console.log(this.order)
  //     this.orderService.insertDrug(this.order).subscribe(d=>{
  //       console.log(d)
  //     })
  //   }
  changeEvent() {
    console.log(this.selectedsource)

  }
  eventForPharmacy(){
    console.log(this.selectedsource)
    // this.order.pharmacyID=Number(this.PharmacyID)
    console.log(this.pharmacyLoggedInID)
  }
  saveOrderList() {
    console.log("This is selected drug" + this.selectedDrug)
    this.orderDetailObj.quentity=Number(this.orderDetailObj.quentity)
    this.order.pharmacyLoggedInID = Number(this.order.pharmacyLoggedInID)
    this.order.supplierID = Number(this.order.supplierID)
    // this.order.number = Number(this.order.number)
    if (this.selectedsource=='Pharmacy') {
      console.log("pharmacy")
    }
    // if(true){
    //   this.order.pledgeID=null
    // }
    this.order.orderDetailList = this.orderDetails
    console.log("orderDetailsObj" + this.orderDetailObj)
    console.log("orderDetails" + this.orderDetails)
    this.orderService.insertOrder(this.order).subscribe(order => {
      console.log(order)
    })

    console.log("ooorder",this.order)
  }

  
  SaveToList() {
    this.orderDetailObj.drugId = this.selectedDrug.id
    this.orderDetailObj.img = this.selectedDrug.img
    this.orderDetailObj.quentity = Number(this.orderDetailObj.quentity)
    this.orderDetailObj.price = Number(this.orderDetailObj.price)
    this.orderDetailObj.tradeName = this.selectedDrug.tradeName
    this.orderDetails.push(this.orderDetailObj)
    console.log("order Detail obj" + this.orderDetailObj)
    // this.selectedDrug=
    // {
    // IsActive:true,code:'',price:0,CountryID:0,FirmID:0,FormID:0,IsChecked:true,ROADID:0,
    // TheraSubGroupID:0,UnitID:0,barCode:'',exp_Date: new Date(),genericName:'',id:0,img:'',
    // license:'',pack:'',prod_Date:new Date(),quentity:0,reOrderLevel:'',strength:'',tradeName:''
    // }

    this.drugService.GetAll()
      .subscribe(d => {
        this.ExistDrugs = d
      })
    this.orderDetailObj = {
      quentity: 0, price: 0, orderId: 0, drugId: 0, exp_Date: new Date(), prod_Date: new Date(), img: '', tradeName: ''
    }
    console.log(this.orderDetails)
    console.log(this.selectedsource)
  }


  deleteDrugFromList(drugDetails) {
    console.log(this.orderDetails)
    console.log(drugDetails)
    this.orderDetails.splice(this.orderDetails.indexOf(drugDetails), 1);
    console.log("After removing 1: " + this.orderDetails);
  }


}

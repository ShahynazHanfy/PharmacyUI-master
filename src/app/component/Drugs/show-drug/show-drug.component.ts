import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DrugService } from '../../../services/drug.service'
import { Drug } from './../../../Models/Drug'
import { error } from '@angular/compiler/src/util';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators'
// import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { DrugDetails } from '../../../Models/DrugDetails'
import { DrugAndDrugDetails } from 'src/app/Models/Drugs&DrugsDetials';
import { Representative } from '../../../Models/Representative'
import { PrimeNGConfig } from 'primeng/api';
import { TheraGroup } from './../../../Models/TheraGroup'
import { TheraSubGroup } from './../../../Models/TheraSubGroup'
import { Unit } from './../../../Models/Unit'
import { Country } from './../../../Models/Country'
import { ROAD } from './../../../Models/ROAD'
import { Form } from './../../../Models/Form'
import { Firm } from './../../../Models/Firm'
import { FirmService } from '../../../services/firm.service'
import { FormService } from '../../../services/form.service'
@Component({
  selector: 'app-show-drug',
  templateUrl: './show-drug.component.html',
  styleUrls: ['./show-drug.component.css'],
  providers: [MessageService]


})
export class ShowDrugComponent implements OnInit {

  Drug: Drug
  drugs: Drug[];
  drugsDetailsViewModel: DrugAndDrugDetails[]
  drugsDetails: DrugDetails[]
  drugsDetailsObj: DrugDetails
  loading: boolean = true;
  msgs: Message[] = [];
  PharmacyId: Number
  DrugDetailsobj: DrugDetails
  displayModal: boolean;
  fileToUpload: File;
  imgName: string
  Form: Form[]
  Unit: Unit[]
  firm: Firm[]
  Country: Country[]
  ROAD: ROAD[]
  Thera: TheraGroup[]
  TheraSub: TheraSubGroup[]
  TheraGroupID = 0
  EmpRole:string
  public progress: number;
  public message: string;

  @Output() public onUploadFinished = new EventEmitter();

  uploadedFiles: any[] = [];
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.uploadFileToActivity()

  }


  @ViewChild('dt') table: Table;
  statuses: { label: string; value: string; }[];
  representatives: { name: string; image: string; }[];
  displayModal1: boolean;

  constructor(
    private DrugService: DrugService,
    private messageService: MessageService,
    private routee: Router,
    private http: HttpClient,
    private firmServ: FirmService,
    private formServ: FormService,
    private confirmationService: ConfirmationService) {
    this.drugsDetails = [], this.drugsDetailsViewModel = [],

      
    this.PharmacyId = Number(localStorage.getItem("pharmacyID"))
    this.EmpRole = localStorage.getItem("roles")

    this.Drug = {
      CountryID: 0, img: '', id: 0, drugDetails: this.DrugDetailsobj
      , FirmID: 0, FormID: 0, ROADID: 0, TheraSubGroupID: 0, UnitID: 0, genericName: '', tradeName: ''
    }
    this.DrugDetailsobj = {
      IsActive: true, IsChecked: true, barCode: '', code: '', exp_Date: new Date(), id: 0, license: '', pack: '', price: 2,
      prod_Date: new Date(), quentity: 20, reOrderLevel: '', size: 0, strength: '', drugID: 0, pharmacyID: 0
    }
    this.DrugDetailsobj = {
      IsActive: true, IsChecked: true, barCode: '', code: '', exp_Date: new Date(), id: 0, license: '', pack: '', price: null,
      prod_Date: new Date(), quentity: 0, reOrderLevel: '', size: null, strength: '', drugID: 0, pharmacyID: this.PharmacyId

    }
  }

  ngOnInit() {
    const langs = localStorage.getItem('lang') || 'en';
    const headers = new HttpHeaders({
      'Accept-Language': langs
    })

    this.DrugService.GetAllActiveThera()
      .subscribe(Thera => {
        this.Thera = Thera
      }
        , error => {
          console.log(error);
        });

    this.DrugService.GetAll().subscribe(d => {
      this.drugs = d

    })

    this.formServ.GetAllActiveForms()
      .subscribe(Form => {
        this.Form = Form
      }
        , error => {
          console.log(error);
        })

    this.firmServ.GetActiveFirms()
      .subscribe(Firm => {
        this.firm = Firm
      }
        , error => {
          console.log(error);
        })

    this.DrugService.GetAllActiveUnits()
      .subscribe(units => {
        this.Unit = units
      }
        , error => {
          console.log(error);
        })

    this.DrugService.GetAllActiveCountry()
      .subscribe(Country => {
        this.Country = Country
      }
        , error => {
          console.log(error);
        })

    this.DrugService.GetAllActiveROAD()
      .subscribe(ROAD => {
        this.ROAD = ROAD
      }
        , error => {
          console.log(error);
        })


    this.representatives = [
      { name: "Amy Elsner", image: 'barn.png' },
      { name: "Anna Fali", image: 'Cap.jpg' },
      { name: "Asiya Javayant", image: 'capp.jpg' },
      { name: "Bernardo Dominic", image: 'medicine.png' },
      { name: "Elwin Sharvill", image: 'Medicine.jpg' },
      { name: "Ioni Bowcher", image: 'ph.jpg' },
      { name: "Ivan Magalhaes", image: 'pharmacy.jpg' },
      { name: "Onyama Limba", image: 'yy.png' },
      { name: "Stephen Shaw", image: 'images.png' },
      { name: "XuXue Feng", image: 'line.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
    this.DrugService.GetAllDrugsDetailsViewModel(this.PharmacyId)
      .subscribe(drugs => {
        this.drugsDetailsViewModel = drugs,
          console.log(this.drugsDetailsViewModel),
          this.loading = false;
      }
        , error => {
          console.log(error);
        });

    this.DrugService.GetAll().subscribe(d => {
      this.drugs = d
      console.log(this.drugsDetailsViewModel)

    })
  }

  showModalDialog() {
    this.displayModal = true;
    this.ngOnInit();
  }
  showModalDialog1() {
    this.displayModal1 = true;
    this.Drug = new Drug()
  }

  onFileSelected(files: FileList) {
    console.log(files)
    this.fileToUpload = files.item(0);
    const oldName = this.fileToUpload.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    const newName = this.makeRandom(lengthOfCode, possible);
    this.imgName = this.fileToUpload.name;
    console.log(this.imgName)
    console.log(this.fileToUpload.name);
    Object.defineProperty(this.fileToUpload, 'name', {
      writable: true,
      value: newName + fileExtension
    });
    console.log(this.fileToUpload.name);

    this.Drug.img = this.fileToUpload.name;
    //alert(this.prd.Img);

    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.DrugService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      //c(data);
    }, error => {
      console.log(error);
    });
  }
  makeRandom(lengthOfCode, possible) {

    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:51563/api/drugs/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Drug Deleted Successfully' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Drug Deleted Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Drug Deleted Successfully' });
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  SubmitDrugDetails() {
    this.ngOnInit()
    this.DrugDetailsobj.drugID = Number(this.DrugDetailsobj.drugID)
    // this.DrugDetailsobj.pharmacyID = Number(this.DrugDetailsobj.pharmacyID)
    console.log(this.DrugDetailsobj)
    console.log(this.PharmacyId)
    this.DrugService.insertDrugDetailsObj(this.DrugDetailsobj)
      .subscribe(Drug => {
        console.log("Mabork y wa74")
        this.routee.navigate(['home/showdrug'])
        this.ngOnInit()
        this.displayModal = false
      }
        , error => {
          console.log(error);
        });
  }

  editRow(id: number) {
    this.routee.navigate(['home/edit/', id])
  }

  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }
  OnChangeGroupID(i: any) {
    // console.log(i.targ)
    this.DrugService.getSubByGrpID(this.TheraGroupID).subscribe(TheraSub => {
      this.TheraSub = TheraSub,
        console.log(TheraSub)
    }
      , error => {
        console.log(error);
      });
  }
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }
  onDeleteRow(id: number) {
    console.log(id)
    console.log("uuuu")
    this.DrugService.deleteDrug(id)
      .subscribe(x => {
        console.log(x)
        // this.DrugService.GetAll().subscribe(drugs=>{this.drugs =drugs})
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Drug Deleted Successfully' });
      })
  }
  //     confirm(id:number) {
  //       console.log(id)
  //       this.confirmationService.confirm({
  //           message: 'Are you sure that you want to perform this action?',
  //           accept: () => {
  //             console.log(id)
  //             this.onDeleteRow(id)
  //           },
  //           reject:()=>{
  //             close()
  //           }
  //       });
  //}

  SubmitDrugName() {
    this.Drug.TheraSubGroupID = Number(this.Drug.TheraSubGroupID);
    this.Drug.FormID = Number(this.Drug.FormID);
    this.Drug.FirmID = Number(this.Drug.FirmID);
    console.log(typeof (this.Drug.FirmID))
    console.log(this.Drug.FirmID)
    this.Drug.CountryID = Number(this.Drug.CountryID);
    this.Drug.ROADID = Number(this.Drug.ROADID);
    this.Drug.UnitID = Number(this.Drug.UnitID);
    console.log(typeof (this.Drug.TheraSubGroupID));
    console.log(this.Drug)
    this.DrugService.insertDrug(this.Drug).subscribe(d => {
      console.log("Ra7 y insert")
    })
    this.displayModal1 = false
  }




  confirmmmmmmm(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDeleteRow(id)
        console.log(id)
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      },
      reject: () => {
        // this.onDeleteRow(id)
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }
}

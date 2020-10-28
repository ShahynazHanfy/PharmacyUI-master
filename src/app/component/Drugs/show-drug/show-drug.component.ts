
import { Component, OnInit ,ViewChild} from '@angular/core';
import {DrugService} from '../../../services/drug.service'
import {Drug} from './../../../Models/Drug'
import { error } from '@angular/compiler/src/util';
import { Table } from 'primeng/table';
import { FilterUtils } from 'primeng/utils';
import { ConfirmationService, Message, SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators'
// import { ToastrService } from 'ngx-toastr';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

    @Component({
          selector: 'app-show-drug',
          templateUrl: './show-drug.component.html',
          styleUrls: ['./show-drug.component.css'],
          providers: [MessageService]

        
})
export class ShowDrugComponent implements OnInit {

    drugs: Drug[];

    loading: boolean = true;
    msgs: Message[] = [];

    @ViewChild('dt') table: Table;

    constructor (
      private DrugService: DrugService,
      private messageService: MessageService,
      private routee:Router, 
      private confirmationService: ConfirmationService
      ) { }

    ngOnInit() {
      const langs = localStorage.getItem('lang')||'en';
      const headers = new HttpHeaders({
        'Accept-Language':langs
      })
              this.DrugService.GetAll()
              .subscribe(drugs => {
                this.drugs = drugs,console.log(drugs),
                this.loading = false;
            }
              ,error=>{console.log(error);
              }) ;
    }

   

    showSuccess() {
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
    }
        
    showInfo() {
          this.messageService.add({severity:'info', summary: 'Info', detail: 'Drug Deleted Successfully'});
    }
        
    showWarn() {
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Drug Deleted Successfully'});
    }
        
    showError() {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Drug Deleted Successfully'});
    }
        
    showTopLeft() {
          this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
    }

   

    editRow(id:number){
      this.routee.navigate(['home/edit/',id])
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
        this.DrugService.GetAll().subscribe(drugs=>{this.drugs =drugs})
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Drug Deleted Successfully'});
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
// }

confirmmmmmmm(id:number) {
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDeleteRow(id)
        console.log(id)
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        // this.onDeleteRow(id)
          this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
}
}

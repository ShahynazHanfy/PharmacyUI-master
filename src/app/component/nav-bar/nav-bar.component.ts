import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  siteLanguage: string = 'English';
siteLocale: string;
languageList = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'arabic' },
];
  items: MenuItem[];
  lang;
  constructor(private routee: Router) { }

  // changeLang(lang) {
  //   console.log(lang)
  //   localStorage.setItem('lang', lang)
  //   window.location.reload()
  // }
  ngOnInit() {
  //   this.siteLocale = window.location.pathname.split('/')[1];
  // this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
    // const langs = localStorage.getItem('lang')||'en';
    // const headers = new HttpHeaders({
    //   'Accept-Language':langs
    // })
    /// language
    // this.siteLocale = window.location.pathname.split('/')[1];
    // console.log(this.siteLocale)    
    // this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;

    this.items = [
      {

        label: 'Home',
        icon: 'pi pi-home',
        // url: ['/h']
        routerLink: ['/home/showdrug'],
        // routerLinkActiveOptions: {
        //   exact: true
        // }

      },
      {
        label: 'Drug Mangement',
        icon: "pi pi-filter",
        items: [
          {

            label: 'Drug',
            icon: 'pi pi-fw pi-align-left',
            routerLink: ['/home/showdrug'],


          },
          {

            label: 'Category',
            icon: 'pi pi-fw pi-align-left',
            routerLink: ['/home/showCategories'],

          },
          {
            label: 'SubCategory',
            icon: 'pi pi-fw pi-align-right',
            routerLink: ['/home/ADDSUBCATEGORY'],
          },
          {
            label: 'Form',
            routerLink: ['/home/form'],
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Firm',
            icon: 'pi pi-fw pi-align-justify',
            routerLink: ['/home/firm'],
          },
          {
            label: 'Supplier',
            icon: 'pi pi-fw pi-align-justify',
            routerLink: ['/home/supplier'],

          }

        ]
      },
      {
        label: 'Orders',
        icon: 'pi pi-chart-bar',
        routerLink: ['addorder'],

        // items:[
        //     {
        //         label:'New Order',
        //         icon:'pi pi-fw pi-user-plus',

        //     },
        //     {
        //         label:'Delete',
        //         icon:'pi pi-fw pi-user-minus',

        //     },
        //     {
        //         label:'Search',
        //         icon:'pi pi-fw pi-users',
        //         items:[
        //         {
        //             label:'Filter',
        //             icon:'pi pi-fw pi-filter',
        //             items:[
        //                 {
        //                     label:'Print',
        //                     icon:'pi pi-fw pi-print'
        //                 }
        //             ]
        //         },
        //         {
        //             icon:'pi pi-fw pi-bars',
        //             label:'List'
        //         }
        //         ]
        //     }
        // ]
      },

      {
        label: 'Employees',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['employee'],

      },
      {
        label: 'All Users',
        icon: 'pi pi-fw pi-power-off',
        routerLink: ['allusers'],

      }
    ];

  }

  public logout() {
    console.log(localStorage.getItem("token"))
    localStorage.removeItem("token");
    this.routee.navigate(['/login'])
    localStorage.clear();
  }
}

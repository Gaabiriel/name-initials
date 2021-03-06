import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';


const template = '<span class="m-badge m-badge--brand m-badge--wide field-tip" [hidden]="isHidden">{{initials}}<span class="tip-content">{{value}}</span></span>';
const style = `
  /* Hover tooltips */
  .field-tip {
    position:relative;
  }
  
  .field-tip .tip-content {
    cursor: default !important;
    position:absolute;
    top:-10px; /* - top padding */
    right:9999px;   
    margin-left: auto; margin-right: 0;
    padding:10px;
    color:#fff;
    width: 200px;
    background:#333;
      -webkit-box-shadow:2px 2px 5px #aaa;
      -moz-box-shadow:2px 2px 5px #aaa; 
    box-shadow:2px 2px 5px #aaa;
    opacity:0;
      -webkit-transition:opacity 250ms ease-out;
      -moz-transition:opacity 250ms ease-out;
      -ms-transition:opacity 250ms ease-out;
      -o-transition:opacity 250ms ease-out;
    transition:opacity 250ms ease-out;
    z-index: 1000;
  }
  
  .field-tip:hover .tip-content {
    right: -85px;
    opacity: 1;
    z-index: 1000;
  }
  `;

@Component({
    selector: 'badge-name',
    styles: [style],
    template: template
})

export class BadgeNameInitialsComponent implements OnInit {
    rowData: any;

    @Input() value: string;
    initials: string = "";
    isHidden: boolean;
    ngOnInit() {
        this.initials = this.getNameInitials(this.value);
    }

    //Get names's initials
    getNameInitials(fullName: string): string {

        if (fullName === null || fullName === undefined || fullName === "") {
            this.isHidden = true;
            return "";

        } else {
            let splitedName = fullName.split(" ");

            //only show the first 3 initials
            let contador = splitedName.length > 2 ? 2 : splitedName.length;

            for (let i = 0; i < contador; i++) {
                if (splitedName[i] != "") {
                    //if the name has "de","dos","da" preposition, it's not considered
                    if (splitedName[i].toUpperCase() != "DE" && splitedName[i].toUpperCase() != "DOS" && splitedName[i].toUpperCase() != "DA") {
                        this.initials = this.initials + splitedName[i].charAt(0).toUpperCase() + "";
                    } else {
                        contador++;
                    }
                } else {
                    contador++;
                }
            }
            this.isHidden = false;
            return this.initials;
        }
    }
}

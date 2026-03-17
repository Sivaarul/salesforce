import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

const FIELDS = [NAME_FIELD, EMAIL_FIELD, PHONE_FIELD];


export default class ContactInfoCard extends LightningElement {

     @api recordId;
     
     @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
contact;
 
      get contactFields() {
          console.log('gettign method',this.contact.data , this.contact.error);
          return this.contact.data;
      }
          
      get hasError() {
        return this.contact.error;
    }
    

    

}
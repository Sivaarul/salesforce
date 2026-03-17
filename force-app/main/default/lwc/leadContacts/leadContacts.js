import { LightningElement } from 'lwc';
import GetAllContacts from '@salesforce/apex/BikeController.getAllContacts';

const columns = [ 
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'AccountId', fieldName: 'AccountId', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'firstname', fieldName: 'firstname', type: 'text' },
    { label: 'lastname', fieldName: 'lastname', type: 'text' }]

export default class LeadContacts extends LightningElement {
     isLoading = false;
     contacts;
      columns = columns;

     HandleClick() {
        this.isLoading = true;
         setTimeout(() => {
     GetAllContacts()
        .then(result => {
            this.contacts = result;
            this.isLoading = false;
        })
        .catch(error => {
            console.error('Error fetching contacts:', error);
            // Handle the error as needed
        });
    },3000);
    }
     
  
      

}
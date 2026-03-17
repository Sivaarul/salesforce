import { LightningElement ,api, wire } from 'lwc';
import { updateRecord ,getRecord  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { publish, MessageContext } from 'lightning/messageService';
import BIKELMSC from '@salesforce/messageChannel/BikeMessageChannel__c';
import NAME_FIELD from '@salesforce/schema/bike__c.Name';
import RATE_FIELD from '@salesforce/schema/bike__c.Rate__c';
import ID_FIELD from '@salesforce/schema/bike__c.Id';
const FIELDS = [NAME_FIELD, RATE_FIELD];



export default class BikePriceUpdater extends LightningElement {
  
       @api recordId;
       isLoading = false;
       @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
       bikeResult;
        @wire(MessageContext)
         messageContext;
       get bikeResultFields()
       {
           return this.bikeResult?.data?.fields;
       }

         handleUpdatePrice()
         {
             this.isLoading= true;
            console.log(this.bikeResult?.data?.fields?.Rate__c.value * 1.10)
             const fields = {};
             const rate = this.bikeResultFields.Rate__c.value * 1.10;
             fields[ID_FIELD.fieldApiName] = this.recordId;
             fields[RATE_FIELD.fieldApiName] = Math.round(rate);
             const recordInput = { fields };
             console.log('recordInput fields:', JSON.stringify(recordInput.fields));
             updateRecord(recordInput)
                 .then(() => {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Bike Price Updated',
                             variant: 'success'
                         })
                     );
                     refreshApex(this.bikeResult);
                     const message = { Detail : this.bikeResult };
                     publish(this.messageContext, BIKELMSC, message);
                     this.isLoading= false;
                 })
                 .catch(error => {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error updating record',
                             message: error.body.message,
                             variant: 'error'
                         })
                     );
                 });
         }

}
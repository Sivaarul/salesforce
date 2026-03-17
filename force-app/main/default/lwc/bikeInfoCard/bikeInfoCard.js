import { LightningElement ,api ,wire  } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { subscribe, MessageContext } from 'lightning/messageService';
import BIKELMSC from '@salesforce/messageChannel/BikeMessageChannel__c';
import NAME_FIELD from '@salesforce/schema/bike__c.Name';
import MODEL_FIELD from '@salesforce/schema/bike__c.Model_Number__c';
import RATE_FIELD from '@salesforce/schema/bike__c.Rate__c';
import RELEASE_FIELD from '@salesforce/schema/bike__c.Release_Year__c';


const FIELDS = [NAME_FIELD, MODEL_FIELD, RATE_FIELD, RELEASE_FIELD];

export default class BikeInfoCard extends LightningElement {

      @api recordId;
      isEditMode = false;
      @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, BIKELMSC, (message) => {
            this.message = message.Detail;
            console.log('Data fromt the LMS', this.message.data.fields);
        });
    }
     
     @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
     bikevalues;


     get showBikeInfo()
     {
           return this.bikevalues.data ? this.bikevalues.data : null;
     }
     get hasError() {
        return this.bikevalues.error;
    }
       
    handleEdit()
    {
         this.isEditMode = true;
    }
     handleCancel() {
        this.isEditMode = false;
         const toastEvent = new ShowToastEvent({
        title: 'Cancelled',
        message: 'Edit cancelled successfully.',
        variant: 'info'
    });

    this.dispatchEvent(toastEvent);
    }

    handleSuccess() {
        this.isEditMode = false;
         const toastEvent = new ShowToastEvent({
        title: 'Success',
        message: 'Bike record updated successfully!',
        variant: 'success'
    });

    this.dispatchEvent(toastEvent);
    refreshApex(this.bikevalues);
    }
}
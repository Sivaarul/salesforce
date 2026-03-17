import { LightningElement, wire,track } from 'lwc';
import getBikes from '@salesforce/apex/BikeController.getAllBikesDetails';
import { NavigationMixin } from 'lightning/navigation';
import { updateRecord  } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name',editable: true },
    { label: 'Model Number', fieldName: 'Model_Number__c',editable: true },
    { label: 'Rate', fieldName: 'Rate__c', type: 'currency',editable: true },
    { label: 'Release Year', fieldName: 'Release_Year__c', type: 'number',editable: true },
    {
        type: 'button',
        typeAttributes: {
            label: 'View',
            name: 'view',
            variant: 'brand'
        }
    }
];

export default class BikeListDashboard extends NavigationMixin(LightningElement)  {
   columns = COLUMNS;
    data = [];
    wiredBikesResult;
    @wire(getBikes)
    wiredBikes(result) {
    this.wiredBikesResult = result; // store the wire response
    if (result.data) {
        this.data = result.data; // use data in datatable
    } else if (result.error) {
            this.showToast('Error', result.error.body.message, 'error');
        }
    }
      handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

         if (actionName === 'view') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'bike__c', 
                    actionName: 'view'
                }
            });
        }
    }

     handleSave(event) {
        const updatedFields = event.detail.draftValues.map(draft => {
            return { fields: { ...draft } };
        });

        const updatePromises = updatedFields.map(record => updateRecord(record));

        Promise.all(updatePromises)
            .then(() => {
                 console.log('resut',updatePromises);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Bikes updated',
                        variant: 'success'
                  })
                );
                this.draftValues = [];
                return refreshApex(this.wiredBikesResult);
            })
            .catch(error => {
              this.dispatchEvent(
                   new ShowToastEvent({
                        title: 'Error',
                         message: error?.body?.message || error?.message || JSON.stringify(error),
                        variant: 'error'
                    })
                );
            });
    }
}
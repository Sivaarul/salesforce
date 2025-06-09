import { LightningElement,track,wire } from 'lwc';
import userId from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';

export default class HomeLwc extends LightningElement {
    @track name ;
    @wire(getRecord, { recordId: userId})
    userRecord({ error, data }) {
        if(data) {
            this.name = data.fields.Name.value;
        } else if(error) {
            console.error(error);
        }
    }
}
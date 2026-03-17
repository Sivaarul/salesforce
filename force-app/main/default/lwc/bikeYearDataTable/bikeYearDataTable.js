import { LightningElement } from 'lwc';
import GetBikeRestult from '@salesforce/apex/BikeController.getBikebyYear';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Model Number', fieldName: 'Model_Number__c' },
    { label: 'Rate', fieldName: 'Rate__c', type: 'currency'},
    { label: 'Release Year', fieldName: 'Release_Year__c', type: 'number' }]

export default class BikeYearDataTable extends LightningElement {
            selectedBike = '';
            columns = COLUMNS;
            data = [];
            ShowTable = false;

    bikeOptions = [
        { label: '2000', value: '2000' },
        { label: '2001', value: '2001' },
        { label: '2002', value: '2002' },
        { label: '2003', value: '2003' }
    ];

    handleChange(event) {
        this.selectedBike = event.detail.value;
        GetBikeRestult({ yearvlue: this.selectedBike })
            .then(result => {
                this.data = result;
                this.ShowTable = true;
                if(result.length === 0){
                    this.ShowTable = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'no Bike found for the selected year',
                        variant: 'error'
                  })
                );
                }
            })
            .catch(error => {
                console.error('Error fetching bike data:', error);
                // Handle the error as needed
            });
    }


}
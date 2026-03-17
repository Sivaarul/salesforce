import { LightningElement , wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_NAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import  GetStageRecord from '@salesforce/apex/BikeController.GetOpportunity';


export default class OpportunityControlloer extends LightningElement {

    stageOptions= [];
    stageData = [];
     @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    objectInfo;
        @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_NAME_FIELD })
    wiredPicklist({ error, data }) {
        if (data) {
            // Convert picklist values to options for a lightning-combobox
            this.stageOptions = data.values.map(item => {
                return { label: item.label, value: item.value };
            });
            const stageValues = this.stageOptions.map(stage => stage.value);
            GetStageRecord({ stageName : stageValues})
          .then(result => 
         {
            this.stageData = Object.keys(result).map(stage => {
        return {
            stage: stage,
            opportunities: result[stage]
        };
          });
            
         })   

        } else if (error) {
            console.error('Error fetching StageName picklist values', error);
        }
    }

 get tableRows() {

    let maxRows = Math.max(...this.stageData.map(s => s.opportunities.length));
    let rows = [];

    for (let i = 0; i < maxRows; i++) {

        let row = {
            id: 'row-' + i,
            cells: []
        };

        this.stageData.forEach(stage => {
            row.cells.push(stage.opportunities[i] || '');
        });
       
        rows.push(row);
        

    }
       
    return rows;
}
}
     

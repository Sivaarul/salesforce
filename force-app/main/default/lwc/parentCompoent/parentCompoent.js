import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

     value;

handleChildData(event)
{
        this.value = event.detail;
        console.log(this.value);
}
}

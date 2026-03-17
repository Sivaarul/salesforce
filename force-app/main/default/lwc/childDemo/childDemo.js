import { LightningElement } from 'lwc';

export default class ChildDemo extends LightningElement {
   renderedCallback() {
        console.log('Child: renderedCallback');
    }

    disconnectedCallback() {
        console.log('Child: disconnectedCallback');
    }

}
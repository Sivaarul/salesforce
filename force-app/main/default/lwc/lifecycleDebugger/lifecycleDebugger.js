import { LightningElement } from 'lwc';

export default class LifecycleDebugger extends LightningElement {

 

 showChild = true;

    renderedCallback() {
        console.log('Parent: renderedCallback');
    }

    disconnectedCallback() {
        console.log('Parent: disconnectedCallback');
    }

    get buttonLabel() {
        return this.showChild ? 'Hide Child' : 'Show Child';
    }

    toggleChild() {
        this.showChild = !this.showChild;
    }
        

}
import { LightningElement } from 'lwc';

export default class ChildCompoent extends LightningElement {

     handleChange(event)
     {
          
           const customent = new CustomEvent('passdata',{
              detail: event.target.value ? event.target.value : 'null'
           });

           this.dispatchEvent(customent);
     }

}
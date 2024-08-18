import { LightningElement , wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getObjectInfo , getPicklistValues } from 'lightning/uiObjectInfoApi';
import Cricketer_object from '@salesforce/schema/Cricketers__c';
import Nationality_Field from '@salesforce/schema/Cricketers__c.Nationality__c';

export default class PlayerSearchList extends  LightningElement {
    
    recordTypeId;
    pickListValue;
    optionsArray;
    selectedNationality;
    custommessage;
    
    

    @wire(getObjectInfo,{objectApiName: Cricketer_object})
    objectInfos({data,error}){
        if(error){
            console.log(JSON.stringify(error));
        }
        else if(data){
            this.recordTypeId =data.defaultRecordTypeId;
        }
    }

    @wire(getPicklistValues,{ recordTypeId : '$recordTypeId',fieldApiName : Nationality_Field })
    nationalityFieldValues({data,error}){
        if(error){
            console.log(JSON.stringify(error));
        }
        else if(data){
            let arr=[]
            this.pickListValue =data.values;

            this.pickListValue.forEach( element => { arr.push( { label :element.value , value : element.value})})
            this.optionsArray = arr;

        
        }
    }

    handleOptionChange(event){
        console.log('handle option change');
        this.selectedNationality = event.detail.value;
        console.log('selected antionality:'+JSON.stringify(this.selectedNationality));
        this.template.querySelector('c-cricket-player-details').searchCricketer(this.selectedNationality);

    }
    

    createCricketer()
    {

       this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Cricketers__c',
                actionName: 'new'
            },
        });

    }

    handleCustomMessage(event){

        this.custommessage = event.detail.playerId;
        //alert(this.custommessage);
        console.log('child to parent' +JSON.stringify(this.custommessage));

    }

   
}
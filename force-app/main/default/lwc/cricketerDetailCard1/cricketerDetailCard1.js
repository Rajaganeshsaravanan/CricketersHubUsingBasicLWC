import { LightningElement, wire } from 'lwc';
import { publish , MessageContext, subscribe } from 'lightning/messageService';
import SELECTED_PLAYER_CHANNEL from '@salesforce/messageChannel/SelectedPlayer__c';
import getSelectedPlayerDetails from '@salesforce/apex/cricketPlayerDetails.getSelectedPlayerDetails';
import { NavigatioMixin } from 'lightning/navigation';
export default class CricketerCard extends NavigatioMixin(LightningElement) {

    @wire(MessageContext)
    messageContext

    receivedMessage;
    selectedPlayerId;
    cricketerData;
    connectedCallback()
    {
        subscribe(this.messageContext,SELECTED_PLAYER_CHANNEL,(message)=>{
            console.log('Received Message '+ JSON.stringify(message));
            this.handleMessage(message.cricketerId)


        })
    }

    

    handleMessage(cricketerId)
    {
        
        this.selectedPlayerId = cricketerId;

        getSelectedPlayerDetails({ playerId : this.selectedPlayerId })
        .then(result => {
            this.cricketerData = result;
            console.log('Selected player Detail '+JSON.stringify(result))
        })
        .catch(error =>{console.error(error);
            
        })       
        
    }

    handleNavigation(){
        this[NavigatioMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId: this.selectedPlayerId,
                objectApiName : 'Cricketers__c',
                actionName : 'view'

            }
        })

    }

}
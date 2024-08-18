import { LightningElement ,api,wire } from 'lwc';
import getcricketPlayerDetails from '@salesforce/apex/cricketPlayerDetails.getcricketPlayerDetails';
import { publish , MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER_CHANNEL from '@salesforce/messageChannel/SelectedPlayer__c';

export default class CricketPlayerDetails extends LightningElement {

    playerdetails;
    cricketerNationality='';
    selectedPlayerId='';


    @wire(getcricketPlayerDetails,{nationality:'$cricketerNationality'})
    playerDetails({data,error}){
        if(data){
            this.playerdetails = data;
        }

        else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }

    @wire(MessageContext)
    messageContext;

    handleClickPlayerCard(event){
        this.selectedPlayerId = event.currentTarget.dataset.id;
        console.log('Plaer ID:'+JSON.stringify(this.selectedPlayerId));

        console.log('Before calling publish '+JSON.stringify(this.selectedPlayerId));

        publish(this.messageContext , SELECTED_PLAYER_CHANNEL , { cricketerId : this.selectedPlayerId});
        console.log('After calling publish '+JSON.stringify(this.selectedPlayerId));
        
        let boxclass = this.template.querySelectorAll('.selected');
        if(boxclass.length > 0){
            this.removeclass();
        }

        //let playerbox = this.template.querySelector('[data-id = "${this.selectedPlayerId}"]');
        let playerbox = this.template.querySelector(`[data-id="${this.selectedPlayerId}"]`);
        if(playerbox){
            playerbox.className= 'title_wrapper selected';
        }

        this.dispatchEvent(new CustomEvent("select",{
            detail:{ 
                playerId : this.selectedPlayerId 
              }
            }));

    }

    removeclass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected');
    }

    @api searchCricketer(selectedNationality){

        console.log('Value in Child : '+JSON.stringify(selectedNationality));
        this.cricketerNationality = selectedNationality;

    }
}
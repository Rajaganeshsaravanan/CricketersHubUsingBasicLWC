public with sharing class cricketPlayerDetails {
    @AuraEnabled(cacheable=true) 
    public static List<Cricketers__c> getcricketPlayerDetails(String nationality) {


        System.debug('Nationlaity'+nationality);


        if(nationality == '')
        {
            return [select Id,Name,Nationality__c,Runs__c,Image__c,Image_Url__c from Cricketers__c];
        }
        else
        {
            return  [select Id,Name,Nationality__c,Runs__c,Image__c,Image_Url__c from Cricketers__c where Nationality__c =: nationality];
        }
  
    }

    @AuraEnabled(cacheable=true)
    public static Cricketers__c getSelectedPlayerDetails(String playerId)
    {
        Cricketers__c Cricketer = [ select Id,Name,Nationality__c,Runs__c,Image__c,Image_Url__c from Cricketers__c where Id =: playerId];
        return Cricketer;

    }

    
}
public with sharing class BikeController {
    
     @AuraEnabled(cacheable=true)
     public static List<bike__c > getAllBikesDetails(){
        try {
            return [SELECT Id, Name, Model_Number__c, Rate__c, Release_Year__c FROM bike__C];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
     }


        @AuraEnabled(cacheable=true)
     public static List<bike__c > getBikebyYear(String yearvlue){
        try {
            return [SELECT Id, Name, Model_Number__c, Rate__c, Release_Year__c FROM bike__C
             where Release_Year__c = :yearvlue];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
     }


     @AuraEnabled
     public static List<Contact> getAllContacts(){
        try {
                 return [select Id,firstname,lastname,email,AccountId from contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
     }

      @AuraEnabled
      public static Map<String, List<String>>  GetOpportunity(List<String> stageName){
        try {
             
              Map<String, List<String>> stageOppMap = new Map<String, List<String>>();

        for(Opportunity opp : [
            SELECT Name, StageName
            FROM Opportunity
            WHERE StageName IN :stageName
        ]){
            if(!stageOppMap.containsKey(opp.StageName)){
                stageOppMap.put(opp.StageName, new List<String>());
            }

            stageOppMap.get(opp.StageName).add(opp.Name);
        }

        return stageOppMap;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
      }

}
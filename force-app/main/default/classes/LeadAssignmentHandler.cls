public with sharing class LeadAssignmentHandler {

    public static void assignLead(list<lead> leadlist)
    {


         List<Queue_Config__mdt> configs = [SELECT  queue_Name__c,Lead_Source__c FROM Queue_Config__mdt];

         Set<String> queueDevNames = new Set<String>();
            for (Queue_Config__mdt cfg : configs) {
                queueDevNames.add(cfg.queue_Name__c);
            }

        Map<String, Id> queueMap = new Map<String, Id>();
         
            for (Group g : [
                SELECT Id, Name 
                FROM Group 
                WHERE Type = 'Queue' 
                AND Name IN : queueDevNames
            ]) {
                queueMap.put(g.name , g.Id);
            }
 
                Map<String, Id> leadSourceToQueueMap = new Map<String, Id>();

        for (Queue_Config__mdt cfg : configs) {
            if (queueMap.containsKey(cfg.Queue_Name__c)) {
                leadSourceToQueueMap.put(
                    cfg.Lead_Source__c,
                    queueMap.get(cfg.Queue_Name__c)
                );
            }
        }
           for (Lead ld : leadList) {
    if (ld.LeadSource != null && leadSourceToQueueMap.containsKey(ld.LeadSource)) {
        ld.OwnerId = leadSourceToQueueMap.get(ld.LeadSource);
        //System.debug('Assigning Lead with LeadSource ' + ld.LeadSource + ' to Queue Id ' + ld.OwnerId);
    }
}
        }
    
}
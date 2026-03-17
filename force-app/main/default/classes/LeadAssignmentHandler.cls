public with sharing class LeadAssignmentHandler {

    public static void assignLead(list<lead> leadlist)
    {
           for(lead ld : leadlist)
           {
                system.debug(ld.FirstName);
           }
    }
    
}
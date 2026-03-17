trigger LeadAssignmentTrigger on Lead (after insert ,after update) {
    
    if(trigger.isAfter && (trigger.isInsert || trigger.isUpdate)){
        for(Lead led : trigger.new)
        {
              LeadAssignmentHandler.assignLead(trigger.new);
        }
    }

}
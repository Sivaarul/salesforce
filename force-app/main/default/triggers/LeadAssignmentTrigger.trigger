trigger LeadAssignmentTrigger on Lead (before insert, before update) {

    if (Trigger.isBefore) {
        LeadAssignmentHandler.assignLead(Trigger.new);
    }

}
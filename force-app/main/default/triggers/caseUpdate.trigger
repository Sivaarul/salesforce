trigger caseUpdate on Case (before update) {

    // List to hold cases needing processing
    List<Case> casesToProcess = new List<Case>();

    // Loop over all updated cases
    for (Case cas : Trigger.new) {

        Case oldCase = Trigger.oldMap.get(cas.Id);

        // Check if IsEscalated field changed AND other conditions met
        if (cas.IsEscalated != oldCase.IsEscalated &&
            cas.Status == 'Escalated' &&
            cas.Priority == 'High' &&
            cas.Escalation_Email_Sent__c == false) {

            casesToProcess.add(cas);
        }
    }

    // Call handler once for relevant cases only
    if (!casesToProcess.isEmpty()) {
        caseUpdateHandler.updateCase(casesToProcess);
    }
}
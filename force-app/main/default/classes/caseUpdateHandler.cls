public with sharing class caseUpdateHandler {
    
     public static void updateCase(List<Case> caseList){

          List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

          for (Case cs : caseList) {

            if (cs.OwnerId != null && !cs.Owner.name.startsWith('OOG')){

                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

                mail.setTargetObjectId(cs.OwnerId); // Send to case owner
                mail.setWhatId(cs.Id); // Relate email to Case
                mail.setSaveAsActivity(true); // Log as activity
                mail.setSubject('Case Escalation Notification');
                mail.setPlainTextBody(
                    'Case ' + cs.CaseNumber + ' has been escalated to High priority.'
                );

                emails.add(mail);

                // Update flag to true
                cs.Escalation_Email_Sent__c = true;
            }
        }

          if (!emails.isEmpty()) {
            Messaging.sendEmail(emails);
        }


            }
        }

         
    

public with sharing class futureMethod {
    @future
    public static void updateAccountName(Id accountId) {
        Account acc = [SELECT Id, Name FROM Account WHERE Id = :accountId];
        acc.Name = acc.Name + ' (Updated)';
        update acc;
    }
}
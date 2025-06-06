public with sharing class apexstory01 {
    public static void getres()
    {
         List<Opportunity> opplist = [select id,name,closedate,amount from Opportunity ];

         System.debug(opplist);
    }
}
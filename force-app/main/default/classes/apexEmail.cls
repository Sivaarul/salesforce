public class apexEmail
{
      public static void getresult()
      {
         
         map<Id,Account>  accountmap = new map<id,Account>([select id,name,type,OwnerId from Account]);

         system.debug(accountmap);
         
          List<contact> oldcontact = [select id,lastname,email from contact ];

           set<Id> conid = new set<id>();
           for(contact con : oldcontact)
           {
                conid.add(con.id);
           }
          //system.debug(conid);
          //system.debug(oldcontact);
      }
}
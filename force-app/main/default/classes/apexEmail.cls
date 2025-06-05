public class apexEmail
{
      public static void getresult()
      {
         
         map<Id,Account>  accountmap = new map<id,Account>([select id,name,type,OwnerId from Account]);

         system.debug(accountmap);
      }
}
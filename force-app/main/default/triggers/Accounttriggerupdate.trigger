trigger Accounttriggerupdate on Account (before update) {

    if(trigger.isUpdate && trigger.isBefore)
    {
         
        for(Account acc: trigger.new)
        {
              Account oldmap = trigger.oldMap.get(acc.id);
              if(acc.phone == null  && oldmap.phone == null)
              {
                  acc.phone = '490344309';
              }
        }
    }

}
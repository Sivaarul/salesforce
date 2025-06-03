trigger Accounttriggerupdate on Account (before update) {

    if(trigger.isUpdate && trigger.isBefore)
    {
        for(Account acc: trigger.new)
        {
              if(acc.phone == null)
              {
                  acc.phone = '490344309';
              }
        }
    }

}
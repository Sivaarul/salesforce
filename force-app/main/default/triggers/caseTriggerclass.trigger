trigger caseTriggerclass on case (before insert) {

    for(case cs : trigger.new)
    {
         system.debug(trigger.new);
    }

}
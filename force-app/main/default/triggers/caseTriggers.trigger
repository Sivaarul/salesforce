trigger caseTriggers on case (before insert,before update) {

  for(case cs:trigger.new)
  {
       cs.Type = 'Electrical'
  }

}
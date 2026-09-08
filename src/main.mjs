import * as system from "./_helpers.mjs";

Hooks.once("init", () => {
  console.log(system.Consts.SYSTEMID + " | Initialisation du système " + system.Consts.SYSTEMID);
  system.Base.init();
  
  system.Base.Helpers.Handlebars.registerFunctions();

  //system.DiceRoller.fct.registerDiceRolls();

  system.Base.ChatMessage.DynamicChatMessageManager.init();

  
});



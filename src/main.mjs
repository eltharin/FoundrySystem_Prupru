import * as system from "./_helpers.mjs";


import { BaseActorDataModel } from "./Actor/DataModel/BaseActorDataModel.mjs";
import { BaseActorSheet } from "./Actor/Sheet/BaseActorSheet.mjs";


Hooks.once("init", () => {
  console.log(system.Consts.SYSTEMID + " | Initialisation du système " + system.Consts.SYSTEMID);
  system.Base.init();
  
  system.Base.Helpers.Handlebars.registerFunctions();

  //system.DiceRoller.fct.registerDiceRolls();

  system.Base.ChatMessage.DynamicChatMessageManager.init();

  system.Base.Helpers.Actor.register("actor", BaseActorDataModel, BaseActorSheet, game.i18n.localize(system.Consts.SYSTEMID + ".sheet.names.baseactor"));
  
});



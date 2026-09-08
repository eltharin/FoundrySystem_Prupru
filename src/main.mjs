import * as system from "./_helpers.mjs";


import { BaseActorDataModel } from "./Actor/DataModel/BaseActorDataModel.mjs";
import { BaseActorSheet } from "./Actor/Sheet/BaseActorSheet.mjs";
CONFIG.debug.hooks = true;

Hooks.once("init", () => {
  console.log(system.Consts.SYSTEMID + " | Initialisation du système " + system.Consts.SYSTEMID);
  system.Base.init();
  
  system.Settings.fct.registerSettings();
  
  system.Base.Helpers.Handlebars.registerFunctions();

  system.DiceRoll.fct.registerDiceRolls();

  system.Base.ChatMessage.DynamicChatMessageManager.init();

  system.Base.Helpers.Actor.register("actor", BaseActorDataModel, BaseActorSheet, game.i18n.localize(system.Consts.SYSTEMID + ".sheet.names.baseactor"));
  
});



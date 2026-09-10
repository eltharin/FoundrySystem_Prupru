import * as system  from "../../_helpers.mjs";

export class BaseItemSheet extends system.Base.BaseSheet(
  foundry.applications.sheets.ItemSheetV2
) {
  
  static PARTS = {
    form: { 
      template: system.Consts.TEMPLATES_PATH + "/item/baseTemplate.hbs",
    },
  
  };

  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    position: {
      width: 790,
      height: 360,
    },
  }

  async _prepareContext(options) {
    
    const context = await super._prepareContext(options);

    return context
  }

}
import { SystemConsts } from "../SystemConsts.mjs";



export function registerSettings()
{
    game.settings.register(SystemConsts.SYSTEMID, "enableMalus", {
        name: SystemConsts.SYSTEMID + ".settings.enableMalus",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        requiresReload: true
    });

}
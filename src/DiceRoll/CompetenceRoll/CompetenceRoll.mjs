
import * as system  from "../../_helpers.mjs";

export class CompetenceRoll extends Roll
{
    static CHAT_TEMPLATE = system.Consts.TEMPLATES_PATH + "/dice/competence/roll-result.hbs";

    isSuccess()
    {
        console.log(this.total, this.options.seuil)
        return this.total <= this.options.seuil;
    }

    
    async _prepareChatRenderContext({flavor, isPrivate=false, ...options}={}) {
        let ret = await super._prepareChatRenderContext({flavor, isPrivate, ...options});
        ret.seuil = this.options.seuil;
        ret.total = this.total;
        ret.competence = this.options.competence;
        ret.result = this.isSuccess();
        return ret;
    }

/*
    after(callback)
    {
        console.log("set after");
        
        const myHookId = Hooks.on("renderChatMessageHTML", async (message, options, userId) => {
            console.log(message, options, userId, this);

        const elementDOM = await new Promise((resolve) => {
            const interval = setInterval(() => {
                const node = document.querySelector(`[data-message-id="${message.id}"]`);
                console.log("coucou", foundry.utils.deepClone(node), node.hidden)
                // On vérifie que le message est dans le DOM et qu'il est visible/affiché
                if (node && !node.hidden) {
                    clearInterval(interval); // On arrête la boucle
                    resolve(node);          // On renvoie l'élément trouvé
                }
            }, 50); // Fréquence de vérification (50ms est invisible pour l'œil humain)
        });

            Hooks.off("nomDuHook", myHookId);

            callback(message, options, userId);
            
        } );
        
        console.log("my new hook id " + myHookId)
    }*/


/*    static CHAT_TEMPLATE = system.Consts.TEMPLATES_PATH + "/dice/competence/roll-result.hbs";

    static fromData(data) {
        return super.fromData(data);
    }

    constructor(formula="", data={}, options={}) {
        super(formula, data, options);
        
    }

    async _prepareChatRenderContext({flavor, isPrivate=false, ...options}={}) {
        let ret = await super._prepareChatRenderContext({flavor, isPrivate, ...options});
        ret.isMJ = game.user.isGM;
        ret.title = this.options.title;
        ret.total = this.total;
        ret.result = this.getResult();
        ret.difficulte = this.options.rangDifficulte;
        ret.ptHeroisme = this.calculResult() >= 1 ? this.options.rangDifficulte : 0;
        ret.competence = this.options.competence;
        return ret;
    }

    calculResult()
    {
        return this.total - this.options.rangDifficulte;
    }
    getResult()
    {
        return this.calculResult() < 0 ? "Echec" : "Réussite";
    }

    async getTooltip() {
        const parts = this.dice.map(d => d.getTooltipData());
        return foundry.applications.handlebars.renderTemplate(this.constructor.TOOLTIP_TEMPLATE, {
            parts: game.user.isGM ? parts : parts.map(p => ({
                ...p, 
                formula: "",
                total: "",
                rolls: p.rolls.map(r => ({...r, classes: r.classes.replace("success", "")}))
            }))
        });
    }*/

}
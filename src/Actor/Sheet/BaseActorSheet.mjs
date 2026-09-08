import * as system from "../../_helpers.mjs";


export class BaseActorSheet extends system.Base.BaseSheet(
    foundry.applications.sheets.ActorSheetV2
) {

    static PARTIALS = {
        sidebar: system.Consts.TEMPLATES_PATH + "/actor/parts/sidebar.hbs",
    };

    static PARTS = {
        form: {
            template: system.Consts.TEMPLATES_PATH + "/actor/base/sheet.hbs",
            templates: [
                "sidebar",
            ]
        },
        main: {
            template: system.Consts.TEMPLATES_PATH + "/actor/parts/carac.hbs",
            container: { id: "form", element: ".tabscontainer" },
        },
        perso: {
            template: system.Consts.TEMPLATES_PATH + "/actor/parts/perso.hbs",
            container: { id: "form", element: ".tabscontainer" },
            scrollable: [".tabscontainer"]
        },
        items: {
            template: system.Consts.TEMPLATES_PATH + "/actor/parts/items.hbs",
            container: { id: "form", element: ".tabscontainer" },
        },
        notes: {
            template: system.Consts.TEMPLATES_PATH + "/actor/parts/notes.hbs",
            container: { id: "form", element: ".tabscontainer" },
        },
        /*mj: {
          template: system.Consts.TEMPLATES_PATH + "/actor/parts/mj.hbs",
          container: { id: "form" , element: ".tabscontainer" },
        },*/
    };

    static TABS = {
        sheet: {
            tabs: [
                { id: "main", label: system.Consts.SYSTEMID + ".sheet.actor.tabs.main" },
                { id: "perso", label: system.Consts.SYSTEMID + ".sheet.actor.tabs.perso" },
                { id: "items", label: system.Consts.SYSTEMID + ".sheet.actor.tabs.items" },
                { id: "notes", label: system.Consts.SYSTEMID + ".sheet.actor.tabs.notes" },
                // {id: "mj", label: system.Consts.SYSTEMID + ".sheet.actor.tabs.GM", condition: () => game.user.isGM,},
            ],
            initial: "main",
        }
    };

    static DEFAULT_OPTIONS = {
        classes: [...super.DEFAULT_OPTIONS.classes ?? [], "glyphes-sheet", "glyphes-actor-sheet"],
        actions: {
            verouillage: this.verouillage,
            deverouillage: this.deverouillage,

            toggle: this._onToggle,

            addItem: this._onAddItem,
            editItem: this._onEditItem,
            deleteItem: this._onDeleteItem,

            rollCompetence: this.onRollCompetence,

        },
        position: {
            width: 1030,
            height: 800,
        },
        window: {
            resizable: true,
            controls: [
                {
                    action: "verouillage",
                    icon: "fa-solid fa-lock",
                    label: system.Consts.SYSTEMID + ".sheet.common.lock",
                    ownership: "OWNER",
                    visible: this.#canVerouillage
                },
                {
                    action: "deverouillage",
                    icon: "fa-solid fa-unlock",
                    label: system.Consts.SYSTEMID + ".sheet.common.unlock",
                    ownership: "OWNER",
                    visible: this.#canDeverouillage
                }
            ]
        },
    }

    static #canVerouillage() {
        return this.isEditable && !this.actor.system.isLocked;
    }

    static #canDeverouillage() {
        return this.isEditable && this.actor.system.isLocked;
    }

    static async verouillage() {
        await this.actor.update({ "system.isLocked": true });
        this._updateFrame({ window: {} });
    }

    static async deverouillage() {
        await this.actor.update({ "system.isLocked": false });
        this._updateFrame({ window: {} });
    }

    static async _onToggle(event, target) {
        this.element.querySelectorAll("[data-toggle_section='" + target.dataset.toggle + "']").forEach(e => e.classList.toggle("visible"));
        //--TODO: ajouter changement icone
    }

    _prepareSubmitData(event, form, formData, updateData) {

        let data = super._prepareSubmitData(event, form, formData, updateData);

        return data;
    }


    async _prepareContext(options) {

        const context = await super._prepareContext(options)

        context.isVerrou = this.document.system.isLocked;
        context.playWithMalus = game.settings.get(system.Consts.SYSTEMID, "enableMalus");
        context.items = this.document.items;

        return context
    }

    async _preparePartContext(partId, context, options) {
        context = await super._preparePartContext(partId, context, options);


        return context;
    }


    async _onDrop(event) {
        const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);

        switch (data.type) {
            case "Item":
                //const item = fromUuidSync(data.uuid);

                if (item.type == "item") {
                    super._onDrop(event);

                }
                else {
                    console.log("Tentative de drop d'un item de type " + item.type + " sur la fiche acteur, ce qui n'est pas supporté.");
                }
        }
    }

    static async onRollCompetence(event, message, target) 
    {
        const competence = event.target.dataset.competence;

        const myRoll = new system.DiceRoll.CompetenceRoll("1d20", {}, {
            seuil: this.document.system.competences[competence].total,
            competence: competence,
            actor: this.document.uuid,
        });

        await myRoll.toMessage({
            speaker: ChatMessage.getSpeaker({ alias: this.document.name + " ( " + game.user.name + " )" }),
        });

        if(myRoll.isSuccess())
        {

            this.document.update({["system.competences." + competence + ".malus"]: this.document.system.competences[competence].malus +1});
        }        

    }

    static async _onAddItem(event, target) {
        event.preventDefault();
        const type = target.dataset.type;

        const itemData = {
            name: type,
            type: type,
            system: {}
        };

        // Créer l'item sans render automatique
        const created = await this.document.createEmbeddedDocuments("Item", [itemData], { render: true });
        if (created && created[0]) {
            created[0].sheet.render(true, { force: true });
        }

        return created;
    }

    static async _onEditItem(event, target) {
        event.preventDefault();
        const item = this.document.items.get(target.dataset.itemid);
        if (item) {
            if (item.sheet.rendered) {
                item.sheet.bringToTop();
            } else {
                item.sheet.render(true, { force: true });
            }
        }
    }

    static async _onDeleteItem(event, target) {
        event.preventDefault();
        const item = this.document.items.get(target.dataset.itemid);


        if (item) {
            if (item.system.isDefault == true) {
                ui.notifications.error(`Vous ne pouvez pas supprimer ${item.name}, c'est un élément de base.`);
                return;
            }

            let confirmed = false;

            if (event.ctrlKey && event.shiftKey) {
                confirmed = true;
            }
            else {
                confirmed = await system.Base.Dialog.confirm({
                    content: `<p>Êtes-vous sûr de vouloir supprimer ${item.name}?</p>`,
                    rejectClose: false,
                    modal: true
                });
            }

            if (confirmed) {

                await item.delete({ render: true });
                ui.notifications.info(`${item.name} supprimé(e)`);
            }
        }
    }

}
import * as system from "../../_helpers.mjs";


export class BaseActorDataModel extends system.Base.SystemDataModel {
    static defineSchema() {
    // All Actors have resources.
        return { 
            isLocked: new foundry.data.fields.BooleanField({initial: false}),
            
            notes: new foundry.data.fields.StringField({}),

            age: new foundry.data.fields.NumberField({initial: 0, min:0}),
            situationFamiliale: new foundry.data.fields.StringField({}),
            metier: new foundry.data.fields.StringField({}),
            loisirs: new foundry.data.fields.StringField({}),
            projet: new foundry.data.fields.StringField({}),
            valeursMorales: new foundry.data.fields.StringField({}),
            secret: new foundry.data.fields.StringField({}),
            firete: new foundry.data.fields.StringField({}),
            trauma: new foundry.data.fields.StringField({}),

            carac: new foundry.data.fields.SchemaField({
                corps: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min:0}),
                }),
                adresse: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min:0}),
                }),
                savoir: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min:0}),
                }),
                perception: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min:0}),
                }),
            }),
            
            competences: new foundry.data.fields.SchemaField({
                prouesse: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                combat: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                esquive: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                soin: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                bricolage: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                logique: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                charisme: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                reflexe: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                enquete: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
                vigilance: new foundry.data.fields.SchemaField({
                    malus: new foundry.data.fields.NumberField({initial: 0})
                }),
            }),

            
        };
    }

    static preSaveFunctions = [
        ...super.preSaveFunctions,
        
    ];

    prepareDerivedData() {

        this.competences.prouesse.value = this.carac.corps.value + this.carac.corps.value;
        this.competences.combat.value = this.carac.corps.value + this.carac.adresse.value; 
        this.competences.esquive.value = this.carac.adresse.value + this.carac.adresse.value;
        this.competences.soin.value = this.carac.corps.value + this.carac.savoir.value;
        this.competences.bricolage.value = this.carac.adresse.value + this.carac.savoir.value;
        this.competences.logique.value = this.carac.savoir.value + this.carac.savoir.value;
        this.competences.charisme.value = this.carac.corps.value + this.carac.perception.value;
        this.competences.reflexe.value = this.carac.adresse.value + this.carac.perception.value;
        this.competences.enquete.value = this.carac.savoir.value + this.carac.perception.value;
        this.competences.vigilance.value = this.carac.perception.value + this.carac.perception.value;

        if(game.settings.get(system.Consts.SYSTEMID, "enableMalus"))
        {
            this.competences.prouesse.total = this.competences.prouesse.value - this.competences.prouesse.malus;
            this.competences.combat.total = this.competences.combat.value - this.competences.combat.malus;
            this.competences.esquive.total = this.competences.esquive.value - this.competences.esquive.malus;
            this.competences.soin.total = this.competences.soin.value - this.competences.soin.malus;
            this.competences.bricolage.total = this.competences.bricolage.value - this.competences.bricolage.malus;
            this.competences.logique.total = this.competences.logique.value - this.competences.logique.malus;
            this.competences.charisme.total = this.competences.charisme.value - this.competences.charisme.malus;
            this.competences.reflexe.total = this.competences.reflexe.value - this.competences.reflexe.malus;
            this.competences.enquete.total = this.competences.enquete.value - this.competences.enquete.malus;
            this.competences.vigilance.total = this.competences.vigilance.value - this.competences.vigilance.malus;
        }
        else
        {
            this.competences.prouesse.total = this.competences.prouesse.value;
            this.competences.combat.total = this.competences.combat.value;
            this.competences.esquive.total = this.competences.esquive.value;
            this.competences.soin.total = this.competences.soin.value;
            this.competences.bricolage.total = this.competences.bricolage.value;
            this.competences.logique.total = this.competences.logique.value;
            this.competences.charisme.total = this.competences.charisme.value;
            this.competences.reflexe.total = this.competences.reflexe.value;
            this.competences.enquete.total = this.competences.enquete.value;
            this.competences.vigilance.total = this.competences.vigilance.value;
        }
    }

    getSacrificesCards() {
        this.sacrificesCards = this.sacrificeDeckId ? game.cards.get(this.sacrificeDeckId)?.availableCards : [];
    }

    _prepareDerivedData() {

    }

}
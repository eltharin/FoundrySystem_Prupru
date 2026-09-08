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
        this.competences.prouesse.total = this.competences.prouesse.value - this.competences.prouesse.malus;
        
        this.competences.combat = this.carac.corps.value + this.carac.adresse.value; 
        this.competences.combat = this.competences.combat.value - this.competences.combat.malus;

        this.competences.esquive = this.carac.adresse.value + this.carac.adresse.value;
        this.competences.esquive = this.competences.esquive.value - this.competences.esquive.malus;

        this.competences.soin = this.carac.corps.value + this.carac.savoir.value;
        this.competences.soin = this.competences.soin.value - this.competences.soin.malus;

        this.competences.bricolage = this.carac.adresse.value + this.carac.savoir.value;
        this.competences.bricolage = this.competences.bricolage.value - this.competences.bricolage.malus;

        this.competences.logique = this.carac.savoir.value + this.carac.savoir.value;
        this.competences.logique = this.competences.logique.value - this.competences.logique.malus;

        this.competences.charisme = this.carac.corps.value + this.carac.perception.value;
        this.competences.charisme = this.competences.charisme.value - this.competences.charisme.malus;

        this.competences.reflexe = this.carac.adresse.value + this.carac.perception.value;
        this.competences.reflexe = this.competences.reflexe.value - this.competences.reflexe.malus;

        this.competences.enquete = this.carac.savoir.value + this.carac.perception.value;
        this.competences.enquete = this.competences.enquete.value - this.competences.enquete.malus;

        this.competences.vigilance = this.carac.perception.value + this.carac.perception.value;
        this.competences.vigilance = this.competences.vigilance.value - this.competences.vigilance.malus;

    }

    getSacrificesCards() {
        this.sacrificesCards = this.sacrificeDeckId ? game.cards.get(this.sacrificeDeckId)?.availableCards : [];
    }

    _prepareDerivedData() {

    }

}
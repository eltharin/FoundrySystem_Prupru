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

            blessures: new foundry.data.fields.SchemaField({
                legere: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min: 0}),
                    maxval: new foundry.data.fields.NumberField({initial: -1})
                }),
                moyenne: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min: 0}),
                    maxval: new foundry.data.fields.NumberField({initial: -1})
                }),
                grave: new foundry.data.fields.SchemaField({
                    value: new foundry.data.fields.NumberField({initial: 0, min: 0}),
                    maxval: new foundry.data.fields.NumberField({initial: -1})
                }),
            }),

            volonte: new foundry.data.fields.SchemaField({
                value: new foundry.data.fields.NumberField({initial: 0, min: 0}),
                maxval: new foundry.data.fields.NumberField({initial: -1})
            }),
            stress: new foundry.data.fields.SchemaField({
                value: new foundry.data.fields.NumberField({initial: 0, min: 0}),
                maxval: new foundry.data.fields.NumberField({initial: -1})
            }),
        };
    }

    static preSaveFunctions = [
        ...super.preSaveFunctions,
        "verifPts",
        "verifBlessures",
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

        if(this.blessures.legere.maxval == -1)
        {
            this.blessures.legere.max = 4;
        }
        else
        {
            this.blessures.legere.max = this.blessures.legere.maxval;
        }

        if(this.blessures.moyenne.maxval == -1)
        {
            this.blessures.moyenne.max = 4;
        }
        else
        {
            this.blessures.moyenne.max = this.blessures.moyenne.maxval;
        }

        if(this.blessures.grave.maxval == -1)
        {
            this.blessures.grave.max = Math.floor(this.carac.corps.value / 2);
        }
        else
        {
            this.blessures.grave.max = this.blessures.grave.maxval;
        }

        if(this.volonte.maxval == -1)
        {
            this.volonte.max = Math.floor((this.carac.corps.value + this.carac.savoir.value) / 4);
        }
        else
        {
            this.volonte.max = this.volonte.maxval;
        }

        if(this.stress.maxval == -1)
        {
            this.stress.max = Math.floor((this.carac.corps.value + this.carac.savoir.value) / 4);
        }
        else
        {
            this.stress.max = this.stress.maxval;
        }

        this.blessures.legere.nope = this.blessures.legere.max - this.blessures.legere.value -1;
        this.blessures.moyenne.nope = this.blessures.moyenne.max - this.blessures.moyenne.value -1;
        this.blessures.grave.nope = this.blessures.grave.max - this.blessures.grave.value;
        this.stress.nope = this.stress.max - this.stress.value;
        this.volonte.nope = this.volonte.max - this.volonte.value;
    }

    getSacrificesCards() {
        this.sacrificesCards = this.sacrificeDeckId ? game.cards.get(this.sacrificeDeckId)?.availableCards : [];
    }

    _prepareDerivedData() {

    }

    verifPts(changes, clone){
        if(foundry.utils.getProperty(clone, "stress.value") > foundry.utils.getProperty(clone, "stress.max")) 
        {
            foundry.utils.setProperty(changes, "system.stress.value", foundry.utils.getProperty(clone, "stress.max") );
        }
        if(foundry.utils.getProperty(clone, "volonte.value") > foundry.utils.getProperty(clone, "volonte.max")) 
        {
            foundry.utils.setProperty(changes, "system.volonte.value", foundry.utils.getProperty(clone, "volonte.max") );
        }
    }

    verifBlessures(changes, clone){
        if(foundry.utils.getProperty(clone, "blessures.grave.value") > foundry.utils.getProperty(clone, "blessures.grave.max")) 
        {
            foundry.utils.setProperty(changes, "system.blessures.grave.value", foundry.utils.getProperty(clone, "blessures.grave.max") );
        }
        if(foundry.utils.getProperty(clone, "stress.value") > foundry.utils.getProperty(clone, "stress.max")) 
        {
            foundry.utils.setProperty(changes, "system.stress.value", foundry.utils.getProperty(clone, "stress.max") );
        }
        if(foundry.utils.getProperty(clone, "volonte.value") > foundry.utils.getProperty(clone, "volonte.max")) 
        {
            foundry.utils.setProperty(changes, "system.volonte.value", foundry.utils.getProperty(clone, "volonte.max") );
        }
    }

    addBlessureGrave()
    {
        if(this.blessures.grave.value >= this.blessures.grave.max)
        {
            return false;
        }
        this.blessures.grave.value += 1;
        return true;
    }

    addBlessureMoyenne()
    {
        console.log(this.blessures.moyenne.value, this.blessures.moyenne.max-1)
        if(this.blessures.moyenne.value < this.blessures.moyenne.max-1)
        {
            this.blessures.moyenne.value += 1;
            return true;
        }

        if(this.addBlessureGrave())
        {
            this.blessures.moyenne.value = 0;
            return true;
        }

        return false;
    }

    addBlessureLegere()
    {
        if(this.blessures.legere.value < this.blessures.legere.max-1)
        {
            this.blessures.legere.value += 1;
            return true;
        }

        if(this.addBlessureMoyenne())
        {
            this.blessures.legere.value = 0;
            return true;
        }

        return false;
    }

    removeBlessureGrave()
    {
        if(this.blessures.grave.value == 0)
        {
            return false;
        }
        this.blessures.grave.value -= 1;
        return true;
    }

    removeBlessureMoyenne()
    {
        if(this.blessures.moyenne.value > 0)
        {
            this.blessures.moyenne.value -= 1;
            return true;
        }

        if(this.removeBlessureGrave())
        {
            this.blessures.moyenne.value = this.blessures.moyenne.max-1;
            return true;
        }

        return false;
    }

    removeBlessureLegere()
    {
        if(this.blessures.legere.value > 0)
        {
            this.blessures.legere.value -= 1;
            return true;
        }

        if(this.removeBlessureMoyenne())
        {
            this.blessures.legere.value = this.blessures.legere.max-1;
            return true;
        }

        return false;
    }
}
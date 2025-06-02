import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    constructor() { }

    // Ajoutez ici vos méthodes pour gérer les templates
    getTemplates(): any[] {
        // Exemple de récupération de templates (à remplacer par une vraie logique)
        return [];
    }

    getTemplateById(id: number): any | undefined {
        // Exemple de récupération d'un template par ID
        return this.getTemplates().find(template => template.id === id);
    }

    getPopularTemplates(): any[] {
        // Exemple de récupération des templates populaires (à remplacer par une vraie logique)
        const templates = this.getTemplates();
        // Supposons que chaque template a une propriété 'popularity'
        return templates
            .filter(template => template.popularity && template.popularity > 50)
            .sort((a, b) => b.popularity - a.popularity);
    }

    addTemplate(template: any): void {
        // Ajoutez la logique pour ajouter un template
    }

    updateTemplate(id: number, updatedTemplate: any): void {
        // Ajoutez la logique pour mettre à jour un template
    }

    deleteTemplate(id: number): void {
        // Ajoutez la logique pour supprimer un template
    }
}
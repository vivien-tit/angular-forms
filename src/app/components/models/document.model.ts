export interface Document {
  id: string;
  titre: string;
  type: 'Facture' | 'Contrat' | 'Lettre' | 'Devis' | 'Autre';
  contenu: any; // JSON ou string
  dateCreation: Date;
  derniereModification?: Date;
  modeleId?: string;
}
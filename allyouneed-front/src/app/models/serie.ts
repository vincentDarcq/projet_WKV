export class Serie {
    
    id: number;
    titre: string;
    synopsis: string;
    genre: string;
    casting: string;
    createur: string;
    saisons: number;
    cov: string;
    pegi: string;
    avertissement: string;

    constructor(titre?: string, synopsis?: string, id?: number, 
        genres?: string, casting?: string, createur?: string, 
        saisons?: number, cov?: string, pegi?: string, avertissement?: string) {

        this.titre = titre;
        this.synopsis = synopsis;
        this.id = id;
        this.genre = genres;
        this.casting = casting;
        this.createur = createur;
        this.cov = cov;
        this.saisons = saisons;
        this.pegi = pegi;
        this.avertissement = avertissement;
    }
}
export class Serie {
    
    id: number;
    titre: string;
    synopsis: string;
    genre: string;
    casting: string;
    createur: string;
    saisons: number;
    cov: string;
    BA: string;

    constructor(titre?: string, synopsis?: string, id?: number, 
        genres?: string, casting?: string, createur?: string, 
        saisons?: number, cov?: string, BA?: string) {

        this.titre = titre;
        this.synopsis = synopsis;
        this.id = id;
        this.genre = genres;
        this.casting = casting;
        this.createur = createur;
        this.cov = cov;
        this.saisons = saisons;
        this.BA = BA;
    }
}
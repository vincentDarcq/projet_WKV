export class Serie {
    
    id: number;
    titre: string;
    synopsis: string;
    genre: string;
    casting: string;
    creator: string;
    seasons: number;
    cov: string;
    ba: string;

    constructor(titre?: string, synopsis?: string, id?: number, 
        genres?: string, casting?: string, createur?: string, 
        saisons?: number, cov?: string, ba?: string) {

        this.titre = titre;
        this.synopsis = synopsis;
        this.id = id;
        this.genre = genres;
        this.casting = casting;
        this.creator = createur;
        this.cov = cov;
        this.seasons = saisons;
        this.ba = ba;
    }
}
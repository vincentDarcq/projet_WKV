export class Movie {
    
    id: number;
    titre: string;
    synopsis: string;
    genre: string;
    casting: string;
    realisateur: string;
    cov: string;
    year: number;
    pegi: string;
    avertissement: string;
    note: Number;

    constructor(titre?: string, synopsis?: string, genres?: string, casting?: string, realisateur?: string, 
        cov?: string, year?: number, pegi?: string, avertissement?: string, id?: number) {

        this.titre = titre;
        this.synopsis = synopsis;
        this.id = id;
        this.genre = genres;
        this.casting = casting;
        this.realisateur = realisateur;
        this.cov = cov;
        this.year = year;
        this.pegi = pegi;
        this.avertissement = avertissement;
    }
}
export class User{

    id: number;
    pseudonyme: string;
    password: string;
    email: string;
    filmsfavoris: string;
    seriesfavoris: string;
    question: string;
    reponse: string;

    constructor(pseudonyme?: string, email?: string, password?: string, question?: string,
         reponse?: string, id?: number, filmsfavoris?: string, seriesfavoris?: string, ){
        this.pseudonyme = pseudonyme;
        this.password = password;
        this.email = email;
        this.question = question;
        this.reponse = reponse;
        this.id = id;
        this.filmsfavoris = filmsfavoris;
        this.seriesfavoris = seriesfavoris;
    }
}
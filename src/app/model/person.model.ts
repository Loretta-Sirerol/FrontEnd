export class Person {
    id?: number;
    name: string;
    surname: string;
    degree: string;
    about_me: string;

    constructor(name: string, surname: string,
        degree: string, about_me: string)
        {
            this.name = name;
            this.surname = surname;
            this.degree = degree;
            this.about_me  = about_me;
        }

}

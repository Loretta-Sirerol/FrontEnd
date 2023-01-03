export class JwtDTO {
    token!: String;
    bearer!: String;
    userName!: String;
    authorities!: Array<String>;
}

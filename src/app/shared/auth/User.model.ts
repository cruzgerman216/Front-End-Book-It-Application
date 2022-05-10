export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  public get token() {
    // Validation to ensure we have an ExpDate and it's not past the current date
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
      return null;

    // Send the user their token
    return this._token;
  }
}

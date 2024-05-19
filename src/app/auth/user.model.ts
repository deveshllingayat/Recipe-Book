export class User{
    constructor(public email:string,public id:string,private _token:string,private _tokenExpirationDate:Date){}
    //a getter is a function that we can access like a property ex- user.token & we cannot overwrite a getter i.e user.token = asdf
    get token(){
        if(!this._tokenExpirationDate || new Date()>this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}
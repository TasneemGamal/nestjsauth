import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
 constructor(
     private authService : AuthService
 ){
     super();
    }
    async validate(personname : string, pw : string) : Promise<any>{
            const person = await this.authService.validateUser(personname, pw);
            if(!person){
                    throw new UnauthorizedException();
            }
                return person;
            //case experiment two  const {pass,username, ...newresult} = user; in auth.service.ts
            return person.username; //this will return unauthorized as there won't be username inside the returned user from validateUser()
    }
}
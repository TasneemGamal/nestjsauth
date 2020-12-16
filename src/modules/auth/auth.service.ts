import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor( @Inject(forwardRef(() =>UsersService))
        private usersService : UsersService,
        private jwtServcise : JwtService,
    ){}

    // this function is called in the LocalStrategy Class (local.strategy.ts) 
    //then it takes the values returned from it validates if there is a person already (then returns person)  or not (returns null)
    async validateUser(username : string , pass: string): Promise<any>{
            const person = await this.usersService.findOneUser(username);
            if(person && person.password == pass){
                const {password, ...result} = person; // return the person object but not the password (without it i mean)
                //const {password,username, ...newresult} = person; // return the person object but not the password and username (without them i mean)
                console.log(password);
                console.log(person);
                console.log(result);
               // console.log(newresult);
                return result;
            }
            return null;
    }

    async login(person : any){
        const payload = {username : person.unsername, sub : person.userId};
        return {
            //we choose a property name of sub to hold our userId value to be consistent with JWT standards.
            access_token: this.jwtServcise.sign(payload),
        };
    }
}

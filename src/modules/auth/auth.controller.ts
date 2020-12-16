import { Controller, Post,Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login( @Request() req){

        //#region Explaining the below code
        /**
         * This also lets us demonstrate another Passport feature: Passport automatically creates a user object,
         *  based on the value we return from the validate() method, and assigns it to the Request object as req.user
         */
        //#endregion
        //return req.user;//.username;
        return this.authService.login(req.user);
    }

}

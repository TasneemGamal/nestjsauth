import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UsersController {
    constructor() {}

    //#region AuthGuard Explanation
    /**
     * 
     * @param req 
     * . Our Passport local strategy has a default name of 'local'. 
     * We reference that name in the @UseGuards() 
     * decorator to associate it with code supplied by the passport-local package.
     *  Our Passport local strategy has a default name of 'local'. 
     * We reference that name in the @UseGuards() decorator to associate it with code supplied by the passport-local package
     This is used to disambiguate which strategy to invoke in case we have multiple Passport strategies in our app
     */
    //#endregion
   

    //#region another explanation for 
    /**
     *  @UseGuards(AuthGuard('local'))
     * @param req  passing the strategy name directly to the AuthGuard() introduces magic strings in the codebase. 
     * Instead, we recommend creating your own class,
     * Instead we create class local-auth.guard.ts
     * and change the property to 
     * @UseGuards(LocalAuthGuard)
     */
    //#endregion
    //@UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login( @Request() req){

        //#region Explaining the below code
        /**
         * This also lets us demonstrate another Passport feature: Passport automatically creates a user object,
         *  based on the value we return from the validate() method, and assigns it to the Request object as req.user
         */
        //#endregion
        return req.user;//.username;
        //return this.authService.login(req.user);
    }
}

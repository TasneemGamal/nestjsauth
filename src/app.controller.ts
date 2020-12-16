import { Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService : AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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

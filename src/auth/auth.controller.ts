import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Guard handles redirect — this won't execute
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req) {
    // req.user is populated by the strategy's validate()
    
    console.log(req.user)
    return req.user;
  }
}
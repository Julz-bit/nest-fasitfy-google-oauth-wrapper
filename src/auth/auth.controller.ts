import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Guard handles redirect — this won't execute
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req) {
    // req.user is populated by the strategy's validate()

    this.logger.debug(req.user);

    return this.authService.signIn(req.user);
  }
}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const reply = http.getResponse();

    // Patch Fastify reply to support Express-style methods passport uses
    this.patchFastifyReply(reply);

    const result = await (super.canActivate(context) as Promise<boolean>);
    return result;
  }

  private patchFastifyReply(reply: any) {
    // Passport calls res.setHeader for redirect
    if (!reply.setHeader) {
      reply.setHeader = (name: string, value: string) => {
        reply.header(name, value);
      };
    }

    // Passport calls res.end() to finish the redirect
    if (!reply.end) {
      reply.end = () => {
        reply.send('');
      };
    }

    // Passport checks res.headersSent
    if (reply.headersSent === undefined) {
      Object.defineProperty(reply, 'headersSent', {
        get: () => reply.sent,
      });
    }
  }
}

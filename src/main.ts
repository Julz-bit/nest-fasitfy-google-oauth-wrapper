import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import secureSession from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 1. session FIRST
  await app.register(secureSession, {
    // secret length must be 23 and salt must be 16
    secret: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    salt:'a1b2c3d4e5f6g7h8'
  });

  // 3. passport SESSION THIRD
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

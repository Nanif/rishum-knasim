import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let server = await app.listen(process.env.PORT || 5000, function () {
    let port = server.address().port;
    console.log("Express is working on port " + port);
  });
}

bootstrap();

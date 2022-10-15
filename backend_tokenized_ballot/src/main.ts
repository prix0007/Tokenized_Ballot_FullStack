import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tokenized Ballot Backend')
    .setDescription(
      'The Backend to Interact with Tokenized Ballot and State Management',
    )
    .setVersion('1.0')
    .addTag('erc20')
    .addTag('ballot voting')
    .addTag('blockchain')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

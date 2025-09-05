import "tsconfig-paths/register";
import { ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { NestExpressApplication } from "@nestjs/platform-express";
import config from "src/config";
import { AppModule } from "src/app.module";

export async function createApp() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication<NestExpressApplication>();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  await app.listen(config.server.port);

  return app;
}

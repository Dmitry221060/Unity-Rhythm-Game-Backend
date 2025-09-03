import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import config from "./config";
import logger from "./utils/logger";
import { AppModule } from "./app.module";

const { port } = config.server;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.info(`Server running at port ${port}`);
}
void bootstrap();

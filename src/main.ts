import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import config from "./config";
import logger from "./utils/logger";
import { AppModule } from "./app.module";

const { port } = config.server;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(helmet())
  await app.listen(port);
  logger.info(`Server running at port ${port}`);
}
void bootstrap();

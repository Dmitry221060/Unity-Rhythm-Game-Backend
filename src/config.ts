import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
dotenv.config();

const config = {
  server: {
    port: process.env.PORT ?? 8080,
  },

  getTypeOrmConfig: (): TypeOrmModuleOptions => {
    return {
      type: "mongodb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "27017"),
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV == "DEV",
      autoLoadEntities: true,
    };
  },

  levels: [
    {
      name: "Butterfly",
      maxScore: 5400,
    },
    {
      name: "Test",
      maxScore: 99999,
    },
  ],
};

export default config;

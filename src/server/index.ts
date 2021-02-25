import { createServer } from "http";
import express, { json } from "express";
import helmet from "helmet";
import routes from "./routes";

const ENV = process.env.NODE_ENV ?? "DEV";
const app = express();
const server = createServer(app);

if (ENV !== "DEV") app.use(helmet());

app.use(json());
routes(app);

export default server;

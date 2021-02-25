import config from "../../config";
import { MongoClient } from "mongodb";

export async function createConnection(url?: string): Promise<MongoClient> {
  const connectionUrl = url ?? config.db.url ?? null;
  if (connectionUrl === null) throw new Error("Mongodb connection url required");

  const client = await MongoClient.connect(connectionUrl, { useUnifiedTopology: true });

	return client;
}

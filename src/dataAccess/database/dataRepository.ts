import { Collection, Db, MongoClient } from "mongodb";
import { inspect } from "util";
import { DataRepositoryOptions } from "./defs";
import { createConnection } from "./index";

import logger from "../../utils/logger";

export class DataRepository<T> {
	protected cache: Record<string, T> = {};
	protected connectionUrl: string | null;
	protected connection: MongoClient | null = null;
	protected db: Db | null = null;
	protected collectionName: string;
	protected collection: Collection | null = null;

	public constructor(options: DataRepositoryOptions) {
		this.connectionUrl = options.url ?? null;
		this.collectionName = options.collectionName;
	}

	public async init(): Promise<this> {
		if (this.connection) return this;

		this.connection = await createConnection(this.connectionUrl ?? undefined);
		this.db = this.connection.db();
		this.collection = this.db.collection(this.collectionName);
		return this;
	}

	public async destroy(): Promise<void> {
		if (this.connection === null) return;
		await this.connection.close();
		this.cache = {};
		this.connection = null;
		this.db = null;
	}

	public async get(field: string): Promise<T> {
		if (this.collection === null) throw new Error("Data repository is not initialized")
		if (this.cache[field] !== undefined) return this.cache[field];

		const row = await this.collection.findOne({ field }) as { value: T };
		const data = row.value;

		if (!this.cache[field]) this.cache[field] = data;

		return data;
	}

	public async set(field: string, value: T): Promise<void> {
		try {
			if (this.collection === null) throw new Error("DataRepository is not initialized");
			if (this.cache[field] === value) return;

			await this.collection.updateOne({ field }, { $set: { value } }, { upsert: true });
			this.cache[field] = value;
		} catch(err) {
			logger.error(`Error during writing value ${inspect(value)} into ${field} field`, err);
		}
	}
}

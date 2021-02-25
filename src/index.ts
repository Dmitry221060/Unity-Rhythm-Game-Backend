import config from "./config";
import server from "./server";
import logger from "./utils/logger";

const { port } = config.server;
server.listen(port, () => logger.info(`Server running at port ${port}`));

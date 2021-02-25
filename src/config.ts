/* eslint-disable @typescript-eslint/no-magic-numbers */
import dotenv from "dotenv";
dotenv.config()

const config = {
  server: {
    port: process.env.PORT ?? 8080
  },

  db: {
    url: process.env.MONGO_URL
  },

  levels: [
    {
      name: "Butterfly",
      maxScore: 5400
    },
    {
      name: "Test",
      maxScore: 99999
    }
  ]
}

export default config;
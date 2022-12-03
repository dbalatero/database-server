import express from "express";
import { Database } from "./database";

export const createServer = () => {
  const database = new Database();
  const app = express();

  // This should semantically be a PUT method, but for ease of testing and the
  // prompt's ambiguity, I'll leave it as a GET method for now.
  app.get("/set", (req, res) => {
    let total = 0;

    for (const key in req.query) {
      const value = req.query[key];

      if (value && typeof value === "string") {
        database.set(key, value);
        total++;
      }
    }

    res.status(200).send(`Set ${total} ${total === 1 ? "key" : "keys"}`);
  });

  app.get("/get", (req, res) => {
    const { key } = req.query;

    if (typeof key !== "string") {
      return res.status(400).send("key needs to be a string!");
    }

    const value = database.get(key);

    if (value) {
      return res.status(200).send(value);
    } else {
      return res.status(404).send(`Could not find value for key: \`${key}\``);
    }
  });

  return app;
};

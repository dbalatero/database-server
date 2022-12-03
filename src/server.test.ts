import request from "supertest";
import { createServer } from "./server";

describe("server", () => {
  describe("/set", () => {
    it("should let you set any string key", async () => {
      const agent = request(createServer());

      const response = await agent.get("/set?foo=bar");

      expect(response.status).toEqual(200);
    });

    it("should 400 without any key", async () => {
      const agent = request(createServer());

      const response = await agent.get("/set");

      expect(response.status).toEqual(400);
    });

    it("should 400 with non-string keys", async () => {
      const agent = request(createServer());

      const response = await agent.get("/set?foo[0]=bar");

      expect(response.status).toEqual(400);
      expect(response.text).toMatch(/only supports simple string/);
    });
  });

  describe("/get", () => {
    it("should 400 if missing the key", async () => {
      const agent = request(createServer());

      const response = await agent.get("/get");

      expect(response.status).toEqual(400);
      expect(response.text).toMatch(/Missing/);
    });

    it("should 404 if there is no value at that key", async () => {
      const agent = request(createServer());

      const response = await agent.get("/get?key=fdsafdsafdasfdsa");

      expect(response.status).toEqual(404);
    });
  });

  describe("integration tests", () => {
    it("should return 200 with the value if a key exists in the db", async () => {
      const agent = request(createServer());
      await agent.get("/set?foo=bar");

      const response = await agent.get("/get?key=foo");

      expect(response.status).toEqual(200);
      expect(response.text).toEqual("bar");
    });

    it("should let you set multiple keys at once", async () => {
      const agent = request(createServer());
      await agent.get("/set?foo=bar&blah=baz");

      for (const [key, value] of [
        ["foo", "bar"],
        ["blah", "baz"],
      ]) {
        const response = await agent.get(`/get?key=${key}`);

        expect(response.status).toEqual(200);
        expect(response.text).toEqual(value);
      }
    });
  });
});

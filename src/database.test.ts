import { Database } from "./database";

describe("Database", () => {
  it("allows setting and getting values", () => {
    const db = new Database();
    db.set("foo", "bar");

    expect(db.get("foo")).toEqual("bar");
  });

  it("returns undefined when a value does not exist", () => {
    const db = new Database();

    expect(db.get("hahahahaaha")).toBeUndefined();
  });
});

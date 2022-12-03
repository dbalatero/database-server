export class Database {
  data: Record<string, string>;

  constructor() {
    this.data = {};
  }

  get(key: string): undefined | string {
    return this.data[key];
  }

  set(key: string, value: string): void {
    this.data[key] = value;
  }
}

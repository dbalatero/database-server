import { createServer } from "./server";

const port = 4000;

createServer().listen(port, () => {
  console.log(`Database server running on: http://localhost:${port}`);
});

export default null;

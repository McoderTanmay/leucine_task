import "reflect-metadata";
import { ServerDataSource } from "./data-source.js";
import app from "./servier.js";

ServerDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Data Source initialization error:', err);
  });
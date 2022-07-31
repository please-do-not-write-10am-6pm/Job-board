import app from "./app";

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Test app listening at http://locahost:${port}`);
});

export default server;

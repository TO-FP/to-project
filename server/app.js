const router = require("./router");

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

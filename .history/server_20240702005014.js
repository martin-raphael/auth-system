require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("mongodb connection failed"));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

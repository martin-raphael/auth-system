require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URL_LOCAL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(`mongodb connection failed ${err}`));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

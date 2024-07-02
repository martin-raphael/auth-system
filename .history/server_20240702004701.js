require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

console.log("MongoDB URL:", process.env.MONGODB_URL_LOCAL);

mongoose
  .connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Uncomment if using an older version of Mongoose
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection failed:", err));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

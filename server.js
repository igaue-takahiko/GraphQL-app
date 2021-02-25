const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const rootScheme = require("./server/schema/schema");

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootScheme,
    graphiql: true,
  })
);

mongoose.connect(
  "mongodb+srv://tahahiko-igaue:2610Taka@cluster0.rbu6y.mongodb.net/movie-app-db?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      throw error;
    }
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB.");
});

const PORT = "7000" || 7000;
app.listen(PORT, () => {
  console.log("listening port", PORT);
});

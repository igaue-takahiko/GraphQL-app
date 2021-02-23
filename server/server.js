const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require('cors')
const scheme = require("./schema/schema");

const app = express();
// app.use(express.json())
// app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    scheme,
    graphiql: true,
  })
);

mongoose.connect("mongodb+srv://tahahiko-igaue:2610Taka@cluster0.rbu6y.mongodb.net/movie-app-db?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error) => {
  if (error) {
    throw error
  }
  console.log("Connected to mongoDB.");
});

const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
  console.log("listening port", PORT);
});

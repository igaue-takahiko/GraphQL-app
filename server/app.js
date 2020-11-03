import express from "express";
const graphqlHTTP = require("express-graphql")
const app = express()

app.use('/graphql', graphqlHTTP({}))
app.listen(400, () => {
    console.log('listening port 400');
})
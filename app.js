const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();
app.use(cors());

const db =
  "mongodb+srv://Sadman:789123789456@mydb-zcwke.mongodb.net/graphql?retryWrites=true";

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// Connect to GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server is Running");
});

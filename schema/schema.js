const graphql = require("graphql");
const ChampSchema = require("../models/champ");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ChampType = new GraphQLObjectType({
  name: "Champ",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    lane: { type: GraphQLString },
    playstyle: { type: GraphQLString },
    damagetype: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    questions: {
      type: new GraphQLList(ChampType),
      args: { Class: { type: GraphQLString } },
      resolve(parent, args) {
        return QuestionSchema.find({ Class: args.Class });
      },
    },
    question: {
      type: ChampType,
      args: { question: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(QuestionSchema.find({ question: args.question }));
        return QuestionSchema.find({ question: args.question });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addChamp: {
      type: ChampType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        lane: { type: GraphQLString },
        playstyle: { type: GraphQLString },
        damagetype: { type: GraphQLString },
        champimage: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log(args);
        let champ = new ChampSchema({
          name: args.name,
          damagetype: args.damagetype,
          id: args.id,
          lane: args.lane,
          playstyle: args.playstyle,
          champimage: args.champimage,
        });
        return champ.save();
      },
    },
    updateChamp: {
      type: ChampType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        lane: { type: GraphQLString },
        playstyle: { type: GraphQLString },
        damagetype: { type: GraphQLString },
        champimage: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log(args);
        return ChampSchema.findOneAndUpdate(
          { id: args.id },
          {
            $set: {
              name: args.name,
              damagetype: args.damagetype,
              id: args.id,
              lane: args.lane,
              playstyle: args.playstyle,
              champimage: args.champimage,
            },
          },
          { new: true }
        ).then((data) => console.log(data));
      },
    },
    deleteChamp: {
      type: ChampType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return ChampSchema.findOneAndDelete({ question: args.question });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

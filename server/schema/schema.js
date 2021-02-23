const graphql = require("graphql");
const Movie = require("../models/moviesModel");
const Directer = require("../models/directerModel");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directer: {
      type: DirecterType,
      resolve(parent, args) {
        return Directer.findById(parent.directerId);
      },
    },
  }),
});

const DirecterType = new GraphQLObjectType({
  name: "Directer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
    directer: {
      type: DirecterType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Directer.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directers: {
      type: new GraphQLList(DirecterType),
      resolve(parent, args) {
        return Directer.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directerId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directerId: args.directerId,
        });

        return movie.save();
      },
    },
    addDirecter: {
      type: DirecterType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let directer = new Directer({
          name: args.name,
          age: args.age,
        });

        return directer.save();
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directerId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let updateMovie = {};
        args.name && (updateMovie.name = args.name);
        args.genre && (updateMovie.genre = args.genre);
        args.directerId && (updateMovie.directerId = args.directerId);
        return Directer.findByIdAndUpdate(args.id, updateMovie, {
          new: true,
        });
      },
    },
    updateDirecter: {
      type: DirecterType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateDirecter = {};
        args.name && (updateDirecter.name = args.name);
        args.age && (updateDirecter.age = args.age);
        return Directer.findByIdAndUpdate(args.id, updateDirecter, {
          new: true,
        });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteDirecter: {
      type: DirecterType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Directer.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

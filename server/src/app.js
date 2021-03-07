const express = require("express");
const bcrypt = require("bcrypt");
const { ApolloServer, gql } = require("apollo-server-express");

// TODO: Replace with MongoDB + Mongoose
let users = {};

// TODO: Place in separate file
const typeDefs = gql`
    type Query {
        users: [User]
        user(email: String!): User
    }

    type Mutation {
        signUp(email: String!, password: String!): User
        signIn(email: String!, password: String!): User
    }

    type User {
        email: String!
    }
`;

// TODO: Place in separate file
// TODO: Authentication
const resolvers = {
    Query: {
        // TODO: Convert to MongoDB + Mongoose
        users: (_1, _2, _3) => Object.values(users),
        // TODO: Convert to MongoDB + Mongoose
        user: (_1, { email }, _3) => user[email],
    },

    Mutation: {
        // TODO: Add validation + sanitization to email and password
        // TODO: Convert to MongoDB + Mongoose
        signUp: async (_1, { email, password }, _3) => {
            if (email in users)
                throw new Error(`Email: ${email} has already been registered`);

            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);

            let user = { email, hash };
            users[email] = user;

            return user;
        },
        // TODO: Add validation + sanitization to email and password
        // TODO: Convert to MongoDB + Mongoose
        signIn: async (_1, { email, password }, _3) => {
            // TODO: Change error message to Access Denied
            if (!(email in users))
                throw new Error(
                    `No user is registered under the email: ${email}`
                );

            let user = users[email];

            let valid = await bcrypt.compare(password, user.hash);

            if (!valid) throw new Error("Invalid password");

            return user;
        },
    },
};

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

//  TODO: Use HTTPS after we have a valid SSL Cert
const http = require("http");
const PORT = 4000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else
        console.log(`
    HTTP server on http://localhost:${PORT}
    Run queries at https://studio.apollographql.com/dev/
    `);
});

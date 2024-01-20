import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'
import { fetch } from '@whatwg-node/fetch'
 
// Provide your schema
const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greeting: String!
      }
    `,
    resolvers: {
      Query: {
        greeting: async () => {
          // This service does not exist
          const greeting = await fetch('http://localhost:9876/greeting').then(res => res.text())
 
          return greeting
        }
      }
    }
  })
})
 
// Start the server and explore http://localhost:4000/graphql
const server = createServer(yoga)
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
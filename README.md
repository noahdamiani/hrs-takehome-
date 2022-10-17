Author: 
Noah Damiani
10/17/2022

This readme will serve two purposes: 
1. Metadocumentation around my thought processes while approaching the prompt
2. Service documentation, or the actual documentation you would find in a production codebase

Structure of the project, the **takehome** folder contains my work for this project. the SDK and server folder are mostly boilerplate.
```
- src
   - sdk (isomorphic client for node/browser)
   - takehome (business logic, tests, example client usage)
   - server (fastify and trpc router)
```


# Service Documentation
Architecture:
- typescript
- fastify (api)
- trpc (rpc)
- zod (schema for static+runtime type safety)
- jest (test coverage)

## Setup
Install node modules:
`yarn`


Run the server in terminal 1: 
`yarn dev:server`

Run the isomorphic client in terminal 2: 
`yarn dev:client`

OR run concurrently: 
`yarn dev`

Run the test suite: 
`yarn test`

# Takehome Notes
I start with our end goal, and try and decipher the high level requirements. From there I will break down the subtasks of each requirement, as well as the work we need to do to ensure this endpoint is reliable, scalable, and tested.

> "The webhook receiver is called any time a new price is made available from one of our known retailers."

**Notes from experience**: While writing webhooks, it is important that we do not block the success/failure response with asyncronous code. For example, if a retailer hits our webhook, and we have async tasks to do, we would like to give them a response that is not dependent on that asyncronous task. Failure to do so could result in timeouts from our retail customer's end, and cause latency in their ecosystem or failures that are difficult to debug. This can be achieved by handling asyncronous work as a background task, by pushing that work outside of our endpoint's callback.

> "The search endpoint is responsible for determining the best price of an item at the time it is called. It is exposed to web-scale traffic, so must be able to respond in <20ms."

Questions here in a real world planning scenario:

- Will this historical data be referenced in any way other than checking the best price?
- We really want to determine if the business is interested in historical analytics

For the purpose of this prompt I will keep things dead simple, we will maintain a mapping of sku to best price. At the time of storage, via our webhook, we will check if price is a better price (newPrice < persistedPrice). I've decided to mock long form storage i.e. a nosql database but could be also use an analytics provider such as segment/GA.

Mapping K/V,  where K=sku, V=price

Let's use redis here, it's good at K/V storage and fast, and best in scenarios where the data is not growing substantially. We can store events in a data warehouse / analytics system for historical data.

I will first model the pricing update schema in zod, for type safety. We will also model the request and response codes. Afterwards, I'll create test suites that are failing, but with the expected cases based on those response codes. Once tests pass, I will write an example of using the client for an e2e demo.

TRPC+Fastify benchmarks

        Version	Router	Requests/s	Latency	Throughput/Mb
        7.3.3	✓	    30663.2	    32.11	6.08


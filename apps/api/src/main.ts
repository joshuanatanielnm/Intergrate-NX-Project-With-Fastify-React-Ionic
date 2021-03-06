import { IncomingMessage, Server, ServerResponse } from 'http';
import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { getAllRestaurant, getRestaurant } from './app/restaurant.repository';

// Create an http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify();

// Define interfaces for our request. We can create these automatically
// off our JSON Schema files (See TypeScript.md) but for the purpose of this
// example we manually define them.
interface PingQuerystring {
  foo?: number;
}

interface PingParams {
  bar?: string;
  id?: string;
}

interface PingHeaders {
  a?: string;
}

interface PingBody {
  baz?: string;
}

interface RestaurantParams {
  id: string;
}

// Define our route options with schema validation
const opts: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        pong: {
          type: 'string',
        },
      },
    },
  },
};

// Add our route handler with correct types
server.post<{
  Querystring: PingQuerystring;
  Params: PingParams;
  Headers: PingHeaders;
  Body: PingBody;
}>('/ping/:bar', opts, (request, reply) => {
  console.log(request.query); // this is of type `PingQuerystring`
  console.log(request.params); // this is of type `PingParams`
  console.log(request.headers); // this is of type `PingHeaders`
  console.log(request.body); // this is of type `PingBody`
  reply.code(200).send({ pong: 'it worked!' });
});

// Start your server
server.listen({ port: 3333, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }
  console.log(`Server listening at ${address}`);
});

server.get('/api/', async (request, reply) => {
  return { hello: 'api detected' };
});

server.get('/api/restaurants', async (request, reply) => {
  reply.send(getAllRestaurant());
});


server.get<{Params:RestaurantParams}>('/api/restaurants/:id', (request, reply) => {
  reply.send(getRestaurant(request.params.id));
});

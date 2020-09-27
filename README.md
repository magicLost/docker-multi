- nginx - proxy to client and server

- server - express server with api requests

- client - nextjs server - for not api requests

- worker - express server that subscribe to insert event to redis server and when it hepends, it took value calc fibonachi number and insert to redis

Deploy:

- Dockerfile.dev files in each dir need to development separate
- docker-compose.yml - need to development all together
- travis.yml - need to production build all together with travis

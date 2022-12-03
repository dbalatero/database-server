# database-server

Implementation of:

> Before your interview, write a program that runs a server that is accessible on http://localhost:4000/. When your server receives a request on http://localhost:4000/set?somekey=somevalue it should store the passed key and value in memory. When it receives a request on http://localhost:4000/get?key=somekey it should return the value stored at somekey.

> During your interview, you will pair on saving the data to a file. You can start with simply appending each write to the file, and work on making it more efficient if you have time.

## Install / setup

```bash
git clone git@github.com:dbalatero/database-server.git
cd database-server
yarn install
```

## Run the server on port 4000

```bash
yarn start
```

## Making requests to the running server

### Setting a value

```
$ curl -is "http://localhost:4000/set?foo=bar"

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 9
ETag: W/"9-Y8AGmK1xhz+rWUSenuIQ2RK50RI"
Date: Sat, 03 Dec 2022 19:45:38 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Set 1 key%
```

### Getting a value

```
$ curl -is "http://localhost:4000/get?key=foo"

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 3
ETag: W/"3-Ys23Ag/5IOWqZCw9QGaVDdHwH00"
Date: Sat, 03 Dec 2022 19:46:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5

bar
```

This endpoint will return `404 Not Found` if the key does not exist in the database.

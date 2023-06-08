import http, { request } from "http";
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4545;

const server = http.createServer((request, response)) => {
  if (request.url !== 'calculator') {
    return response.write(`<p>ERROR! Path empty</p>`);
  }

  const { pathname } = url.parse(request.url);

  response.write(`
  <span>RESULTS</span>
  <span>${pathname!}</span>`)

  Response.write(request.method);
  response.write(request.url);
  response.end();

});

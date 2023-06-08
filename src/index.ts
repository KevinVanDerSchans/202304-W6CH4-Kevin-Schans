import http from "http";
import url from 'url';

const PORT = process.env.PORT || 4545;

const server = http.createServer((request, response) => {
  function calculator(a: any, b: any) {
    const firstNumber = Number(a);
    const secondNumber = Number(b);

    const add: number = firstNumber + secondNumber;
    const substract: number = firstNumber - secondNumber;
    const multiply: number = firstNumber * secondNumber;
    const division: number = firstNumber / secondNumber;

    return {add, substract, multiply, division}
  }

    if (!request.url) {
      server.emit('ERROR', new Error('Error 404'));
      response.write(`<span>Error 404</span>`);
      return;
    }

    const { pathname, search } = url.parse(request.url);

    if (pathname !== '/calculator') {
      server.emit('ERROR', new Error('Cannot find path'));
      response.write(`<span>Error 404</span>`);
      return;
    }

    if (pathname === '/calculator') {
      const urlParams = new URLSearchParams(search!);
      const firstNumber = urlParams.get('a');
      const secondNumber = urlParams.get('b');

      const answers = calculator(firstNumber!, secondNumber!);
      response.write(`
      RESULTS
      <p>${firstNumber} + ${secondNumber} = ${answers.add}</p>
      <p>${firstNumber} - ${secondNumber} = ${answers.substract}</p>
      <p>${firstNumber} * ${secondNumber} = ${answers.multiply}</p>
      <p>${firstNumber} / ${secondNumber} = ${answers.division}</p>
      `);
    }

  response.end();
});

server.on('ERROR', () => {});
server.listen(PORT);

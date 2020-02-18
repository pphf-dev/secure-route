const express = require('express');

const secretsRouter = require('./routes/secretsRouter');

const port = parseInt(process.env.PORT, 10) || 3000;

const app = express();

app.get('/', (req, res) => {
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <html>
    <body>
      Hello World!
    </body>
    </html>
  `);
});

//Authentication
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    console.log('\n');
    const err = new Error('You are not authenticated!\n');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  if (user.toLowerCase() === 'jbond' && pass === 'AstonMartin007') {
    return next();
  } else {
    console.log('\n');
    const err = new Error('You are not authorized to view this resource\n');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

app.use(auth);
app.use('/secrets', secretsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}/`);
});

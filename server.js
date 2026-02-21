const express = require('express')
const app = express()
const port = 3000//

app.use(express.json());

app.use ((req, res, next) => {
    console.log(`${"hello, i am here"} ${req.url} - ${new Date()}`);
    next();
});

app.post('/echo', (req, res) => {
    console.log(req.body);
  res.json({ echoed: req.body }); // req.body now available
});

app.get('/user/:id', (req, res) => {
const id = req.params.id;
console.log(id)
res.send(id);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

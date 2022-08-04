const express = require('express');
const app = express();
const port = 5600

app.use('/dist', express.static('dist'));

app.use(express.static('public'))

app.listen(port, () => {
  console.log('Preview live server started on port ' + port)
})
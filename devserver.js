const { application } = require('express');
const express = require('express');
const app = express();
const port = 5600

app.use('/dist',express.static('dist')); 

// app.get('/', (req, res) => { 
//   res.sendFile(__dirname+'/testing.html')
// })

app.use(express.static('public'))

app.listen(port,()=>{
  console.log('i done opening on port '+port)
})
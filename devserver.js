const { application } = require('express');
const express = require('express');
const app = express();

app.use('/dist',express.static('dist')); 

// app.get('/', (req, res) => { 
//   res.sendFile(__dirname+'/testing.html')
// })

app.use(express.static('public'))

app.listen(5600,()=>{
  console.log('i done opening')
})
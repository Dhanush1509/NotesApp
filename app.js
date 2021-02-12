const express = require('express');
const app = express();
const path = require('path');
const CONNECT_DB=require('./config/db');
app.use(express.json({extended:false}))
CONNECT_DB();

app.use('/users',require('./routes/users'));
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));

}
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
console.log(`Server started running at ${PORT}`);
})
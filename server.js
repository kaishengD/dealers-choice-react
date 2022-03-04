const express = require('express')
const {syncAndSeed,models:{Trainer,Pokemon,Catches},db} = require('./db');
const app = express();
const path = require('path')
app.use('/src',express.static(path.join(__dirname,'src')))

app.use('/api',require('./api'));

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
const init= async()=>{
    try{
        await syncAndSeed();
        const port = 3000;
        app.listen(port,()=>{
            console.log(`listening on port:${port}`)
        })
    }catch(err){
        console.log(err)
    }
}
init();


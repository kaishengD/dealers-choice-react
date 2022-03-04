const express = require('express')
const {syncAndSeed,models:{Trainer,Pokemon,Catches},db} = require('./db');
const app = express();
const path = require('path')
// app.use('/src',express.static(path.join(__dirname,'src')))

app.get('/api/trainers',async(req,res,next)=>{
    try{
        res.send(await Trainer.findAll())
    }catch(err){
        next(err);
    }
})

app.get('/api/pokemons',async(req,res,next)=>{
    try{
        res.send(await Pokemon.findAll())
    }catch(err){
        next(err);
    }
})

app.get('/api/trainers/:id/catches',async(req,res,next)=>{
    try{
        res.send(await Catches.findAll({
            where:{
                trainerId: req.params.id
            },
            include:[Pokemon]
        }))
    }catch(err){
        next(err);
    }
})

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


const pg = require('pg');
const Sequelize = require('sequelize');
const { UUID, UUIDV4 } = require('sequelize');

const db = new Sequelize('postgres://localhost/pokemon_trainers');

const Trainer = db.define('trainer',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

const Pokemon = db.define('pokemon',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

const Catches = db.define('catches',{
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    }
});

Catches.belongsTo (Trainer);
Catches.belongsTo (Pokemon);

const syncAndSeed = async()=>{
    await db.sync({force:true});
    const [satoshi,misty,brock] = await Promise.all(
        ['satoshi','misty','brock'].map(name=>{
            return Trainer.create({name})
        })
    )
    const [pikachu,bulbasaur,squirtle,charmander,staryu,psyduck,togepi,goldeen,starmie,geodude,bonsly,zubat] = await Promise.all(
        ['pikachu','bulbasaur','squirtle','charmander','staryu','psyduck','togepi','goldeen','starmie','geodude','bonsly','zubat'].map(name=>{
            return Pokemon.create({name})
        })
    )
    await Catches.create({trainerId:satoshi.id, pokemonId:pikachu.id}),
    await Catches.create({trainerId:satoshi.id, pokemonId:bulbasaur.id}),
    await Catches.create({trainerId:satoshi.id, pokemonId:squirtle.id}),
    await Catches.create({trainerId:satoshi.id, pokemonId:charmander.id}),
    await Catches.create({trainerId:misty.id, pokemonId:staryu.id}),
    await Catches.create({trainerId:misty.id, pokemonId:psyduck.id}),
    await Catches.create({trainerId:misty.id, pokemonId:togepi.id}),
    await Catches.create({trainerId:misty.id, pokemonId:goldeen.id}),
    await Catches.create({trainerId:misty.id, pokemonId:starmie.id}),
    await Catches.create({trainerId:brock.id, pokemonId:geodude.id}),
    await Catches.create({trainerId:brock.id, pokemonId:bonsly.id}),
    await Catches.create({trainerId:brock.id, pokemonId:zubat.id})
    console.log('catches seeded')
};

module.exports = {
    models:{
        Trainer,
        Pokemon,
        Catches
    },
    db,
    syncAndSeed
}
import React from 'react';
class App extends React.Component{
    async render(){
        const response = await axios.get('/api/trainers');
        const trainers = response.data
        return(
            trainers.map((trainer)=>{
               console.log(trainer)
            })
        )
    }
}
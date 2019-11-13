const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
db('accounts').select('*').then(info => {
    res.status(200).json(info)
}).catch(err=> {
    res.status(500).json({error: err})
})
})

server.post('/', (req, res)=> {
    const body = req.body;
    db('accounts').insert(body).then(account => {
        res.status(201).json(body);
    }).catch(err => {
        res.status(500).json({error: err})
    })
})

server.get('/:id', (req, res)=> {
    const {id} = req.params;
    db('accounts').select('*').where({"id": id}).then(acc => {
        const response = acc[0]
        if(!response){
             res.status(404).json({message: 'account not found'})
        }else{
            res.status(200).json(acc[0])
        }
    }).catch(err => {
        res.status(500).json({error: err})
    })
})

server.put('/:id', (req, res)=> {
    const {id} = req.params;
    const body = req.body;
    db('accounts').where({"id": id}).update(body).then(upd => {
        res.status(202).json({update: body})
    }).catch(err => {
        res.status(500).json({error: 'internal server error'})
    })
})

server.delete('/:id', (req, res)=> {
    const {id} = req.params;
    db('accounts').where({"id": id}).delete().then(del => {
        if(del){
           res.status(204).json({delete: " account has been deleted"}) 
        }else{
            res.status(404).json({message: "id does not exist"})
        }
        
    }).catch(err => {
        res.status(500).json({error: err})
    })
})

module.exports = server;
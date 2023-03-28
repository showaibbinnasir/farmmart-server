const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://farmmart:5msudjZZgqYC06AT@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const all_animals = client.db('farmmart').collection('all_animals')
        app.get('/all_animals', async(req,res)=>{
            const query = { }
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })

        app.get('/three_cow', async(req,res)=>{
            const query = { animal : 'cow'}
            const result = await all_animals.find(query).limit(3).toArray()
            res.send(result)
        })
        app.get('/all_cow', async(req,res)=>{
            const query = { animal : 'cow'}
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })
        app.get('/three_goat', async(req,res)=>{
            const query = { animal : 'Goat'}
            const result = await all_animals.find(query).limit(3).toArray()
            res.send(result)
        })
        app.get('/all_goat', async(req,res)=>{
            const query = { animal : 'Goat'}
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })
        app.get('/product/:id', async(req,res)=>{
            const id = req.params.id;
            const query = { _id : new ObjectId(id) }
            
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })
        
    }
    finally{

    }
}


run().catch(console.log)

app.use(cors())
app.get('/', (req,res)=>{
    res.send("api is running")
})



app.listen(port, ()=>{
    console.log(`api is running on port ${port}`)
})


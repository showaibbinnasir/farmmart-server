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
        const all_needs = client.db('farmmart').collection('all_needs')
        const all_users = client.db('farmmart').collection('users')
        const all_orders = client.db('farmmart').collection('orders')
        app.get('/all_animals', async(req,res)=>{
            const searchId = req.query.searchId;

            let query = { }
            if(searchId){
                query = {title: {$regex:searchId, $options: '$i'}}
            }
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })

        // app.get('/animals/:id', async(req,res)=>{
        //     const searchData = req.params.id;
        //     const result = await all_animals.find({title: {$regex:searchData, $options: '$i'}}).toArray()
        //     res.send(result)
        // })

        app.get('/three_cow', async(req,res)=>{
            const query = { animal : 'Cow'}
            const result = await all_animals.find(query).limit(3).toArray()
            res.send(result)
        })
        app.get('/all_cow', async(req,res)=>{
            const query = { animal : 'Cow'}
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
        app.get('/three_duck', async(req,res)=>{
            const query = { animal : 'duck'}
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })
        app.get('/three_needs', async(req,res)=>{
            const data = req.query.animal;
            let query = {}
            if(data) {
                query = {
                    animal : data
                }
            }
            const result = await all_needs.find(query).toArray();
            res.send(result)
        })
        app.get('/product/:id', async(req,res)=>{
            const id = req.params.id;
            const query = { _id : new ObjectId(id) }
            
            const result = await all_animals.find(query).toArray()
            res.send(result)
        })
        app.get('/needsproduct/:id', async(req,res)=>{
            const id = req.params.id;
            const query = { _id : new ObjectId(id) }
            
            const result = await all_needs.find(query).toArray()
            res.send(result)
        })

        app.get('/all_needs', async(req,res)=>{
            const searchId = req.query.searchId;

            let query = { }
            if(searchId){
                query = {title: {$regex:searchId, $options: '$i'}}
            }
            const result = await all_needs.find(query).toArray()
            res.send(result)
        })
        app.get('/all_users', async(req,res)=>{
            const email = req.query.email;
            let query = {}
            if(email){
                query = {userEmail : email}
            }
            const result = await all_users.find(query).toArray()
            res.send(result)
        })
        app.get('/orders', async(req,res)=>{
            const email = req.query.email;
            let query = {}
            if(email){
                query = {buyerEmail : email}
            }
            const result = await all_orders.find(query).toArray()
            res.send(result)
        })

        app.post('/all_users', async(req,res)=>{
            const newUser = req.body;
            const result = await all_users.insertOne(newUser)
            res.send(result)
        })

        app.post('/all_animals', async(req,res)=>{
            const newPost = req.body;
            const result = await all_animals.insertOne(newPost)
            res.send(result)
        })
        app.post('/all_needs', async(req,res)=>{
            const newPost = req.body;
            const result = await all_needs.insertOne(newPost)
            res.send(result)
        })
        app.post('/orders', async(req,res)=>{
            const newOrders = req.body;
            const result = await all_orders.insertOne(newOrders)
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


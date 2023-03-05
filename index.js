const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const postsData = require('./posts.json');
const needPost = require('./needsPost.json')
app.use(cors())
app.get('/', (req,res)=>{
    res.send("api is running")
})

app.get('/posts', (req,res)=>{
    res.send(postsData)
})

app.get('/needPosts', (req,res)=>{
    res.send(needPost)
})

app.listen(port, ()=>{
    console.log(`api is running on port ${port}`)
})


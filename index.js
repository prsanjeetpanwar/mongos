const express = require('express')
const { default: mongoose } = require('mongoose')
const User = require('./user')
const bodyParser=require('body-parser')
const app = express()
const Blog=require('./new')

app.use(bodyParser.json())
mongoose.connect('mongodb://127.0.0.1:27017/users').then(() =>console.log('connected')).catch((err) => console.log(err));

// app.post('/user', async(req,res)=>{
//       await new User.save().then((docs)=>{
//         res.status(200).json({
//             message: "User created.",
//             status: true,
//             data: docs
//         })
//     }).catch((err)=>{
//         res.status(400).json({
//             message: err.message,
//             status: false
//         })   
//     })
// })
// app.post('/user', async (req, res) => {
//     try {
//         console.log(req.body)
//       const user = new User(req.body); // Create a new User instance with the request body data
//       const savedUser = await user.save(); // Save the user to the database
//       res.status(200).json({
//         message: "User created.",
//         status: true,
//         data: savedUser
//       });
//     } catch (err) {
//       res.status(400).json({
//         message: err.message,
//         status: false
//       });
//     }
//   });
app.post('/user', async (req,res)=>{
    let blog= await Blog.create({
        title: 'Awesome Post 3!',
        slug: 'awesome-post 3',
        published: true,
        content: 'This is the best post ever',
        tags: ['featured', 'announcement'],
      })
    res.send(blog)
})
  
app.put('/user', async (req,res)=>{
    const blog = await Blog.findById("6464b0dd038729b91af6f5bd")
    blog.title = "The Most Awesomest Post!!";
    await blog.save();
    res.send(blog)
})
   
app.delete('/user', async (req,res)=>{
    const blog = await Blog.deleteOne({_id: "6464b012aa13eaf39df4467a"})
    res.send(blog)
})
app.listen('3300', ()=>{
    console.log('listen at 3300')

})

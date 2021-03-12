const express=require('express')
const mongoose=require('mongoose')
const app=express()
const shortURL=require('./Model/_uri')
// db connect
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(_=>app.listen(process.env.PORT))
.catch(_=>console.log('err'))
//db connect end

app.get('/',(req,res)=>{
    shortURL.find()
    .then(shortURLS=>{
        res.render('index',{shortLong:shortURLS})
    }) 
})

app.post('/shortening',(req,res)=>{
    const url=new shortURL({_longURL:req.body.longUrl})
    url.save(url)
    res.redirect('/')
})

app.get('/:uniqueParam',(req,res)=>{ 
  shortURL.findOne({_shortUrl:req.params.uniqueParam})
  .then(shorturl=>{
    shorturl['_ClicksCount']++
    shorturl.save()
    res.redirect(shorturl['_longURL'])
  })
  .catch(_=>res.sendStatus(404))
})
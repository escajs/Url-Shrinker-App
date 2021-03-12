const mongoose=require('mongoose')
const Schema = mongoose.Schema
const uniqueParam=Math.random().toString(36).substr(2,6)
const urlSchema=new Schema({
    _longURL:{
        type:String,
        required:true
    },
    _shortUrl:{
        type:String,
        required:true,
        default:uniqueParam
    },
    _ClicksCount:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true})
const shortURL=mongoose.model('Urls_tbl',urlSchema)

module.exports = shortURL;
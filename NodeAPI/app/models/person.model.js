var mongoose=require('mongoose');

var personSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    state:String,
    city:String
})

module.exports=mongoose.model('tblperson',personSchema);
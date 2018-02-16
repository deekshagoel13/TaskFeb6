var mongoose=require('mongoose');

var stateSchema=mongoose.Schema({
    stateName:String,
})

module.exports=mongoose.model('state',stateSchema);
var mongoose=require('mongoose');

var citySchema=mongoose.Schema({
    stateid:String,
    cityName:String
})

module.exports=mongoose.model('city',citySchema);
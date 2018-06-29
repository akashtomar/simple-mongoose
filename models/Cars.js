var mongoose = require('mongoose');
var {Schema} = mongoose;

var CarSchema =  new Schema({
    model: String,
    make: Number
}); 

mongoose.model('Cars', CarSchema);
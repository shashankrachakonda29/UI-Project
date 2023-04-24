var mongoose = require( 'mongoose' );
 
var taskproducts = new mongoose.Schema({
    id : {type: String},
    tenant_id : {type: String},
    bankname:{type: String},
    name: {type: String},
    type:{type:String},
    startDate:{type: String},
    endDate:{type: String},
    description:{type:String},
    owner:{type:String},
    staskdocs:{type:Array}
    
},{collection:'task'});
 
module.exports = mongoose.model('task', taskproducts);
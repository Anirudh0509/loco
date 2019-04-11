import mongoose from 'mongoose';

let TransactionSchema = new mongoose.Schema({
  
  transaction_id : {
    type : String,
    required : true,
    minlength : 1,
    unique : true,
    default : null
  },
  amount : {
    type : Number,
    required : true,
    default : 0
  },
  transaction_type : {
    type : String,
    default : null
  },
  parent_id : {
    type : Number,
    required : true,
    default : 0
  },
  status : {
    type : String,
    default : null
  }

});

export default mongoose.model('transactions', TransactionSchema);
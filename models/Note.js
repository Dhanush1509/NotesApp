const mongoose = require('mongoose');
const NoteSchema=mongoose.Schema({
 user:{
type:mongoose.Schema.Types.ObjectId,
ref:'users'
 },
  title:{
    type: 'string',
    required: true
  },
  description:{
    type: 'string',
    required: true
  },
  date:{
    type: 'date',
    default: new Date
  }
})
module.exports=mongoose.model('Note',NoteSchema)
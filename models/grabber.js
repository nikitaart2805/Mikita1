const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{ type: Types.ObjectId, ref: 'Link' }],
        token: {
            type: String ,
            required : true
        },
    timeout : {
            type: String ,
            required : true
        },
    username : {
        type: String ,
        required : true
        } ,
          roles : {
        type: String ,
        required : true
         }


    })

module.exports = model('grabber', schema)
const {Schema, model} =require('mongoose')


const schema = new Schema({

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
import mangoose from 'mangoose'
const userSchema=new mangoose.Schema({
    _id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String,required:true},

})
const User=mangoose.model('User',userSchema)
export default User
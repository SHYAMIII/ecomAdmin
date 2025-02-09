import mongoose from "mongoose";

const{Schema, model} = mongoose;

const userSchema = new Schema({
   name:{
       type: String
   },
   profilePic:{
       type: String
   },
   email:{
       type: String,
       required: true,
       unique: true
   },
   username:{
       type: String,
       unique: true
   },
   createdAt:{
       type: Date,
       default: Date.now
   }
    
})


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;


// const User = model("User", userSchema);

// export default mongoose.models?.User||User 

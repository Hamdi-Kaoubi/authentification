const collection=require("./userModel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.Register= async(req,res)=> {
    const {password,email}=req.body
    try {
        const found=await collection.findOne({email})
        if (found){
            res.status(400).send({errors:[{msg:"email already exists"}]})
        }else {
            const user =new collection(req.body)
        const salt=10
        const hashpassword=bcrypt.hashSync(password,salt)
        user.password=hashpassword
        const payload={id:user._id}
        const token=jwt.sign(payload,process.env.secretKey)
        await user.save()
        return res.status(200).send({msg:"user added",user,token})
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.Login=async(req,res)=>{
    const {password,email}=req.body
    try {
        const user=await collection.findOne({email})
        if (!user){
            res.status(400).send({errors:[{msg:"email doesn't  exist"}]})
        }else {
            const match=await bcrypt.compare(password,user.password)
            if (!match){
                res.status(400).send({errors:[{msg:"wrong password"}]})
            }else {
                const payload={id:user._id}
                const token=jwt.sign(payload,process.env.secretKey)
                return res.status(200).send({msg:"user logged in",user,token})
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
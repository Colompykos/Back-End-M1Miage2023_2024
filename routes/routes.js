const { Router } = require('express')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const User = require('../model/user');

const router = Router()

router.post('/register', async (req,res) => {
    let email= req.body.email
    let password= req.body.password
    let name= req.body.name
    let isAdmin= req.body.isAdmin

    //hash te password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const verify = await User.findOne({email:email})

    if(verify){
        return res.status(400).send({
            emailState:"email already exists"
        })
    }{        
        //create a new user
        const user = new User(
            {
                name:name,
                email:email,
                password:hashPassword,
                isAdmin:isAdmin
            }
        )
        const result = await user.save()

        //create and assign a token
        const {_id} = await result.toJSON()
        const token = jwt.sign({_id:_id},"TOKEN_SECRET")

        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:12*60*60*1000 //half a day
        })
    
        res.json({
            user:result,
            state:"validated",
            token: token,
        })
    }
})


router.post('/login', async (req,res) => {
    const user = await User.findOne({
        email:req.body.email
    })
    if(!user){
        return res.status(404).send({
            message:"Email not found"
        })
    }
    const validPass = await bcrypt.compare(req.body.password,user.password)

    if(!validPass){
        return res.status(400).send({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({_id:user._id},"TOKEN_SECRET")
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:12*60*60*1000 //half a day
    })

    res.send({
        message:"succes",
        token: token,
    })

})
router.get('/user', async (req,res) => {

    try {
        const cookie =req.cookies["jwt"]        
        const claims = jwt.verify(cookie,"TOKEN_SECRET")

        if(!claims){
            return res.status(401).send({
                message:"unauthenticated"
            })
        }

        const user = await User.findOne({_id:claims._id})
        const {password,...data} = await user.toJSON()

        res.send(data)

    } catch (error) {
        return res.status(401).send({
            message : 'unauthenticated'
        })
    }
})

//define a route to get all the users for test
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/logout', async (req,res) =>{
    res.cookie("jwt","",{maxAge:0})
    res.send({
        message:"succes"
    })
})

router.get('/checkAuth', async (req, res) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return res.status(401).json({ loggedIn: false, isAdmin: false });
      }
  
      const claims = jwt.verify(token, 'TOKEN_SECRET');
      if (!claims) {
        return res.status(401).json({ loggedIn: false, isAdmin: false,  });
      }
  
      const user = await User.findById(claims._id);
  
      if (!user) {
        return res.status(404).json({ loggedIn: false, isAdmin: false, token: token });
      }
  
      // User found, return loggedIn as true and isAdmin value from the user
      res.json({ loggedIn: true, isAdmin: user.isAdmin  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

module.exports = router

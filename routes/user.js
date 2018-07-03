const router = require('express').Router();
const Users = require('../models/Users');

//route to add new user
router.put('/signup',(req,res)=>{
    newUser = new Users(req.body);
    newUser.encryptPass(req.body.password);
    newUser.save();
    res.json({status : 'created', username : req.body.username});
});

//route to check 
router.get('/:username', (req,res)=>{
    
    Users.searchUsername(req.params.username,(err, data)=>{
        if(err) next(err);
        if(data.length == 0){
            return res.json({
                message : "No such user",
                flag : 0
            });
        }else{
            return res.json({
                message : "Username taken",
                flag : 1
            });
        }
    });
    res.send('check username route');
});





module.exports = router;
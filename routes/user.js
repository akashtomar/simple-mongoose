const router = require('express').Router();
const Users = require('../models/Users');

//route to add new user
router.put('/signup',(req,res)=>{
    newUser = new Users(req.body);
    newUser.encryptPass(req.body.password);
    newUser.save();
    res.json({status : 'created', username : req.body.username});
});

//route to check if username is taken
router.get('/:username', (req,res)=>{
    
    Users.searchUsername(req.params.username,(err, data)=>{
        if(err) next(err);
        if(data === null ){
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
});

//route to sign in
router.post('/signin', (req,res)=>{

    Users.searchUsername(req.body.username,(err,data)=>{
        if(err) next(err);
        if(data != null){
            inUser = new Users(data);
            if(inUser.checkPass(req.body.password)){
                return res.json({status: 'valid' ,message: 'valid username and pass'});
            }else{
                return res.json({status:'invalid', message: 'invalid password'});
            }
        }else{
            return res.json({status:'invalid', message: 'invalid username'});
        }
    });

});




module.exports = router;
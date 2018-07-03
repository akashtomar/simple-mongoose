const router = require('express').Router();
const Users = require('../models/Users');


router.put('/signup',(req,res)=>{
    newUser = new Users(req.body);
    newUser.encryptPass(req.body.password);
    newUser.save();
    res.json({status : 'created', username : req.body.username});
});






module.exports = router;
const mongoose = require('mongoose');
const router = require('express').Router();
const Cars = mongoose.model('Cars');

router.post('/', (req,res)=>{
    const {body : { submit }} = req;
    console.log(submit);
    res.send(submit);
});

router.post('/car',(req,res)=>{
    console.log('/car post');
    let {model, make} = req.body;
    return Cars.update({'model': model}, {$set : {'make': make}})
    .then((data)=>{res.json({
        "udpated": data.n,
        "data": req.body});
    })
    .catch((err)=>{res.status(500).send(err);});
      
});

router.get('/car/:model',(req,res)=>{
    console.log('/car get');
    //console.log(req.params);
    return Cars.find(req.params)
    .then((data)=>{res.send(data)})
    .catch((err)=>{res.status(500).send(err)});
    
});

router.put('/car', (req,res)=>{
    console.log('/car put')
    let {model, make} = req.body;
    let newCar = new Cars({
       'model': model,
       'make': make
    });
    
    return newCar.save()
    .then((data)=>{res.send(data)})
    .catch(err => res.send(err));  
    
});

router.delete('/car', (req,res)=>{
    console.log('/car delete');
    return Cars.remove(req.body)
    .then((data)=>{
        res.json({
        "deleted": data.n,
        "data": req.body})})
    .catch((err)=>{res.status(500).send(err)});
    
});

module.exports = router;
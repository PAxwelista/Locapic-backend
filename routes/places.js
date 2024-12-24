var express = require('express');
var router = express.Router();

const Places = require("../models/places");

router.post("/" ,async (req,res)=>{

    if (!req.body.nickname || !req.body.name || !req.body.latitude || !req.body.longitude){
        res.json({result :false , error: "Il manque une information de saisi"});
        return;
    }
    const data = await Places.findOne({nickname : req.body.nickname , name : req.body.name})
    if (data) {
        res.json({result :false , error: "Information déjà fournit"});
        return;
    }

    newPlace = new Places({
        nickname : req.body.nickname,
        name : req.body.name,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
    });

    newPlace.save().then(()=>res.json({result :true}));
});

router.get("/:nickname" , (req,res)=>{
    Places.find({nickname : req.params.nickname})
    .then(data=>res.json({result : true , places : data}))
})

router.delete("/" , (req,res)=>{
    Places.deleteOne({nickname : req.body.nickname , name : req.body.name})
    .then((data)=>res.json({result : !!data.deletedCount}))
})




module.exports = router;

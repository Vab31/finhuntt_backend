
const Learn =require('../models/learn');

   const express = require('express');
   const router = express.Router();
// let user = require('../models/user-schema');
router.route('/').post( async (req, res, next) => {
  
    var myData = new Learn(req.body);
     myData.save()
     .then(item => {
     res.send("item saved to database");
       })
     .catch(err => {
      res.status(400).send("unable to save to database");
       });
});

router.get("/", (req,res) => {
    try {
        console.log("successful");
        res.status(200).send({msg:"/ is received"})
    } catch (error) {
        res.status(500).send({ msg : "could not get /", error : error.message, status : false })
    }
})






module.exports = router;
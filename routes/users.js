var express = require('express');
const router = express.Router();
const UserService = require('../services/users');
const service = new UserService();

router.get("/homepage",(req,res)=>{
    console.log({'success':'welcome on the home page'});
    res.send({'success':'welcome on the home page'})
});

// sign up
router.post("/signup",async (req,res)=>{
    console.log(req.body);
    service.create(req.body).then((data)=>{
        console.log({"sucess": "signup successfully"})
        res.send({"sucess": "signup successfully"})
    }).catch((error)=>{
        res.send(error)
    })
});

// Update 
router.put('/updateUser/:id',(req,res)=>{
    const userId = req.params.id;
    console.log(userId,req.body );
    service.userUpdate(userId,req.body).then((data)=>{
        console.log(data,"data")
        if(data > 0){
            res.send({"success":`id ${userId} details update`})
        }else{
            res.send({"sorry": `id ${userId} not found`})
        }
    }).catch((err)=>{
        res.send(err);
    })  
});

// All data
router.get('/getAll',(req,res)=>{
    service.findAll().then((data)=>{
        res.send(data);
    }).catch((error)=>{
        res.send(error)
    })
})

// Get data by id 
router.get('data/:id',(req,res)=>{
    const userId = req.params.id;
    service.findById(userId).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })

})
// delete by id
router.delete("/userdelete/:id",(req,res)=>{
    const userId = req.params.id;
    // console.log(userId)
    service.userDelete(userId).then((data)=>{
        // console.log(userId,"id found")
        if (data > 0){
            res.send("delete sucessfully")
        }else{
            res.send(`id not ${userId}  found`)
        }
    }).catch((err)=>{
        res.send(err)
    })
})

// login user
router.post('/login', async(req, res) => {
    const userdata = await service.emailChecking(req.body.email);
    if (userdata) {
        const passCheck = await service.PassChecking(userdata, req.body.password);
        if (passCheck) {
            console.log({ "Message": "Login successfully" })
            res.send({ "Message": "Login successfully" });
        } else {
            res.send({ "sorry": "wrong password! " });
        }
    } else {
        res.send({ "sorry": "This email not exist!" });
    }
})

module.exports = router;
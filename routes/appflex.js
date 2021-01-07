const { Router } =require('express')
const grabber = require('../models/grabber')
const router = Router()

router.get('/',(req,res) =>{
    res.render('index',{
        title:'appflex' ,
        isIndex : true
    })
})
router.get('/info',(req,res) =>{
    res.render('info',{
        title:'info' ,
        isInfo : true
    })
})
router.get('/login',(req,res) =>{
    res.render('login',{
        title:'Login' ,
        isLogin : true
    })
})


router.post(('/'), async (req, res) =>{

    const user  = new grabber ({
        email: req.body.email,
        password : req.body.password ,
        firstname : req.body.firstname ,
        lastname : req.body.lastname

    })
    await user.save()
    res.redirect('/')


})
router.post(('/login'), async (req, res) =>{




})
module.exports = router
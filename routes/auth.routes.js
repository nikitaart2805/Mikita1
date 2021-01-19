const {Router} = require('express')
const User = require('../models/grabber')
const sign = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check,validationResult} = require('express-validator')
// /api/auth
sign.post('/register' ,
    [
        check('email','Uncorrect Email').isEmail(),
        check('password', 'Uncorect password')
            .isLength({min:6})
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message: 'Uncorect data for registration'
            })
        }

        const {email , password} = req.body

        const candidate = await User.findOne({ email })

        if(candidate) {
          return  res.status(400).json({message:'Такой пользователь существует'})
        }

        const hashedPassword =  await bcrypt.hash(password,12)
        const user = new user ({email,password: hashedPassword})
        await user.save()
res.status(201).json({ message:'Пользователь создан'})

    }catch (e) {
        res.status(500).json({ message: 'Что то пошло не так '})
    }


})
sign.post (
    '/login',[
        check('email', 'ВВедите коректный email').normalizeEmail().isEmail(),
        check ('password', 'Введите пароль').exists()
        ]
 ,
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors : errors.array(),
                    message: 'Uncorect data for login'
                })
            }
            const {email,password} = req.body
            const user = await  User.findOne({ email })

            if(!user) {
                return res.status(400).json({ message: 'Пользователь не Существует '})
            }
            const isMatch = await  bcrypt.compare(password, user.password)
            if (!isMatch) {
                return  res.status(400).json({message:'Неверный пароль'})
            }

            //авторизация через токен
            const authtoken = jwt.sign(
                {userId: user.id},
                "xyi love",
                { expiresIn : '190h'}
            )
            res.json({ token, userId: user.id})


        }catch (e) {
            res.status(500).json({ message: 'Что то пошло не так '})
        }
    }
)

module.exports = sign
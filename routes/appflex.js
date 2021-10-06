const { Router } =require('express')
const grabber = require('../models/grabber')
const router = Router()
const axios = require('axios')
const now = require('performance-now')

let counter = 0 ;
let OfferId = 0 ;

let Area = "";
let norm1 = "d282-445a-8901-9f62363eaac5";
let norm2 = "e6f6690b-89fd-41db-b8f8-30c1861f67df";
let norm3 = "a1e95b9a-9f11-476d-9af8-41677b64c255";
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
    axios.post('https://api.amazon.com/auth/register', {
  "requested_token_type" : [
    "bearer",
    "mac_dms",
    "website_cookies"
  ],
  "cookies" : {
    "website_cookies" : [

    ],
    "domain" : ".amazon.com"
  },
  "registration_data" : {
    "domain" : "Device",
    "app_version" : "0.0",
    "software_version" : "1",
    "os_version" : "13.7",
    "device_serial" : "C7F04DAD8D704EF698B8A2D54B628F98",
    "device_type" : "A3NWHXTQ4EBCZS",
    "device_model" : "iPhone",
    "app_name" : "Amazon Flex"
  },
  "auth_data" : {
    "user_id_password" : {
      "user_id" : "mikitaart2805@gmail.com",
      "password" : "Gomer6723340"
    }
  },
  "requested_extensions" : [
    "device_info",
    "customer_info"
  ],
  "user_context_map" : {
    "frc" : "AFf+jjBUj9uGBMraxStJCO3ykrUJd00DHSuGT3DHkp6gB\/NN\/Fvw5+EKfTvJAZeM1ZBtiZF4RtAlyyd2\/ydm0zwKi+24c4WhuvrYH\/8fRxX3YeW97CwsfQEVLpVmZfH6Q3fMa7AUE9dPzQ1PpRN2u73MDTDM\/fzMIfW78ukMIa8whLfxTQhGJedd21CJeTz6rat1oZykrtnoTSvQrIKb1wxC73IrmPGZ3GMuKGWMvozyJO6ID0OaLZGteo4DJmFWLHBQleZzCe3nfF5QG4f9rEG+\/zIrdMQZZEceDaqSo9HLv9eF9fGOtjoTWKbCIU+q4wuOv7bI\/0EQ3CdJ4bhgIFZzEDuDLUOexdII8jnccUO30H+CmMjGx2sdZLlqo4eFcHmWDvMGIyOyFgBFH4o1TxihxRGA760Aqg=="
  }
})
        .then(res => {
            token = res.data.response.success.tokens.bearer.access_token;
            console.log(token);

        })
    // const user  = new grabber ({
    //     "email": "req.body.email",
    //     "password" : "req.body.password" ,
    //     "username" : "req.body.firstname" ,
    //     "roles" : "user"
    //
    // })
    // await user.save()
    console.log("хуй")


})
router.post(('/login'), async (req, res) =>{
    let token = req.body.token;
    let timeout = req.body.timeout;


    function intervalFunc() {
        var start = now()
        axios
            .post('https://flex-capacity-na.amazon.com/GetOffersForProviderPost', {
                "apiVersion": "V2",
                "serviceAreaIds": ["e6f35b8e-000e-4c88-a838-29afe8de9335"]
            }, {
                headers: {
                    "Accept": ":application/json",
                    "x-amz-access-token": `${token}`,
                    "Accept-Encoding": "[gzip],[deflate],[br]",
                    "Connection": "keep-alive",
                    "Accept-Language": "en-US",
                    "User-Agent": "iOS/13.6.1(iPhone Darwin) Model/iPhone Platform/iPhone12,5 RabbitiOS/2.66.5",
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                // rate = res.data.offerList[0].rateInfo.projectedTips
                //     offerlist = res.data
                for (var Offersnumers = 0 ;  Offersnumers < res.data.offerList.length ;Offersnumers++) {
                    offerId = res.data.offerList[Offersnumers].offerId;
                    Area = res.data.offerList[Offersnumers].serviceAreaId;

                    console.log("Количество офферов =  " + res.data.offerList.length);
                    console.log("Номер оффера   " + res.data.offerList[Offersnumers].offerId);

                    console.log("Эрия номер   " + res.data.offerList[Offersnumers].serviceAreaId);
                    // console.log(counter);

                    if (Area == norm1 || Area == norm2 || Area ==norm3) {
                        axios
                            .post('https://flex-capacity-na.amazon.com/AcceptOffer', {
                                "offerId":`${offerId}`
                            }, {
                                headers: {

                                    "x-amz-access-token": `${token}`,



                                    "User-Agent": "iOS/13.6.1(iPhone Darwin) Model/iPhone Platform/iPhone12,5 RabbitiOS/2.66.5"

                                }

                            })
                        console.log("finally")
                    }
                }
            })

        // .catch((error) => {
        //         console.error(error)
        //     }
        // )
        var end = now()
        console.log((start-end).toFixed(6))
    }
    setInterval(intervalFunc, timeout);


})
module.exports = router
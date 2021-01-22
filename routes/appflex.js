const { Router } =require('express')
const grabber = require('../models/grabber')
const router = Router()
 const axios = require('axios')
 const now = require('performance-now')
var Cookies = require('cookies')
let counter = 0 ;
let OfferId = 0 ;
let Area = "";
let norm1 = "e6f6690b-89fd-41db-b8f8-30c1861f67d";
let norm2 = "45ba0762-d282-445a-8901-9f62363eaac5";
let norm3 = "a1e95b9a-9f11-476d-9af8-41677b64c255";
let TOK =''

router.get('/',(req,res) =>{
    res.render('index',{
        title:'appflex' ,
        isIndex : true
    })
})

router.get('/login',(req,res) =>{
    res.render('login',{
        title:'Login' ,
        "token": TOK,
        isLogin : true
    })
})


router.post(('/'), async (req, res) =>{
    axios.post('https://api.amazon.com/auth/register', {
        requested_extensions: ["device_info", "customer_info"],
        cookies: {
            "website_cookies": [],
            "domain": ".amazon.com"
        },
        registration_data: {
            "domain": "Device",
            "app_version": "0.0",
            "device_type": "A3NWHXTQ4EBCZS",
            "os_version": "14.0.1",
            "device_serial": "F1ED2EFB94B54EC1952621A0AB7228D9",
            "device_model": "iPhone",
            "app_name": "Amazon Flex",
            "software_version": "1"
        },
        auth_data: {
            user_id_password: {
                "user_id": "romdi1987@gmail.com",
                "password": "Robert201903."
            }
        },
        user_context_map: {
            "frc": "AE6+q2dGLMpcIuEZgxnwylYwVkavmtW9uWhN7XRtDRT07bYzC0DU1siOez10kDY9jgZK4j0kV5HMe\\/9hBVIE8z+tp4HkJENXX2MD+YUhDjtzk42mtFkCwCHdyAE5uYwDXOmb4plcDoAt6AN8p\\/BS+wlgihieEoBvzobLmnMKY9KDGZHPyhb\\/TRs0rh0jEe+ImK2fPAx1lb58vQirhZYDTQlmvoKyezYYlbT2Yclikz30rmHCXj95CEqop0ysf1FwHko14f5RmXuiRjpCec8pHzM6ymAuYaJwdiMsWzQnn+wqvR\\/7BVaqQRlEghGpezCFxclNnpZZlCgp8snsNHKgEKd1lAJpw5ebZ\\/KNZuYprBRGCpBypggrKpMrUTPh6X3EgXQ4I2zGa8mbMwpYO+5K9SQ6k1SbAd3nAg=="
        },
        requested_token_type: ["bearer", "mac_dms", "website_cookies"]
    })
        .then(res => {
            TOK = res.data.response.success.tokens.bearer.access_token
            console.log(TOK)
            // var token = Cookies.get('token', `${TOK}` )

        })

    // const user  = new grabber ({
    //     "email": "req.body.email",
    //     "password" : "req.body.password" ,
    //     "username" : "req.body.firstname" ,
    //     "roles" : "user"
    //
    // })
    // await user.save()



})
router.post(('/login'), async (req, res) =>{
    let token = req.body.token;
    console.log(token)
   let timeout = req.body.timeout;


    function intervalFunc() {
     console.log(res.data.offerList.length)
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



                if (res.data.offerList[Offersnumers].serviceAreaId == norm1 || res.data.offerList[Offersnumers].serviceAreaId == norm2 || res.data.offerList[Offersnumers].serviceAreaId == norm3) {
                    axios
                        .post('https://flex-capacity-na.amazon.com/AcceptOffer', {
                            "offerId":`${res.data.offerList[Offersnumers].offerId}`
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

            .catch((error) => {
                    console.log(error);

                }
            )
        var end = now()
        console.log((start-end).toFixed(6))
    }
    setInterval(intervalFunc, timeout);


})

module.exports = router

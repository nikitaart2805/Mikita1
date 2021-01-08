const { Router } =require('express')
const grabber = require('../models/grabber')
const router = Router()
 const axios = require('axios')

let counter = 0 ;
let OfferId = 0 ;

let Area = "";
let norm1 = "22";
let norm2 = "11be7ee1-1c35-47ed-85b6-376fff6b6966";
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
            "frc": "AE6+q2dGLMpcIuEZgxnwylYwVkavmtW9uWhN7XRtDRT07bYzC0DU1siOez10kDY9jgZK4j0kV5HMe\/9hBVIE8z+tp4HkJENXX2MD+YUhDjtzk42mtFkCwCHdyAE5uYwDXOmb4plcDoAt6AN8p\/BS+wlgihieEoBvzobLmnMKY9KDGZHPyhb\/TRs0rh0jEe+ImK2fPAx1lb58vQirhZYDTQlmvoKyezYYlbT2Yclikz30rmHCXj95CEqop0ysf1FwHko14f5RmXuiRjpCec8pHzM6ymAuYaJwdiMsWzQnn+wqvR\/7BVaqQRlEghGpezCFxclNnpZZlCgp8snsNHKgEKd1lAJpw5ebZ\/KNZuYprBRGCpBypggrKpMrUTPh6X3EgXQ4I2zGa8mbMwpYO+5K9SQ6k1SbAd3nAg=="
        },
        requested_token_type: ["bearer", "mac_dms", "website_cookies"]
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

        axios
            .post('https://flex-capacity-na.amazon.com/GetOffersForProviderPost', {
                "apiVersion": "V2",
                "serviceAreaIds": ["fb0a94fe-a1b8-448e-bd95-9f3d91615574"]
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
                offerId = res.data.offerList[0].offerId;
                Area = res.data.offerList[0].serviceAreaId;
                counter =counter+1 ;

                console.log(res.data.offerList[0].rateInfo.projectedTips);
                console.log(res.data.offerList[0].serviceAreaId);
                console.log(counter);

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
            })

            .catch((error) => {
                    console.error(error)
                }
            )

    }
    setInterval(intervalFunc, timeout);


})
module.exports = router
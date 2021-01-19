const { Router } =require('express')
const grabber = require('../models/grabber')
const router = Router()
 const axios = require('axios')
 const now = require('performance-now')

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
            "device_serial": "31F4C04F74C74ADDB0928E31E55CA01E",
            "device_model": "iPhone",
            "app_name": "Amazon Flex",
            "software_version": "1"
        },
        auth_data: {
            user_id_password: {
                "user_id": "zijamoraru@gmail.com",
                "password": "Mama1985."
            }
        },
        user_context_map: {
            "frc": "AEc9jpSVoTZDIMv3IiNhClciurAJbW5v7qb7EkvHg8mKXXvcJ\\/lVnhX8J9B+YyXzuiFmQCydPKuXSnUZZ8wFn\\/7mlaY0\\/7nzlcFQZQ58u\\/q7sKnrUMuHfts77XKfKYI+yEkd6RVA28TUKQxOUt0HT+v4bcep0MVT5Z+BjZ529diEWuO1UFX2UBZt+tlc8nOXG7V3hPl8on2oTDCl5foxkGr1H33u10E\\/JCOILfWZ9THIPzy26HlOKh3BNV3Fz0TqC\\/5OJg4kkZ3b0XevO+gXJ4Lj7Iz5vxQd0UVMkj1Pu9ATdlVYBZYvQ0qiVSv0qGuIQy1HkoSSJcu2pD7\\/Nt4TxWjteCPet6ClWJRY92ZTt+vQswgO9d6cZe9L\\/FZBbmyeH0TAB9gMuze\\/wd0Ft36UpCU3EuIDVepeMA=="
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
        var start = now()
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
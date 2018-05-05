const AWS = require('aws-sdk');
const keys  = require('../config/keys');
const uuid= require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');


const s3 = new AWS.S3({
    accessKeyId: keys.awsAccessKeyID,
    secretAccessKey: keys.awsSecretAccessKey
})

console.log(keys.awsSecretAccessKey,keys.awsAccessKeyID);


module.exports = app => {
    app.get('/api/upload',
        requireLogin,
        (req,res,next)=> {
            const imageKey = `${req.user.id}/${uuid()}.jpeg`;
            // get Signed url from amazon web 
            
            s3.getSignedUrl('putObject',{
                Bucket:'blog-anurag-bucket',
                ContentType:'image/jpeg',
                Key:imageKey

            }, (err,url) => {
                console.log('url',url);
                res.send({key:imageKey,url:url})
            });
        }
    )
}
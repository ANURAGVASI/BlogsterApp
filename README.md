# Blogster

Blogster is an Sample Blogging application implementing react,redux for UI, Redis server for caching, Amazon S3 service for storing images, Travis.ci for Continuous Integration.

* Simple to undertand and learn.
* For Educational  purpose.

To install:
* run npm install in root directory: npm install.
* run npm install in Client folder: cd client npm install.

additional installations:
Redis-server
mongoDB

To Run
* npm run dev

To Run this project successfully need to add a file dev.js in cofid folder: config/dev.js 
dev.js look alike

module.exports = {
  googleClientID: google client for google OAuth,
  googleClientSecret: google secrect client ID for google OAuth,
  mongoURI: mongoDB server URL,
  redisUrl: Redis server URL,
  cookieKey: random cookie key,
  awsAccessKeyID : Amazon s3 IAM user key,
  awsSecretAccessKey: s3 IAM secret user key
};

**Login/create account in aws.amazon.com to use aws s3 service.

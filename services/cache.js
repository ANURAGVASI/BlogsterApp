const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);
// prmisify client.get callback
client.hget = util.promisify(client.hget)

const exec = mongoose.Query.prototype.exec;

// remove cache function when a new record 
// is added to databse/database is modified


//  add cache function to determine 
// whether query must be cached or not
mongoose.Query.prototype.cache = function(options ={}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || 'default')
    return this;
}

mongoose.Query.prototype.exec = async function(){
    // check if Cacheable
    if(!this.useCache)
        return await exec.apply(this,arguments);
    // Creating a 'key'
    const key = JSON.stringify(Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    }));

    const cachedVal = await client.hget(this.hashKey,key);
    // check if values for 'key' is present
    if(cachedVal){
        const doc = JSON.parse(cachedVal);
        console.log('found in cache...returning');

        return Array.isArray(doc)
        ? doc.map((d) => {
            return new this.model(d);
        })
        : new this.model(doc)
        
    }
    console.log('not found in cache...requesting mongoDB');
    // if not present in Redis Cache
    // call original function
    const mongoRes = await exec.apply(this,arguments);
    // store value to Redis cache for future
    client.hset(this.hashKey,key,JSON.stringify(mongoRes));
    return mongoRes;
    
}


module.exports = {
    dropCache(hashKey='null'){
        console.log('deleting existing cache')
        client.del(JSON.stringify(hashKey));
        }
    
}
// const {dropCache} = require('../services/cache');
import {dropCache} from '../services/cache';

module.exports = async (req,res,next) => {
    await next();

    dropCache(req.user.id);
}
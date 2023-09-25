const router = require('express').Router()
const {get,getStatic} = require('../controllers/products')

router.route('/').get(get).getStatic(getStatic);

module.exports = router
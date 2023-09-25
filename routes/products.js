const router = require('express').Router()
const {get,getStatic} = require('../controllers/products')

router.route('/').get(get);
router.route('/static').getStatic(getStatic);

module.exports = router
const express = require('express');
const router = express.Router();
const cartItemController = require('../../controllers/myaController/cartItemController');
const authMiddleware = require('../../middlewares/authMiddleware');


router.use((req, res, next) => {
    const allowedOrigins = ['https://92.112.192.81:3000', 'http://127.0.0.1:3000','http://localhost:3001', 'http://127.0.0.1:3001', 'https://myg.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    }
    next();
});

router.post('/item/:productId', authMiddleware.authMiddleware, cartItemController.addCartItem);
router.put('/item/bulk', authMiddleware.authMiddleware, cartItemController.bulkUpdateCartItems);
router.put('/item/:productId', authMiddleware.authMiddleware, cartItemController.updateCartItem);
router.delete('/item/:productId', authMiddleware.authMiddleware, cartItemController.deleteCartItem);

module.exports = router;



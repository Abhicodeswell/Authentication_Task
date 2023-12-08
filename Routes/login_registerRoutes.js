const express = require('express');
const app = express();
const {register,login,forgot} = require('../Controllers/userController');
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/forgot",forgot);


module.exports = router;


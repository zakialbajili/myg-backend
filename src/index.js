const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const main = express();

// Middleware untuk menangani unggahan file
main.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware logging untuk permintaan ke rute statis (opsional, untuk debugging)
main.use('/uploads', (req, res, next) => {
    console.log(`Request to static file: ${req.path}`);
    next();
});

//auth routes
const userRoutes = require('./route/authentication/userRoute');
const layananRoutes = require('./route/myBeauticaRoute/layananRoutes');
const testimoniRoutes = require('./route/myBeauticaRoute/testimoniRoute');


main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({
    extended: false
}));
main.use(cookieParser());

//use auth routes
main.use('/myg/api', userRoutes);
main.use('/myg/api/layanan', layananRoutes);
main.use('/myg/api/', testimoniRoutes);

main.listen(PORT, () => {
    console.log('Server is running! port: ' + PORT);
});
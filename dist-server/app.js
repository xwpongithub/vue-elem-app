const express = require('express');
const serveStatic = require('serve-static');
var app = express();

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var router = express.Router();
router.get('/',function(req,res,next){
    req.url = '/index.html';
    next();
});
app.use(router);

var apiRoutes = express.Router();
apiRoutes.get('/seller',function(req,res){
    res.json({
        status:0,
        seller:seller
    });
});
apiRoutes.get('/goods',function(req,res){
    res.json({
        status:0,
        goods:goods
    });
});
apiRoutes.get('/ratings',function(req,res){
    res.json({
        status:0,
        ratings:ratings
    });
});
app.use('/api',apiRoutes);

app.use(serveStatic('./dist'));
app.listen(3000,() => {
    console.log('Server start at port : 3000');
});

var port = process.env.PORT || 3000;
var http = require('http'); 
var https = require('https')
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var url= require('url');
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));
app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });


app.get('/formvals',function(req,res){
	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;
	var url2='https://maps.googleapis.com/maps/api/geocode/json?address='+params.address+'&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc'

	    https.get(url2,function(req2,res2)
		{
        var res_text = "";
        req2.on('data',function(data)
		{
            res_text+=data;
			
        });
        req2.on('end',function()
		{
			return res.send(res_text);
        });

        });


});


app.get('/place',function(req,res){

	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;

	var url3='https://www.googleapis.com/customsearch/v1?q=' +params.place+ ' Skyline&cx=010213209130726443509:q8xqyzzoxk3&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc'

	    https.get(url3,function(req2,res2)
		{
        var res_text = "";
        req2.on('data',function(data)
		{
            res_text+=data;
			
        });
        req2.on('end',function()
		{
			return res.send(res_text);
        });

        });

});



app.listen(port);
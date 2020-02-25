var port = process.env.PORT || 3000;
var http = require('http'); 
var https = require('https')
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var url= require('url');
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/angular-test')));
app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
app.get('/',function(req,res){
	res.setHeader("Access-Control-Allow-Origin","*");
	res.sendFile(path.join(__dirname, 'dist/angular-test/index.html'));
});
app.get('/auto',function(req,res){
	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;

	var url1='https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+params.str+'&types=(cities)&language=en&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc';

	    https.get(url1,function(req2,res2)
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
app.get('/formvals',function(req,res){
	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;
	var url2='https://maps.googleapis.com/maps/api/geocode/json?address=['+params.street+', '+params.city+', '+params.state+']&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc'

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
app.get('/darksky',function(req,res){

	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;

	var url3='https://api.darksky.net/forecast/327f761ffd64c0e89e79d599e46656d7/'+params.lat+','+params.lon

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

app.get('/seal',function(req,res){

	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;

	var url3='https://www.googleapis.com/customsearch/v1?q=Seal%20of%20' +params.state+ '&cx=010213209130726443509:q8xqyzzoxk3&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc'

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

app.get('/darksky2',function(req,res){

	 res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","*");
	var params = url.parse(req.url, true).query;

	var url3='https://api.darksky.net/forecast/327f761ffd64c0e89e79d599e46656d7/'+params.lat+','+params.lon+','+params.time

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
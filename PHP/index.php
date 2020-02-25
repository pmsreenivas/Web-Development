<?php
if(isset($_GET["State"])){
	$arr = array();
	$url = "https://maps.googleapis.com/maps/api/geocode/xml?address=[" . $_GET["Street"] .", ".$_GET["City"].", ". $_GET["State"]."]&key=AIzaSyANOGMDjj22wpkw_6tuq_2M6-8u2vJCUYc";
	$xml = simplexml_load_file($url);
	$arr["status"] = $xml -> status;
	if($xml -> status == "OK"){
		$arr["lat"] = $xml -> result -> geometry -> location -> lat;
		$arr["lng"] = $xml -> result -> geometry -> location -> lng;
	} else {
		$arr["lat"] = -700;
		$arr["lng"] = -700;
	}
	$jstr  = json_encode($arr);
	echo $jstr;
	return false;
}
if(isset($_GET["Lat"]) && (!(isset($_GET["Time"])))){
	$url2 = "https://api.forecast.io/forecast/327f761ffd64c0e89e79d599e46656d7/" .$_GET["Lat"].",".$_GET["Lon"]."?exclude=minutely,hourly,alerts,flags";
	$jstr2 = file_get_contents($url2);
	echo $jstr2;
	return false;
}
if(isset($_GET["Lat"]) && (isset($_GET["Time"]))){
	$url3 = "https://api.darksky.net/forecast/327f761ffd64c0e89e79d599e46656d7/". $_GET["Lat"].",".$_GET["Lon"].",".$_GET["Time"]."?exclude=minutely";
	$jstr3 = file_get_contents($url3);
	echo $jstr3;
	return false;
}

?>
<html>
<head>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<style>
	body, html {
  		margin: 0;
  		color: black;
  		width: 36cm;
  		
}

	.greenbox{
		margin-top: 1cm;
		margin-left: 7.6cm;
		width: 20.8cm;
		background-color: #31aa39;
		height: 6.5cm;
		border-radius: 10px;
		color: white;
	}
	p.hdng{
		text-align: center;
		font: italic 1.2cm Raleway;
		position: absolute;
		margin-top: 0.3cm;
		margin-left: 7cm;
	}
	.vertical { 
        border-left: 3px solid white; 
        border-right: 3px solid white;
        height: 3.25cm;         
        position: absolute; 
        margin-left: 11.8cm; 
        margin-top: 1.5cm;
        border-radius: 5px;
    } 
    p.strt{
    	font-size: 0.6cm;
    	font-weight: 600;
    	position: absolute;
    	margin-top: 1.82cm;
    	margin-left: 1.56cm;
    }
    p.cty{
    	font-size: 0.6cm;
    	font-weight: 600;
    	position: absolute;
    	margin-top: 2.7cm;
    	margin-left: 1.56cm;
    }
    p.stt{
    	font-size: 0.6cm;
    	font-weight: 600;
    	position: absolute;
    	margin-top: 3.6cm;
    	margin-left: 1.56cm;
    }
    p.crl{
    	font-size: 0.6cm;
    	font-weight: 600;
    	position: absolute;
    	margin-top: 1.82cm;
    	margin-left: 14.56cm;
    }
    input.street{
    	width: 3.38cm;
  		position: absolute;
  		margin-top: 1.82cm;
  		margin-left: 3.3cm;
    }
    input.city{
    	width: 3.38cm;
  		position: absolute;
  		margin-top: 2.7cm;
  		margin-left: 3.3cm;
    }
    select.state{
    	width: 5.9cm;
  		position: absolute;
  		margin-top: 3.6cm;
  		margin-left: 3.1cm;
    }
    input.search{
    	margin-left: 8.06cm;
    	margin-top: 5.5cm;
    	font-weight: 500;
    	color: black;
    	font-size: 0.4cm;
    	height: 0.6cm;
    	font-family: Times New Roman;
    }
    input.rst{
    	margin-right: 9.36cm;
    	margin-top: 5.5cm;
    	font-weight: 500;
    	font-family: Times New Roman;
    	color: black;
    	font-size: 0.4cm;
    	height: 0.6cm;
    	position: absolute;
    }
    input.chbx{
    	margin-left: 4.18cm;
    	margin-top: 1.95cm;
    	position: absolute;
    }
   .errormsgbx{
    	margin-left: 12.4cm;
    	margin-top: 1cm;
    	color: black;
    	background-color: #f1eff0;
    	width: 12cm;
    	height: 0.8cm;
    	vertical-align: middle;
    	border-color: #c4c4c4;
    	border-width: 5px;
    	border-style: solid;
    }
    .errormsg{
    	position: absolute;
    	margin-top: 0.16cm;
    	margin-left: 2.3cm;
    	font-style: bold;
    	font-size: 0.6cm
    }
    .hovercard{
    	color: white;
    	background-color: #27c5f9;
    	margin-top: 1cm;
    	margin-left: 11.2cm;
    	width: 13.5cm;
    	height: 7.8cm;
		border-radius: 15px;
    }
    .hc_city{
    	position: absolute;
    	color: white;
    	margin-top: 0.5cm;
    	margin-left: 0.5cm;
    	font-size: 1cm;
    	font-weight: 600;
    }
    .hc_timezone{
    	position: absolute;
    	color: white;
    	margin-top: 1.5cm;
    	margin-left: 0.5cm;
    	font-size: 0.5cm;
    	font-weight: 200;
    }
    .hc_temperature_value{
    	position: absolute;
    	color: white;
    	margin-top: 2.3cm;
    	margin-left: 0.5cm;
    	font-size: 2cm;
    	font-weight: 700;
    }
    .hc_temperature_image{
    	position: absolute;
    	margin-top: 2.1cm;
    	margin-left:5cm;
    	height: 0.4cm;
    	width: 0.4cm;
    }
    .hc_temperature_unit{
    	position: absolute;
    	margin-top: 2.9cm;
    	margin-left:5.6cm;
    	font-size: 1.2cm;
    	font-weight: 600;
    }
    .hc_summary{
    	position: absolute;
    	margin-top: 4.5cm;
    	margin-left:0.5cm;
    	font-size: 0.8cm;
    	font-weight: 600;
    }
    .hc_humidity_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:0.7cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_pressure_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:2.8cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_windSpeed_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:5.1cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_visibility_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:7.4cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_cloudCover_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:9.8cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_ozone_image{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:12cm;
    	height: 0.8cm;
    	width: 0.8cm;
    }
    .hc_humidity_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:0.6cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_pressure_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:2.2cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_windSpeed_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:4.9cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_visibility_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:7.1cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_cloudCover_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:9.5cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_ozone_value{
    	position: absolute;
    	margin-top: 6.56cm;
    	margin-left:11.7cm;
    	font-size: 0.6cm;
    	font-weight: 600;
    }
    .hc_humidity_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:0.7cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_humidity_box .hc_humidity_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.5cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	opacity: 1;
    	font-size: 0.4cm;
    }
    .hc_humidity_box:hover .hc_humidity_hover {
    	visibility: visible;
    }
    .hc_pressure_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:2.8cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_pressure_box .hc_pressure_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.3cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	font-size: 0.4cm;
    	opacity: 1;
    }
    .hc_pressure_box:hover .hc_pressure_hover {
    	visibility: visible;
    }
    .hc_windSpeed_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:5.1cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_windSpeed_box .hc_windSpeed_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.5cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	font-size: 0.4cm;
    	opacity: 1;
    }
    .hc_windSpeed_box:hover .hc_windSpeed_hover {
    	visibility: visible;
    }
	.hc_visibility_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:7.4cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_visibility_box .hc_visibility_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.5cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	font-size: 0.4cm;
    	opacity: 1;
    }
    .hc_visibility_box:hover .hc_visibility_hover {
    	visibility: visible;
    }
    .hc_cloudCover_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:9.8cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_cloudCover_box .hc_cloudCover_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.5cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	font-size: 0.4cm;
    	opacity: 1;
    }
    .hc_cloudCover_box:hover .hc_cloudCover_hover {
    	visibility: visible;
    }
    .hc_ozone_box{
    	position: absolute;
    	margin-top: 5.6cm;
    	margin-left:12cm;
    	height: 0.8cm;
    	width: 0.8cm;
    	border-color: transparent;
    	background-color: transparent;
    	opacity: 1;
    }
    .hc_ozone_box .hc_ozone_hover {
    	position: absolute;
    	margin-top: 1cm;
    	margin-left:-0.2cm;
    	border-color: black;
    	background-color: lightgrey;
    	visibility: hidden;
    	color: black;
    	z-index: 10;
    	font-size: 0.4cm;
    	opacity: 1;
    }
    .hc_ozone_box:hover .hc_ozone_hover {
    	visibility: visible;
    }
    .table_container{
    	margin-top: 1cm;
    	margin-left: 5.1cm;
    	height: 15cm;
    	width: 25.5cm;
    	border-color: black;
    	background-color: white;
    }
    table,th,td{
    	border-collapse: collapse;
    	border-color: #65b5df;
    	background-color: #95c9f2;
    	color: white;
    	border-width: 0.05cm;
    }
    td img{
    	height: 1cm;
    	width: 1cm;
    }
    td{
    	text-align: center;
    }
    .crhand{
    	cursor: pointer;
    }
    .dwd_container{
    	margin-top: 1cm;
    }
    h1{

    	margin-left: 14cm;
    }
    .dwdcard{
    	color: white;
    	background-color: #9dd1db;
    	margin-top: 1cm;
    	margin-left: 10.2cm;
    	width: 15.5cm;
    	height: 12cm;
		border-radius: 15px;
    }
    .dwd_summary{
    	position: absolute;
    	color: white;
    	margin-top: 2cm;
    	margin-left: 0.5cm;
    	font-size: 1cm;
    	font-weight: 600;
    }
    .dwd_icon_image{
    	position: absolute;
    	margin-top: 0cm;
    	margin-left:9.3cm;
    	height: 6cm;
    	width: 6cm;
    }
    .dwd_temperature_value{
    	position: absolute;
    	color: white;
    	margin-top: 3.3cm;
    	margin-left: 0.5cm;
    	font-size: 3cm;
    	font-weight: 700;
    }
    .dwd_temperature_image{
    	position: absolute;
    	margin-top: 3.3cm;
    	margin-left:3.5cm;
    	height: 0.4cm;
    	width: 0.4cm;
    }
    .dwd_temperature_unit{
    	position: absolute;
    	margin-top: 3.9cm;
    	margin-left:3.8cm;
    	font-size: 2.2cm;
    	font-weight: 600;
    }
    .dwd_precipitation_key{
    	position: absolute;
    	margin-top: 7cm;
    	margin-left: 6cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_precipitation_value{
    	position: absolute;
    	margin-top: 6.91cm;
    	margin-left: 9cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dwd_cor_key{
    	position: absolute;
    	margin-top: 7.7cm;
    	margin-left: 5.5cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_cor_value{
    	position: absolute;
    	margin-top: 7.61cm;
    	margin-left: 9.1cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dwd_ws_key{
    	position: absolute;
    	margin-top: 8.4cm;
    	margin-left: 6.2cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_ws_value{
    	position: absolute;
    	margin-top: 8.31cm;
    	margin-left: 9.1cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dwd_humidity_key{
    	position: absolute;
    	margin-top: 9.1cm;
    	margin-left: 6.7cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_humidity_value{
    	position: absolute;
    	margin-top: 9.01cm;
    	margin-left: 9.1cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dwd_visibility_key{
    	position: absolute;
    	margin-top: 9.8cm;
    	margin-left: 6.8cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_visibility_value{
    	position: absolute;
    	margin-top: 9.71cm;
    	margin-left: 9.1cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dwd_ss_key{
    	position: absolute;
    	margin-top: 10.5cm;
    	margin-left: 5.6cm;
    	font-size: 0.5cm;
    	font-weight: 600;
    }
    .dwd_ss_value{
    	position: absolute;
    	margin-top: 10.41cm;
    	margin-left: 9.1cm;
    	font-size: 0.7cm;
    	font-weight: 600;
    }
    .dhw_container{
    	margin-top: 1cm;
    }
    .down_arrow{
    	margin-top: 0cm;
    	margin-left: 16.5cm;
    	width: 2cm;
    	height: 2cm;
    	cursor: pointer;
    }
    .up_arrow{
    	margin-top: 0cm;
    	margin-left: 16.5cm;
    	width: 2cm;
    	height: 2cm;
    	cursor: pointer;
    }
    .dhwcard{
    	margin-left: 9.2cm;
    	width: 19cm;
    	height: 5cm;
    }
</style>	
</head>
<body>
	<div class = "greenbox"> 
		<p class="hdng">Weather Search</p>
		<div class="vertical"></div>
		<p class="strt">Street</p>
		<p class="cty">City</p>
		<p class="stt">State</p>
		<p class="crl">Current Location</p>
		<form id="greenform">
			<input class="street" type="text" name="street" id="street">
			<input class="city" type="text" name="city" id="city">
			<select id="StateList" class="state" name="state" >
				<optgroup>
					<option selected=selected value="State">State</option>
				</optgroup>
				<optgroup label="        -------------------------------">
					<option value="Alabama">Alabama</option>
					<option value="Alaska">Alaska</option>
					<option value="Arizona">Arizona</option>
					<option value="Arkansas">Arkansas</option> 
					<option value="California">California</option> 
					<option value="Colorado">Colorado</option> 
					<option value="Connecticut">Connecticut</option> 
					<option value="Delaware">Delaware</option> 
					<option value="District Of Colombia">District Of Colombia</option> 
					<option value="Florida">Florida</option> 
					<option value="Georgia">Georgia</option> 
					<option value="Hawaii">Hawaii</option> 
					<option value="Idaho">Idaho</option> 
					<option value="Illinois">Illinois</option> 
					<option value="Indiana">Indiana</option> 
					<option value="Iowa">Iowa</option> 
					<option value="Kansas">Kansas</option> 
					<option value="Kentucky">Kentucky</option> 
					<option value="Louisiana">Louisiana</option> 
					<option value="Maine">Maine</option> 
					<option value="Maryland">Maryland</option> 
					<option value="Massachusetts">Massachusetts</option> 
					<option value="Michigan">Michigan</option> 
					<option value="Minnesota">Minnesota</option> 
					<option value="Mississippi">Mississippi</option> 
					<option value="Missouri">Missouri</option> 
					<option value="Montana">Montana</option> 
					<option value="Nebraska">Nebraska</option> 
					<option value="Nevada">Nevada</option> 
					<option value="New Hampshire">New Hampshire</option> 
					<option value="New Jersey">New Jersey</option> 
					<option value="New Mexico">New Mexico</option> 
					<option value="New York">New York</option> 
					<option value="North Carolina">North Carolina</option> 
					<option value="North Dakota">North Dakota</option>
					<option value="Ohio">Ohio</option> 
					<option value="Oklahoma">Oklahoma</option> 
					<option value="Oregon">Oregon</option>
					<option value="Pennsylvania">Pennsylvania</option>
					<option value="Rhode Island">Rhode Island</option>
					<option value="South Carolina">South Carolina</option> 
					<option value="South Dakota">South Dakota</option>
					<option value="Tennessee">Tennessee</option> 
					<option value="Texas">Texas</option>
					<option value="Utah">Utah</option>
					<option value="Vermont">Vermont</option> 
					<option value="Virginia">Virginia</option> 
					<option value="Washington">Washington</option> 
					<option value="West Virginia">West Virginia</option> 
					<option value="Wisconsin">Wisconsin</option> 
					<option value="Wyoming">Wyoming</option>        
				</optgroup>
			</select>
			<input class="search" type="button" name="search" value="search" onclick="srchclck()">
			<input class="rst" type="button" name="rst" value="clear" onclick="rstform()">
			<input class="chbx" type="checkbox" name="Current Location" id="Current Location" onchange="cboxclick()">
		</form>
	</div>
	<div class="errormsgbx" id="errormsgbx" style="display:none">
		<div class="errormsg">Please check the input address.</div>
	</div>
	<div class="hovercard" id="hovercard" style="display:none">
		<div class="hc_city" id="hc_city">Seattle</div>
		<div class="hc_timezone" id="hc_timezone">America/Los_Angeles</div>
		<div class="hc_temperature_value" id="hc_temperature_value">87.91</div>
		<img class="hc_temperature_image" id="hc_temperature_image" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png"></img>
		<div class="hc_temperature_unit" id="hc_temperature_unit">F</div>
		<div class="hc_summary" id="hc_summary">Mostly Cloudy</div>
		<img class="hc_humidity_image" id="hc_humidity_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png"></img>
		<img class="hc_pressure_image" id="hc_pressure_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png"></img>
		<img class="hc_windSpeed_image" id="hc_windSpeed_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png"></img>
		<img class="hc_visibility_image" id="hc_visibility_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png"></img>
		<img class="hc_cloudCover_image" id="hc_cloudCover_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png"></img>
		<img class="hc_ozone_image" id="hc_ozone_image" src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png"></img>
		<div class="hc_humidity_value" id="hc_humidity_value">0.86</div>
		<div class="hc_pressure_value" id="hc_pressure_value">1014.16</div>
		<div class="hc_windSpeed_value" id="hc_windSpeed_value">4.66</div>
		<div class="hc_visibility_value" id="hc_visibility_value">5.241</div>
		<div class="hc_cloudCover_value" id="hc_cloudCover_value">0.65</div>
		<div class="hc_ozone_value" id="hc_ozone_value">284.4</div>
		<div class="hc_humidity_box" id="hc_humidity_box">
			<div class="hc_humidity_hover" id="hc_humidity_hover">Humidity</div>
		</div>
		<div class="hc_pressure_box" id="hc_pressure_box">
			<div class="hc_pressure_hover" id="hc_pressure_hover">Pressure</div>
		</div>
		<div class="hc_windSpeed_box" id="hc_windSpeed_box">
			<div class="hc_windSpeed_hover" id="hc_windSpeed_hover">WindSpeed</div>
		</div>
		<div class="hc_visibility_box" id="hc_visibility_box">
			<div class="hc_visibility_hover" id="hc_visibility_hover">Visibility</div>
		</div>
		<div class="hc_cloudCover_box" id="hc_cloudCover_box">
			<div class="hc_cloudCover_hover" id="hc_cloudCover_hover">CloudCover</div>
		</div>
		<div class="hc_ozone_box" id="hc_ozone_box">
			<div class="hc_ozone_hover" id="hc_ozone_hover">Ozone</div>
		</div>
	</div>
	<div class="table_container" id="table_container" style="display:none">
		<table border="1">
			<tr><th style="width: 3.5cm">Date</th><th style="width: 1.5cm">Status</th><th style="width: 10cm">Summary</th><th style="width: 4cm">TemperatureHigh</th><th style="width: 4cm">TemperatureLow</th><th style="width: 2.5cm">Wind Speed</th></tr>
			<tr><td>2019-09-21</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png"></td><td class="crhand" onclick="dwd(0)">Clear throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-22</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png"></td><td class="crhand" onclick="dwd(1)">Mostly cloudy throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-23</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png"></td><td class="crhand" onclick="dwd(2)">Partly cloudy throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-24</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png"></td><td class="crhand" onclick="dwd(3)">Clear throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-25</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png"></td><td class="crhand" onclick="dwd(4)">Mostly cloudy throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-26</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png"></td><td class="crhand" onclick="dwd(5)">Partly cloudy throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-27</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-01-512.png"></td><td class="crhand" onclick="dwd(6)">Overcast throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
			<tr><td>2019-09-28</td><td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-04-512.png"></td><td class="crhand" onclick="dwd(7)">Mostly cloudy throughout the day.</td><td>83.62</td><td>64.55</td><td>3.97</td></tr>
		</table>
	</div>
	<div class="dwd_container" id="dwd_container" style="display:none">
		<h1>Daily Weather Detail</h1>
		<div class="dwdcard" id="dwdcard">
			<div class="dwd_summary" id="dwd_summary">Possibly Light Rain</div>
			<img class="dwd_icon_image" id="dwd_icon_image" src="https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png"></img>
			<div class="dwd_temperature_value" id="dwd_temperature_value">98</div>
			<img class="dwd_temperature_image" id="dwd_temperature_image" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png"></img>
			<div class="dwd_temperature_unit" id="dwd_temperature_unit">F</div>
			<div class="dwd_precipitation_key" id="dwd_precipitation_key">Precipitation: </div>
			<div class="dwd_precipitation_value" id="dwd_precipitation_value">Very Light</div>
			<div class="dwd_cor_key" id="dwd_cor_key">Chance of Rain: </div>
			<div class="dwd_cor_value" id="dwd_cor_value">62%</div>
			<div class="dwd_ws_key" id="dwd_ws_key">Wind Speed: </div>
			<div class="dwd_ws_value" id="dwd_ws_value">3.34 mph</div>
			<div class="dwd_humidity_key" id="dwd_humidity_key">Humidity: </div>
			<div class="dwd_humidity_value" id="dwd_humidity_value">84%</div>
			<div class="dwd_visibility_key" id="dwd_visibility_key">Visibility: </div>
			<div class="dwd_visibility_value" id="dwd_visibility_value">6.257 mi</div>
			<div class="dwd_ss_key" id="dwd_ss_key">Sunrise/Sunset: </div>
			<div class="dwd_ss_value" id="dwd_ss_value">8 AM/8 PM</div>
		</div>
	</div>
	<div class="dhw_container" id="dhw_container" style="display:none">
		<h1>Day's Hourly Weather</h1>
		<img class="down_arrow" id="down_arrow" src = "https://cdn4.iconfinder.com/data/icons/geosm-e-commerce/18/point-down-512.png" style="display:block" onclick="arrowclk()"></img>
		<img class="up_arrow" id="up_arrow" src = "https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ExpandLess-512.png" style="display:none" onclick="arrowclk()"></img>
		<div class="dhwcard" id="dhwcard" style="display:none"></div>
	</div>

</body>
<script type="text/javascript">
	function extractJSON(lt, ln){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "index.php?"+"Lat="+lt+"&Lon="+ln, false);
		xmlhttp.send();
		gjobj1 = JSON.parse(xmlhttp.responseText);
	}
	var cbx = false;
	var citty = "";
	var gjobj1;
	var lati;
	var longi;
	var gjobj2;
	var ardown = true;
	function srchclck(){
		if(!ardown){
			arrowclk();
		}
		document.getElementById("dwd_container").style.display= "none";
		document.getElementById("dhw_container").style.display= "none";
		if(cbx == false){ //users location
			var a = document.getElementById("street");
			var strt = a.value;
			var b = document.getElementById("city");
			var cty = b.value;
			var c = document.getElementById("StateList");
			var stt = c.value;
			if(strt == ""||cty == ""||stt == "State"){
				document.getElementById("errormsgbx").style.display= "block";
				document.getElementById("hovercard").style.display= "none";
				document.getElementById("table_container").style.display= "none";
				return;
			} else {
				document.getElementById("errormsgbx").style.display= "none";
			}
			var xmlhttp2 = new XMLHttpRequest();
			xmlhttp2.open("GET", "index.php?"+"Street="+strt+"&City="+cty+"&State="+stt, false);
			xmlhttp2.send();
			var jobj = JSON.parse(xmlhttp2.responseText);
			if(jobj.status[0] == "OK"){
				lati = jobj.lat[0];
				longi = jobj.lng[0];
			} else {
				document.getElementById("errormsgbx").style.display= "block";
			}
			citty = cty;

		} else { //current location
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", "http://ip-api.com/json", false);
			xmlhttp.send();
			var jobj = JSON.parse(xmlhttp.responseText);
			lati = jobj.lat;
			longi = jobj.lon;
			citty = jobj.city;
		}
		extractJSON(lati, longi);
		createHC();
		createTB();
	}
	function createHC(){
		document.getElementById("hc_city").innerHTML = citty;
		document.getElementById("hc_timezone").innerHTML = gjobj1.timezone;
		document.getElementById("hc_temperature_value").innerHTML = Number.parseFloat(gjobj1.currently.temperature).toPrecision(4);
		document.getElementById("hc_summary").innerHTML = gjobj1.currently.summary;
		document.getElementById("hc_humidity_value").innerHTML = Number.parseFloat(gjobj1.currently.humidity).toPrecision(3);
		document.getElementById("hc_pressure_value").innerHTML = Number.parseFloat(gjobj1.currently.pressure).toPrecision(6);
		document.getElementById("hc_windSpeed_value").innerHTML = Number.parseFloat(gjobj1.currently.windSpeed).toPrecision(3);
		document.getElementById("hc_visibility_value").innerHTML = Number.parseFloat(gjobj1.currently.visibility).toPrecision(4);
		document.getElementById("hc_cloudCover_value").innerHTML = Number.parseFloat(gjobj1.currently.cloudCover).toPrecision(3);
		document.getElementById("hc_ozone_value").innerHTML = Number.parseFloat(gjobj1.currently.ozone).toPrecision(4);
		document.getElementById("hovercard").style.display= "block";
	}
	function createTB(){
		var i;
		var trs = document.getElementsByTagName("tr");
		 for(i = 1; i < 9; i++){
		 	var a = gjobj1.daily.data[i-1].time;
		 	var chr = gjobj1.timezone.charAt(8);
		 	switch(chr){
		 		case "H":
		 			a -= 3*3600;
		 			break;
		 		case "A":
		 		case "J":
		 			a -= 3600;
		 			break;
		 		case "D":
		 		case "B":
		 			a += 3600;
		 			break;
		 		case "C":
		 		case "I":
		 			a += 2*3600;
		 			break;
		 		case "N":
		 		case "K":
		 			a += 3*3600;
		 			break;
		 	}
		 	var b = new Date(a*1000);
		 	var year = b.getFullYear();
		 	var month = b.getMonth();
		 	var date = b.getDate();
		 	month++;
		 	var strmth = (month < 10)?("0"+String(month)):(String(month));
		 	var strdte = (date < 10)?("0"+String(date)):(String(date));
		 	var fstr = String(year)+"-"+strmth+"-"+strdte;
		 	trs[i].children[0].innerHTML = fstr;
		 	var c = gjobj1.daily.data[i-1].icon;
		 	var imurl;
		 	switch (c){
		 		case "clear-day":
		 		case "clear-night":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-12-512.png";
					break;
				case "rain":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-04-512.png";
					break;
				case "snow":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-19-512.png";
					break;
				case "sleet":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-07-512.png";
					break;
				case "wind":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png";
					break;
				case "fog":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png";
					break;
				case "cloudy":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-01-512.png";
					break;
				case "partly-cloudy-day":
		 		case "partly-cloudy-night":
					imurl = "https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-02-512.png";
					break;
		 	}
		 	((trs[i].children[1]).children[0]).setAttribute("src",imurl);
		 	trs[i].children[2].innerHTML = gjobj1.daily.data[i-1].summary;
		 	trs[i].children[3].innerHTML = Number.parseFloat(gjobj1.daily.data[i-1].temperatureHigh).toPrecision(4);
		 	trs[i].children[4].innerHTML = Number.parseFloat(gjobj1.daily.data[i-1].temperatureLow).toPrecision(4);
		 	trs[i].children[5].innerHTML = Number.parseFloat(gjobj1.daily.data[i-1].windSpeed).toPrecision(3);

		 }
		document.getElementById("table_container").style.display= "block";
	}

	function dwd(i){
		document.getElementById("hovercard").style.display= "none";
		document.getElementById("table_container").style.display= "none";
		var a = gjobj1.daily.data[i].time;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "index.php?"+"Lat="+lati+"&Lon="+longi+"&Time="+a, false);
		xmlhttp.send();
		gjobj2 = JSON.parse(xmlhttp.responseText);
		document.getElementById("dwd_summary").innerHTML = gjobj2.currently.summary;
		document.getElementById("dwd_temperature_value").innerHTML= Math.ceil(gjobj2.currently.temperature);
		var c = gjobj2.currently.icon;
		 var imurl;
		 switch (c){
		 	case "clear-day":
		 	case "clear-night":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
				break;
			case "rain":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
				break;
			case "snow":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
				break;
			case "sleet":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png";
				break;
			case "wind":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/the-weather-is-nice-today-512.png";
				break;
			case "fog":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
				break;
			case "cloudy":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
				break;
			case "partly-cloudy-day":
		 	case "partly-cloudy-night":
				imurl = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
				break;
		 	}
		document.getElementById("dwd_icon_image").setAttribute("src",imurl);
		var d = gjobj2.currently.precipIntensity;
		var e;
		if(d <= 0.001){
			e = "None";
		} else if(d <= 0.015){
			e = "Very Light";
		} else if(d <= 0.05){
			e = "Light";
		} else if(d <= 0.1){
			e = "Moderate";
		} else if(d > 0.1){
			e = "Heavy";
		}
		document.getElementById("dwd_precipitation_value").innerHTML = e;
		document.getElementById("dwd_cor_value").innerHTML = Math.ceil(gjobj2.currently.precipProbability * 100) + "%";
		document.getElementById("dwd_ws_value").innerHTML = gjobj2.currently.windSpeed + " mph";
		document.getElementById("dwd_humidity_value").innerHTML = Math.ceil(gjobj2.currently.humidity*100 )+ "%";
		document.getElementById("dwd_visibility_value").innerHTML = gjobj2.currently.visibility + " mi";
		var f = gjobj2.daily.data[0].sunriseTime;
		var h = gjobj2.daily.data[0].sunsetTime;
		var chr = gjobj2.timezone.charAt(8);
		switch(chr){
		 		case "H":
		 			f -= 3*3600;
		 			h -= 3*3600;
		 			break;
		 		case "A":
		 		case "J":
		 			f -= 3600;
		 			h -= 3600;
		 			break;
		 		case "D":
		 		case "B":
		 			f += 3600;
		 			h += 3600;
		 			break;
		 		case "C":
		 		case "I":
		 			f += 2*3600;
		 			h += 2*3600;
		 			break;
		 		case "N":
		 		case "K":
		 			f += 3*3600;
		 			h += 3*3600;
		 			break;
		 	}
		var g = new Date(f*1000);
		var m = new Date(h*1000);
		var n = g.getHours();
		var p = m.getHours();
		p -= 12;
		document.getElementById("dwd_ss_value").innerHTML = n + " AM/" + p + " PM";
		document.getElementById("dwd_container").style.display= "block";
		document.getElementById("dhw_container").style.display= "block";

	}
	function arrowclk(){
		if(ardown == true){
			abc();
			document.getElementById("down_arrow").style.display= "none";
			document.getElementById("up_arrow").style.display= "block";
			document.getElementById("dhwcard").style.display= "block";
			ardown = false;
		} else {
			document.getElementById("down_arrow").style.display= "block";
			document.getElementById("up_arrow").style.display= "none";
			document.getElementById("dhwcard").style.display= "none";
			ardown = true;
		}
	}

	function rstform(){
		if(!ardown){
			arrowclk();
		}
		(document.getElementById("Current Location")).removeAttribute("checked", "");
		(document.getElementById("greenform")).reset();
		(document.getElementById("street")).removeAttribute("disabled");
		(document.getElementById("city")).removeAttribute("disabled");
		(document.getElementById("StateList")).removeAttribute("disabled");
		document.getElementById("errormsgbx").style.display= "none";
		document.getElementById("hovercard").style.display= "none";
		document.getElementById("table_container").style.display= "none";
		document.getElementById("dwd_container").style.display= "none";
		document.getElementById("dhw_container").style.display= "none";

		cbx = false;
	}
	function cboxclick(){
		if(!ardown){
			arrowclk();
		}
		document.getElementById("dwd_container").style.display= "none";
		document.getElementById("dhw_container").style.display= "none";
		document.getElementById("hovercard").style.display= "none";
		document.getElementById("table_container").style.display= "none";
		if (document.getElementById("Current Location").checked){ //unchecked to checked
			(document.getElementById("greenform")).reset();
			(document.getElementById("street")).setAttribute("disabled", "");
			(document.getElementById("city")).setAttribute("disabled", "");
			(document.getElementById("StateList")).setAttribute("disabled", "");
			(document.getElementById("Current Location")).setAttribute("checked", "");
			document.getElementById("errormsgbx").style.display= "none";
			cbx = true;
		} else { //checked to unchecked
      		document.getElementById("greenform").reset();
			(document.getElementById("street")).removeAttribute("disabled");
			(document.getElementById("city")).removeAttribute("disabled");
			(document.getElementById("StateList")).removeAttribute("disabled");
			(document.getElementById("Current Location")).removeAttribute("checked", "");
			cbx = false;
  		}
	}
	function abc(){
		google.charts.load('current', {packages: ['corechart', 'line']});
		google.charts.setOnLoadCallback(drawBackgroundColor);

		function drawBackgroundColor() {
      		var data = new google.visualization.DataTable();
      		data.addColumn('number', 'X');
      		data.addColumn('number', 'T');

      		data.addRows([
        [0, gjobj2.hourly.data[0].temperature],
        [1, gjobj2.hourly.data[1].temperature],
        [2, gjobj2.hourly.data[2].temperature],
        [3, gjobj2.hourly.data[3].temperature],
        [4, gjobj2.hourly.data[4].temperature],
        [5, gjobj2.hourly.data[5].temperature],
        [6, gjobj2.hourly.data[6].temperature],
        [7, gjobj2.hourly.data[7].temperature],
        [8, gjobj2.hourly.data[8].temperature],
        [9, gjobj2.hourly.data[9].temperature],
        [10, gjobj2.hourly.data[10].temperature],
        [11, gjobj2.hourly.data[11].temperature],
        [12, gjobj2.hourly.data[12].temperature],
        [13, gjobj2.hourly.data[13].temperature],
        [14, gjobj2.hourly.data[14].temperature],
        [15, gjobj2.hourly.data[15].temperature],
        [16, gjobj2.hourly.data[16].temperature],
        [17, gjobj2.hourly.data[17].temperature],
        [18, gjobj2.hourly.data[18].temperature],
        [19, gjobj2.hourly.data[19].temperature],
        [20, gjobj2.hourly.data[20].temperature],
        [21, gjobj2.hourly.data[21].temperature],
        [22, gjobj2.hourly.data[22].temperature],
        [23, gjobj2.hourly.data[23].temperature]

      	]);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Temperature',
          textPosition: 'none'
        },
        backgroundColor: '#ffffff',
        series:{
        	0: {color: '#9dd1db'},
        },
      };

      var chart = new google.visualization.LineChart(document.getElementById('dhwcard'));
      chart.draw(data, options);
    }
}
</script>
</html>
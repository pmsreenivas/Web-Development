import { Component, OnInit,  ViewEncapsulation, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import * as CanvasJS from './canvasjs.min';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

@ViewChild("Current_h_txt", {static: false}) Current_h_txt: ElementRef;
@ViewChild("Current_p_txt", {static: false}) Current_p_txt: ElementRef;
@ViewChild("Current_w_txt", {static: false}) Current_w_txt: ElementRef;
@ViewChild("Current_v_txt", {static: false}) Current_v_txt: ElementRef;
@ViewChild("Current_c_txt", {static: false}) Current_c_txt: ElementRef;
@ViewChild("Current_o_txt", {static: false}) Current_o_txt: ElementRef;
@ViewChild("Current_City", {static: false}) Current_City: ElementRef;
@ViewChild("Current_TZ", {static: false}) Current_TZ: ElementRef;
@ViewChild("Current_Sum", {static: false}) Current_Sum: ElementRef;
@ViewChild("Current_Tmp", {static: false}) Current_Tmp: ElementRef;
@ViewChild("searchBtn", {static: false}) searchBtn: ElementRef;
@ViewChild("Current_SS", {static: false}) Current_SS: ElementRef;
@ViewChild("results_container", {static: false}) results_container: ElementRef;
@ViewChild("cit", {static: false}) fcity: ElementRef;
@ViewChild("str", {static: false}) fstreet: ElementRef;
@ViewChild("sta", {static: false}) fstate: ElementRef;
@ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
@ViewChild("tchartc", {static: false}) tchartc: ElementRef;
@ViewChild("pchartc", {static: false}) pchartc: ElementRef;
@ViewChild("hchartc", {static: false}) hchartc: ElementRef;
@ViewChild("ochartc", {static: false}) ochartc: ElementRef;
@ViewChild("vchartc", {static: false}) vchartc: ElementRef;
@ViewChild("wchartc", {static: false}) wchartc: ElementRef;
@ViewChild("CurTab", {static: false}) CurTab: ElementRef;
@ViewChild("HTab", {static: false}) HTab: ElementRef;
@ViewChild("WTab", {static: false}) WTab: ElementRef;
@ViewChild("CurPane", {static: false}) CurPane: ElementRef;
@ViewChild("HPane", {static: false}) HPane: ElementRef;
@ViewChild("WPane", {static: false}) WPane: ElementRef;
@ViewChild("Modal_title", {static: false}) Modal_title: ElementRef;
@ViewChild("Modal_City", {static: false}) Modal_City: ElementRef;
@ViewChild("Modal_Tmp", {static: false}) Modal_Tmp: ElementRef;
@ViewChild("Modal_Sum", {static: false}) Modal_Sum: ElementRef;
@ViewChild("Modal_icon", {static: false}) Modal_icon: ElementRef;
@ViewChild("Modal_P", {static: false}) Modal_P: ElementRef;
@ViewChild("Modal_C", {static: false}) Modal_C: ElementRef;
@ViewChild("Modal_W", {static: false}) Modal_W: ElementRef;
@ViewChild("Modal_H", {static: false}) Modal_H: ElementRef;
@ViewChild("Modal_V", {static: false}) Modal_V: ElementRef;



fstreet2:string
fcity2:string
cl2:boolean
fstate2:string = "Select State"


  ngOnInit(){   

  }


  title = 'angular-test';
  public obtdata_aut 
  public obtdata_srh
  public obtdata_ss
  public obtdata_ll
  public obtdata_llt = []
  public show0:boolean = false;
  public show1:boolean = false;
  public b0:string ="";
  public b1:string ="";
  public b2:string ="Select State";
  public cbx:boolean = false;
   cities:string[] = []
   public lat:number
   public lon:number
   public cbx_city:string = ""
   public cbx_state:string = ""
   public cbx_street:string = ""
   public ssurl:string = ""
   public Ct_TZ:string = ""
   public Ct_Temp:string = ""
   public Ct_Sum:string = ""
   public Ct_h
   public Ct_p
   public Ct_w
   public Ct_v
   public Ct_c
   public Ct_o
   h_t:number[] = []
   h_p:number[] = []
   h_h:number[] = []
   h_o:number[] = []
   h_v:number[] = []
   h_w:number[] = []
   dates:string[] = []
   public hzlChart
   public wkl:boolean = false;
   public Abbreviation
   public invalid:boolean = false;
   twitter_str:string;
   public prbar:boolean = false;
   public nofav:boolean = true;
   public fav:boolean = false;

 

/*-------*/
   
  public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartColors = [
    { backgroundColor: '#9ad1f1' },
  ]

  public TChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Temperature'},
  ];

  public TChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Fahrenheit'
         },
         ticks: {
        stepSize: 5,
        min: 45,
        max: 90
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  };

  public PChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Pressure'},
  ];

  public PChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Millibars'
         },
         ticks: {
        stepSize: 2,
        min: 45,
        max: 90
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  };

  public HChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Humidity'},
  ];

  public HChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: '% Humidity'
         },
         ticks: {
        stepSize: 5,
        min: 45,
        max: 90
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  };

  public OChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Ozone'},
  ];

  public OChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Dobson Units'
         },
         ticks: {
        stepSize: 5,
        min: 45,
        max: 90
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  }

  public VChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Visibility'},
  ];

  public VChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Miles (Maximum 10)'
         },
         ticks: {
        stepSize: 1,
        min: 3,
        max: 12
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  }

  public WChartData = [
    {data: [65, 59, 80, 81, 56, 55, 42, 44, 46, 74, 72, 73, 58, 49, 82, 45, 72, 82, 76, 68, 63, 60, 58, 54, 57, 62], label: 'Wind Speed'},
  ];

  public WChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Miles per Hour'
         },
         ticks: {
        stepSize: 1,
        min: 0,
        max: 12
      }
      }],
      xAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
         }
      }]
   },
   legend: {
         onClick: (e) => e.stopPropagation()
    }
  }
/*------*/

  constructor(private renderer: Renderer2, private myservice: MyserviceService) {}
  

  blurform(x,y){
    if(x == 0){
      this.b0 = y;
      if(y == ""){
        this.show0 = true;
      } else {
        this.show0 = false;
      }
    } else {
      this.b1 = y;
      if(y == ""){
        this.show1 = true;
      } else {
        this.show1 = false;
      }
    }
    this.validate(this.b0, this.b1, this.b2)
  }

  validate(x,y,z){
    this.b0 = x;
    this.b1 = y;
    this.b2 = z;
    if(this.b0 == "" || this.b1 == "" || this.b2 == "Select State" || this.b2 == "") {
     this.renderer.setAttribute(this.searchBtn.nativeElement, "disabled", "");
    } else {
     this.renderer.removeAttribute(this.searchBtn.nativeElement, "disabled");

    }

  }


  boxClick(){
    /*this.fstreet2 = "";*/
    this.b0 = "";
    /*this.fcity2= "";*/
    this.b1 = "";
    /*this.fstate2 = "Select State"*/
    this.b2 = "Select State"
    if(this.cbx){ /*checked to unchecked*/
      this.cbx = false;
      if(this.fstreet2 == "" || this.fcity2 == "" || this.fstate2 == "Select State") {
      this.renderer.setAttribute(this.searchBtn.nativeElement, "disabled", "");
      }
      this.renderer.removeAttribute(this.fstreet.nativeElement, "disabled");
     this.renderer.removeAttribute(this.fcity.nativeElement, "disabled");
     this.renderer.removeAttribute(this.fstate.nativeElement, "disabled");
    } else { /*unchecked to checked*/
      this.cbx = true;
     this.renderer.setAttribute(this.fstreet.nativeElement, "disabled", "");
     this.renderer.setAttribute(this.fcity.nativeElement, "disabled", "");
     this.renderer.setAttribute(this.fstate.nativeElement, "disabled", "");

     this.renderer.removeAttribute(this.searchBtn.nativeElement, "disabled");

      this.show0 = this.show1 = false;

    }

  }

  clearClick(){
    this.fstreet2 = "";
    this.b0 = "";
    this.fcity2= "";
    this.b1 = "";
    this.fstate2 = "Select State"
    this.b2 = "Select State"
    this.show0 = this.show1 = false;
    this.renderer.setAttribute(this.searchBtn.nativeElement, "disabled", "");
    this.renderer.removeAttribute(this.fstreet.nativeElement, "disabled");
     this.renderer.removeAttribute(this.fcity.nativeElement, "disabled");
     this.renderer.removeAttribute(this.fstate.nativeElement, "disabled");
    this.cl2 = false;
    this.cbx = false;
      this.invalid = false;

    /*this.renderer.addClass(this.CurTab.nativeElement, "active");
     this.renderer.removeClass(this.HTab.nativeElement, "active");
     this.renderer.removeClass(this.WTab.nativeElement, "active");
     this.renderer.addClass(this.CurPane.nativeElement, "active");
     this.renderer.removeClass(this.HPane.nativeElement, "active");
     this.renderer.removeClass(this.WPane.nativeElement, "active");*/
     this.renderer.setAttribute(this.results_container.nativeElement, "style", "display: none"); 

  }

  findcities(city){
    this.myservice.getData(0, city, "dummy", "dummy").subscribe((data) => {
     this.obtdata_aut = data
     this.cities = []
     for(var i = 0; i < this.obtdata_aut.predictions.length; i++){
      this.cities.push(this.obtdata_aut.predictions[i].structured_formatting.main_text)
     }
    });
  }

  acpl = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      map(term => term.length <= 0 ? []
        : this.cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) == 0).slice(0, 10))
    )


  searchClick(street, city, state){
  this.renderer.setAttribute(this.results_container.nativeElement, "style", "display: none");
  this.invalid = false;
  this.prbar = true;
  var i:number;
  var min:number = 10000;
  var max:number = -1;
  var q:number;
  var r:number;
  var t:number;
  this.h_t = [];
  this.h_p = [];
  this.h_h = [];
  this.h_o = [];
  this.h_v = [];
  this.h_w = [];
  this.dates = [];
  this.obtdata_llt = [];

  if(!this.cbx){

  switch(state) {
    case "Alabama":
      this.Abbreviation = "AL";
      break;
    case "Alaska":
      this.Abbreviation = "AK";
      break;
    case "Arizona":
      this.Abbreviation = "AZ";
      break;
    case "Arkansas":
      this.Abbreviation = "AR";
      break;  
      case "California":
      this.Abbreviation = "CA";
      break;
      case "Colorado":
      this.Abbreviation = "CO";
      break;
      case "Connecticut":
      this.Abbreviation = "CT";
      break;
      case "Delaware":
      this.Abbreviation = "DE";
      break;
      case "District Of Columbia":
      this.Abbreviation = "DC";
      break;
      case "Florida":
      this.Abbreviation = "FL";
      break;
      case "Georgia":
      this.Abbreviation = "GA";
      break;
      case "Hawaii":
      this.Abbreviation = "HI";
      break;
      case "Idaho":
      this.Abbreviation = "ID";
      break;
      case "Illinois":
      this.Abbreviation = "IL";
      break;
      case "Indiana":
      this.Abbreviation = "IN";
      break;
      case "Iowa":
      this.Abbreviation = "IA";
      break;
      case "Kansas":
      this.Abbreviation = "KS";
      break;
      case "Kentucky":
      this.Abbreviation = "KY";
      break;
      case "Louisiana":
      this.Abbreviation = "LA";
      break;
      case "Maine":
      this.Abbreviation = "ME";
      break;
      case "Maryland":
      this.Abbreviation = "MD";
      break;
      case "Massachusetts":
      this.Abbreviation = "MA";
      break;
      case "Michigan":
      this.Abbreviation = "MI";
      break;
      case "Minnesota":
      this.Abbreviation = "MN";
      break;
      case "Mississippi":
      this.Abbreviation = "MS";
      break;
      case "Missouri":
      this.Abbreviation = "MO";
      break;
      case "Montana":
      this.Abbreviation = "MT";
      break;
      case "Nebraska":
      this.Abbreviation = "NE";
      break;
      case "Nevada":
      this.Abbreviation = "NV";
      break;
      case "New Hampshire":
      this.Abbreviation = "NH";
      break;
      case "New Jersey":
      this.Abbreviation = "NJ";
      break;
      case "New Mexico":
      this.Abbreviation = "NM";
      break;
      case "New York":
      this.Abbreviation = "NY";
      break;
      case "North Carolina":
      this.Abbreviation = "NC";
      break;
      case "North Dakota":
      this.Abbreviation = "ND";
      break;
      case "Ohio":
      this.Abbreviation = "OH";
      break;
      case "Oklahoma":
      this.Abbreviation = "OK";
      break;
      case "Oregon":
      this.Abbreviation = "OR";
      break;
      case "Pennsylvania":
      this.Abbreviation = "PA";
      break;
      case "Rhode Island":
      this.Abbreviation = "RI";
      break;
      case "South Carolina":
      this.Abbreviation = "SC";
      break;
      case "South Dakota":
      this.Abbreviation = "SD";
      break;
       case "Tennessee":
      this.Abbreviation = "TN";
      break;
      case "Texas":
      this.Abbreviation = "TX";
      break;
      case "Utah":
      this.Abbreviation = "UT";
      break;
      case "Vermont":
      this.Abbreviation = "VT";
      break;
      case "Virginia":
      this.Abbreviation = "VA";
      break;
      case "Washington":
      this.Abbreviation = "WA";
      break;
      case "West Virginia":
      this.Abbreviation = "WV";
      break;
      case "Wisconsin":
      this.Abbreviation = "WI";
      break;
      case "Wyoming":
      this.Abbreviation = "WY";
      break;
  }


    this.myservice.getData(1, street, city, this.Abbreviation).subscribe((data) => {
     this.obtdata_srh = data
     if(this.obtdata_srh.status == "ZERO_RESULTS"){
      this.prbar = false;
      this.invalid = true;
      return;
     } else {
      this.invalid = false;
     }
     this.lat = this.obtdata_srh.results[0].geometry.location.lat
     this.lon = this.obtdata_srh.results[0].geometry.location.lng
     this.myservice.getData(3, this.b2, "dummy", "dummy").subscribe((data1) =>{
      this.obtdata_ss = data1
      this.ssurl = this.obtdata_ss.items[0].link;
     this.Current_SS.nativeElement.src = this.ssurl;


     });
     this.myservice.getData(2, this.lat.toString(), this.lon.toString(), "dummy").subscribe((data2) =>{
      this.obtdata_ll = data2
      this.Ct_TZ = this.obtdata_ll.timezone;   
      this.Ct_Temp = Math.ceil(this.obtdata_ll.currently.temperature) + "&#176; F";
      this.Ct_Sum = this.obtdata_ll.currently.summary ;
      this.Ct_h = this.obtdata_ll.currently.humidity;
      this.Ct_p = this.obtdata_ll.currently.pressure;
      this.Ct_w = this.obtdata_ll.currently.windSpeed;
      this.Ct_v = this.obtdata_ll.currently.visibility;
      this.Ct_c = this.obtdata_ll.currently.cloudCover;
      this.Ct_o = this.obtdata_ll.currently.ozone;

      this.twitter_str = "https://twitter.com/intent/tweet?text=The%20current%20temperature%20at%20" + city + "%20is%20" + this.obtdata_ll.currently.temperature.toString()   +"%C2%B0 F" +".%20The%20weather%20conditions%20are%20" + this.obtdata_ll.currently.summary + ".&hashtags=CSCI571WeatherSearch" ;

      for(i = 0; i < 24; i += 1) {
        t = Math.ceil(this.obtdata_ll.hourly.data[i].temperature);
        this.h_t.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
      r = min % 5;
      q = Math.floor(min/5);
      this.TChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = max % 5;
      q = Math.floor(max/5);
      this.TChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.TChartData[0].data = this.h_t;

      
      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = this.obtdata_ll.hourly.data[i].pressure.toPrecision(5)
        this.h_p.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
      r = Math.floor(min) % 2;
      q = Math.floor(Math.floor(min)/2);
      this.PChartOptions.scales.yAxes[0].ticks.min = (q - 1)*2;
      r = Math.floor(max) % 2;
      q = Math.floor(Math.floor(max)/2);
      this.PChartOptions.scales.yAxes[0].ticks.max = (q + 2)*2;
      this.PChartData[0].data = this.h_p;

      
      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].humidity.toPrecision(2))*100
        this.h_h.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
     r = min % 5;
      q = Math.floor(min/5);
      this.HChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = max % 5;
      q = Math.floor(max/5);
      this.HChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.HChartData[0].data = this.h_h;

       max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].ozone.toPrecision(4))
        this.h_o.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
     r = Math.floor(min % 5);
      q = Math.floor(min/5);
      this.OChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = Math.floor(max % 5);
      q = Math.floor(max/5);
      this.OChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.OChartData[0].data = this.h_o;

      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].visibility.toPrecision(4))
        this.h_v.push(t);
        if(t > max) {
         max = t
        }
        if(Math.floor(t) < min) {
        min = t;
        }
      }
    
     r = Math.floor(min) % 1;
      q = Math.floor(min/1);
      this.VChartOptions.scales.yAxes[0].ticks.min = (q - 1)*1;
      this.VChartData[0].data = this.h_v;

      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].windSpeed.toPrecision(4))
        this.h_w.push(t);
        if(Math.floor(t) >= Math.floor(max)) {

         max = t
        }
        if(Math.floor(t) < min) {
        min = t;
        }
      }
    
     r = Math.floor(min) % 1;
      q = Math.floor(max);
      this.WChartOptions.scales.yAxes[0].ticks.max = (q + 2)*1;
      this.WChartData[0].data = this.h_w;



      this.charts.forEach((child) => {
      child.chart.update()
      child.ngOnChanges({});
  });

/* end of hourly*/

  for(i = 0;i < 8; i+=1){
    this.myservice.getData(4, this.lat.toString(), this.lon.toString(), this.obtdata_ll.daily.data[i].time.toString()).subscribe((data3) => {
      this.obtdata_llt.push(data3);
    });

  } 

  for(i = 0; i < 8; i+=1){
  var a = this.obtdata_ll.daily.data[i].time;
      var chr = this.obtdata_ll.timezone.charAt(8);
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
      this.dates.push(date.toString() + '/' + month.toString() + '/' + year.toString())  
} /* 2nd for loop */

this.hzlChart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title: {
    text: "Weekly Weather"
  },
  axisX: {
    title: "Days"
  },
  legend:{
        verticalAlign: "top",
        horizontalAlign: "center"     
      },
  axisY: {
    gridThickness: 0,
    includeZero: false,
    title: "Temperature in Fahrenheit",
    interval: 10,
  }, 
  dataPointWidth: 15,
  data: [{
    type: "rangeBar",
    click: (e) => {
    var i = 0;
    e.dataPoint.x  
   if(e.dataPoint.x == 80) {i = 0 }
   else if(e.dataPoint.x == 70) {i = 1 }
   else if(e.dataPoint.x == 60) {i = 2 }
   else if(e.dataPoint.x == 50) {i = 3 }
   else if(e.dataPoint.x == 40) {i = 4 }
   else if(e.dataPoint.x == 30) {i = 5 }
   else if(e.dataPoint.x == 20) {i = 6 }
   else if(e.dataPoint.x == 10) {i = 7 }
   this.Modal_title.nativeElement.innerHTML = this.dates[i];
   this.Modal_City.nativeElement.innerHTML = this.b1;
   this.Modal_Tmp.nativeElement.innerHTML = Math.ceil(this.obtdata_llt[i].currently.temperature) + "&#176; F";
   this.Modal_Sum.nativeElement.innerHTML = this.obtdata_llt[i].currently.summary
    switch (this.obtdata_llt[i].currently.icon){
        case "clear-day":
        case "clear-night":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
          break;
        case "rain":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
          break;
        case "snow":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
          break;
        case "sleet":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png";
          break;
        case "wind":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/the-weather-is-nice-today-512.png";
          break;
        case "fog":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
          break;
        case "cloudy":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
          break;
        case "partly-cloudy-day":
        case "partly-cloudy-night":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
          break;
      }
      this.Modal_P.nativeElement.innerHTML = "Precipitation: " + this.obtdata_llt[i].currently.precipIntensity.toFixed(2).toString();
      this.Modal_C.nativeElement.innerHTML = "Chance of Rain: " + (Math.ceil(100 * this.obtdata_llt[i].currently.precipProbability)).toString() + " %"
      this.Modal_W.nativeElement.innerHTML = "Wind Speed: " + (Number.parseFloat(this.obtdata_llt[i].currently.windSpeed).toPrecision(2)).toString() + " mph"
      this.Modal_H.nativeElement.innerHTML = "Humidity: " + (Math.ceil(100 * this.obtdata_llt[i].currently.humidity)).toString() + " %"
      this.Modal_V.nativeElement.innerHTML = "Visibility: " + (Number.parseFloat(this.obtdata_llt[i].currently.visibility).toPrecision(2)).toString() + " miles"


   },
    color: "#9ad1f1",
    showInLegend: true,
    yValueFormatString: "#0.#",
    indexLabel: "{y[#index]}",
    legendText: "Day wise temperature range",
    toolTipContent: "<b>{label}</b>: {y[1]} to {y[0]}",
    dataPoints: [
      { x: 80, y:[Math.ceil(this.obtdata_ll.daily.data[0].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[0].temperatureLow)], label: this.dates[0] },
      { x: 70, y:[Math.ceil(this.obtdata_ll.daily.data[1].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[1].temperatureLow)], label: this.dates[1] },
      { x: 60, y:[Math.ceil(this.obtdata_ll.daily.data[2].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[2].temperatureLow)], label: this.dates[2] },
      { x: 50, y:[Math.ceil(this.obtdata_ll.daily.data[3].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[3].temperatureLow)], label: this.dates[3] },
      { x: 40, y:[Math.ceil(this.obtdata_ll.daily.data[4].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[4].temperatureLow)], label: this.dates[4] },
      { x: 30, y:[Math.ceil(this.obtdata_ll.daily.data[5].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[5].temperatureLow)], label: this.dates[5] },
      { x: 20, y:[Math.ceil(this.obtdata_ll.daily.data[6].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[6].temperatureLow)], label: this.dates[6] },
      { x: 10, y:[Math.ceil(this.obtdata_ll.daily.data[7].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[7].temperatureLow)], label: this.dates[7] },
    ]
  }]
});

  
    this.Current_City.nativeElement.innerHTML = this.b1;
    this.Current_TZ.nativeElement.innerHTML = this.Ct_TZ;
    this.Current_Tmp.nativeElement.innerHTML = this.Ct_Temp;
    this.Current_Sum.nativeElement.innerHTML = this.Ct_Sum;
    this.Current_o_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_o).toPrecision(4)).toString();
    this.Current_c_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_c).toPrecision(2)).toString();
    this.Current_v_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_v).toPrecision(4)).toString();
    this.Current_w_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_w).toPrecision(3)).toString();
    this.Current_p_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_p).toPrecision(5)).toString();
    this.Current_h_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_h).toPrecision(2)).toString();

      this.prbar = false;
     this.renderer.setAttribute(this.results_container.nativeElement, "style", "display: block");

     if(this.wkl){
       setTimeout(()=>{    
      this.hzlChart.render();
      }, 500);
     }


     });


    });
  } else {
    this.myservice.getData(5, "dummy", "dummy", "dummy").subscribe((data) => {
     this.obtdata_srh = data
     this.lat = this.obtdata_srh.lat
     this.lon = this.obtdata_srh.lon
     this.cbx_city = this.obtdata_srh.city
     this.cbx_state = this.obtdata_srh.regionName
     this.myservice.getData(3, this.cbx_state, "dummy", "dummy").subscribe((data1) =>{
      this.obtdata_ss = data1
      this.ssurl = this.obtdata_ss.items[0].link;
     this.Current_SS.nativeElement.src = this.ssurl;
     switch(this.cbx_state) {
    case "Alabama":
      this.Abbreviation = "AL";
      break;
    case "Alaska":
      this.Abbreviation = "AK";
      break;
    case "Arizona":
      this.Abbreviation = "AZ";
      break;
    case "Arkansas":
      this.Abbreviation = "AR";
      break;  
      case "California":
      this.Abbreviation = "CA";
      break;
      case "Colorado":
      this.Abbreviation = "CO";
      break;
      case "Connecticut":
      this.Abbreviation = "CT";
      break;
      case "Delaware":
      this.Abbreviation = "DE";
      break;
      case "District Of Columbia":
      this.Abbreviation = "DC";
      break;
      case "Florida":
      this.Abbreviation = "FL";
      break;
      case "Georgia":
      this.Abbreviation = "GA";
      break;
      case "Hawaii":
      this.Abbreviation = "HI";
      break;
      case "Idaho":
      this.Abbreviation = "ID";
      break;
      case "Illinois":
      this.Abbreviation = "IL";
      break;
      case "Indiana":
      this.Abbreviation = "IN";
      break;
      case "Iowa":
      this.Abbreviation = "IA";
      break;
      case "Kansas":
      this.Abbreviation = "KS";
      break;
      case "Kentucky":
      this.Abbreviation = "KY";
      break;
      case "Louisiana":
      this.Abbreviation = "LA";
      break;
      case "Maine":
      this.Abbreviation = "ME";
      break;
      case "Maryland":
      this.Abbreviation = "MD";
      break;
      case "Massachusetts":
      this.Abbreviation = "MA";
      break;
      case "Michigan":
      this.Abbreviation = "MI";
      break;
      case "Minnesota":
      this.Abbreviation = "MN";
      break;
      case "Mississippi":
      this.Abbreviation = "MS";
      break;
      case "Missouri":
      this.Abbreviation = "MO";
      break;
      case "Montana":
      this.Abbreviation = "MT";
      break;
      case "Nebraska":
      this.Abbreviation = "NE";
      break;
      case "Nevada":
      this.Abbreviation = "NV";
      break;
      case "New Hampshire":
      this.Abbreviation = "NH";
      break;
      case "New Jersey":
      this.Abbreviation = "NJ";
      break;
      case "New Mexico":
      this.Abbreviation = "NM";
      break;
      case "New York":
      this.Abbreviation = "NY";
      break;
      case "North Carolina":
      this.Abbreviation = "NC";
      break;
      case "North Dakota":
      this.Abbreviation = "ND";
      break;
      case "Ohio":
      this.Abbreviation = "OH";
      break;
      case "Oklahoma":
      this.Abbreviation = "OK";
      break;
      case "Oregon":
      this.Abbreviation = "OR";
      break;
      case "Pennsylvania":
      this.Abbreviation = "PA";
      break;
      case "Rhode Island":
      this.Abbreviation = "RI";
      break;
      case "South Carolina":
      this.Abbreviation = "SC";
      break;
      case "South Dakota":
      this.Abbreviation = "SD";
      break;
       case "Tennessee":
      this.Abbreviation = "TN";
      break;
      case "Texas":
      this.Abbreviation = "TX";
      break;
      case "Utah":
      this.Abbreviation = "UT";
      break;
      case "Vermont":
      this.Abbreviation = "VT";
      break;
      case "Virginia":
      this.Abbreviation = "VA";
      break;
      case "Washington":
      this.Abbreviation = "WA";
      break;
      case "West Virginia":
      this.Abbreviation = "WV";
      break;
      case "Wisconsin":
      this.Abbreviation = "WI";
      break;
      case "Wyoming":
      this.Abbreviation = "WY";
      break;
  }


     });
     this.myservice.getData(2, this.lat.toString(), this.lon.toString(), "dummy").subscribe((data2) =>{
      this.obtdata_ll = data2
      this.Ct_TZ = this.obtdata_ll.timezone;
      this.Ct_Temp = Math.ceil(this.obtdata_ll.currently.temperature) + "&#176; F";
      this.Ct_Sum = this.obtdata_ll.currently.summary ;
      this.Ct_h = this.obtdata_ll.currently.humidity;
      this.Ct_p = this.obtdata_ll.currently.pressure;
      this.Ct_w = this.obtdata_ll.currently.windSpeed;
      this.Ct_v = this.obtdata_ll.currently.visibility;
      this.Ct_c = this.obtdata_ll.currently.cloudCover;
      this.Ct_o = this.obtdata_ll.currently.ozone;

      this.twitter_str = "https://twitter.com/intent/tweet?text=The%20current%20temperature%20at%20" + this.cbx_city + "%20is%20" + this.obtdata_ll.currently.temperature.toString()   +"%C2%B0 F" +".%20The%20weather%20conditions%20are%20" + this.obtdata_ll.currently.summary + ".&hashtags=CSCI571WeatherSearch" ;


for(i = 0; i < 24; i += 1) {
        t = Math.ceil(this.obtdata_ll.hourly.data[i].temperature);
        this.h_t.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
      r = min % 5;
      q = Math.floor(min/5);
      this.TChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = max % 5;
      q = Math.floor(max/5);
      this.TChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.TChartData[0].data = this.h_t;

      
      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = this.obtdata_ll.hourly.data[i].pressure.toPrecision(5)
        this.h_p.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
      r = Math.floor(min) % 2;
      q = Math.floor(Math.floor(min)/2);
      this.PChartOptions.scales.yAxes[0].ticks.min = (q - 1)*2;
      r = Math.floor(max) % 2;
      q = Math.floor(Math.floor(max)/2);
      this.PChartOptions.scales.yAxes[0].ticks.max = (q + 2)*2;
      this.PChartData[0].data = this.h_p;

      
      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].humidity.toPrecision(2))*100
        this.h_h.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
     r = min % 5;
      q = Math.floor(min/5);
      this.HChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = max % 5;
      q = Math.floor(max/5);
      this.HChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.HChartData[0].data = this.h_h;

       max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].ozone.toPrecision(4))
        this.h_o.push(t);
        if(t > max) {
         max = t
        }
        if(t < min) {
        min = t
        }
      }
     r = Math.floor(min % 5);
      q = Math.floor(min/5);
      this.OChartOptions.scales.yAxes[0].ticks.min = (q - 1)*5;
      r = Math.floor(max % 5);
      q = Math.floor(max/5);
      this.OChartOptions.scales.yAxes[0].ticks.max = (r == 0)?((q + 1)*5):((q + 2)*5);
      this.OChartData[0].data = this.h_o;

      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].visibility.toPrecision(4))
        this.h_v.push(t);
        if(t > max) {
         max = t
        }
        if(Math.floor(t) < min) {
        min = t;
        }
      }
    
     r = Math.floor(min) % 1;
      q = Math.floor(min/1);
      this.VChartOptions.scales.yAxes[0].ticks.min = (q - 1)*1;
      this.VChartData[0].data = this.h_v;

      max = -1;
      min = 10000;

      for(i = 0; i < 24; i += 1) {
        t = (this.obtdata_ll.hourly.data[i].windSpeed.toPrecision(4))
        this.h_w.push(t);
        if(Math.floor(t) >= Math.floor(max)) {
         max = t
        }
        if(Math.floor(t) < min) {
        min = t;
        }
      }
    
     r = Math.floor(min) % 1;
      q = Math.floor(max);
      this.WChartOptions.scales.yAxes[0].ticks.max = (q + 2)*1;
      this.WChartData[0].data = this.h_w;



      this.charts.forEach((child) => {
      child.chart.update()
      child.ngOnChanges({});
  });

/* end of hourly*/

for(i = 0;i < 8; i+=1){
    this.myservice.getData(4, this.lat.toString(), this.lon.toString(), this.obtdata_ll.daily.data[i].time.toString()).subscribe((data3) => {
      this.obtdata_llt.push(data3);
    });

  } /*for loop*/

  for(i = 0; i < 8; i+=1){
  var a = this.obtdata_ll.daily.data[i].time;
      var chr = this.obtdata_ll.timezone.charAt(8);
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
      this.dates.push(date.toString() + '/' + month.toString() + '/' + year.toString())  
} /* 2nd for loop */

this.hzlChart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  title: {
    text: "Weekly Weather"
  },
  axisX: {
    title: "Days"
  },
  legend:{
        verticalAlign: "top",
        horizontalAlign: "center"     
      },
  axisY: {
    gridThickness: 0,
    includeZero: false,
    title: "Temperature in Fahrenheit",
    interval: 10,
  }, 
  dataPointWidth: 15,
  data: [{
    type: "rangeBar",
     click: (e) => {
    var i = 0;
    e.dataPoint.x  
   if(e.dataPoint.x == 80) {i = 0 }
   else if(e.dataPoint.x == 70) {i = 1 }
   else if(e.dataPoint.x == 60) {i = 2 }
   else if(e.dataPoint.x == 50) {i = 3 }
   else if(e.dataPoint.x == 40) {i = 4 }
   else if(e.dataPoint.x == 30) {i = 5 }
   else if(e.dataPoint.x == 20) {i = 6 }
   else if(e.dataPoint.x == 10) {i = 7 }
   this.Modal_title.nativeElement.innerHTML = this.dates[i];
   this.Modal_City.nativeElement.innerHTML = this.cbx_city;
   this.Modal_Tmp.nativeElement.innerHTML = Math.ceil(this.obtdata_llt[i].currently.temperature) + "&#176; F";
   this.Modal_Sum.nativeElement.innerHTML = this.obtdata_llt[i].currently.summary
    switch (this.obtdata_llt[i].currently.icon){
        case "clear-day":
        case "clear-night":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
          break;
        case "rain":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
          break;
        case "snow":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
          break;
        case "sleet":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png";
          break;
        case "wind":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/the-weather-is-nice-today-512.png";
          break;
        case "fog":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
          break;
        case "cloudy":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
          break;
        case "partly-cloudy-day":
        case "partly-cloudy-night":
          this.Modal_icon.nativeElement.src = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
          break;
      }
      this.Modal_P.nativeElement.innerHTML = "Precipitation: " + this.obtdata_llt[i].currently.precipIntensity.toFixed(2).toString();
      this.Modal_C.nativeElement.innerHTML = "Chance of Rain: " + (Math.ceil(100 * this.obtdata_llt[i].currently.precipProbability)).toString() + " %"
      this.Modal_W.nativeElement.innerHTML = "Wind Speed: " + (Number.parseFloat(this.obtdata_llt[i].currently.windSpeed).toPrecision(2)).toString() + " mph"
      this.Modal_H.nativeElement.innerHTML = "Humidity: " + (Math.ceil(100 * this.obtdata_llt[i].currently.humidity)).toString() + " %"
      this.Modal_V.nativeElement.innerHTML = "Visibility: " + (Number.parseFloat(this.obtdata_llt[i].currently.visibility).toPrecision(2)).toString() + " miles"


   },
    color: "#9ad1f1",
    showInLegend: true,
    yValueFormatString: "#0.#",
    indexLabel: "{y[#index]}",
    legendText: "Day wise temperature range",
    toolTipContent: "<b>{label}</b>: {y[1]} to {y[0]}",
    dataPoints: [
      { x: 80, y:[Math.ceil(this.obtdata_ll.daily.data[0].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[0].temperatureLow)], label: this.dates[0] },
      { x: 70, y:[Math.ceil(this.obtdata_ll.daily.data[1].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[1].temperatureLow)], label: this.dates[1] },
      { x: 60, y:[Math.ceil(this.obtdata_ll.daily.data[2].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[2].temperatureLow)], label: this.dates[2] },
      { x: 50, y:[Math.ceil(this.obtdata_ll.daily.data[3].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[3].temperatureLow)], label: this.dates[3] },
      { x: 40, y:[Math.ceil(this.obtdata_ll.daily.data[4].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[4].temperatureLow)], label: this.dates[4] },
      { x: 30, y:[Math.ceil(this.obtdata_ll.daily.data[5].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[5].temperatureLow)], label: this.dates[5] },
      { x: 20, y:[Math.ceil(this.obtdata_ll.daily.data[6].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[6].temperatureLow)], label: this.dates[6] },
      { x: 10, y:[Math.ceil(this.obtdata_ll.daily.data[7].temperatureHigh), Math.ceil(this.obtdata_ll.daily.data[7].temperatureLow)], label: this.dates[7] },
    ]
  }]
});

    this.Current_City.nativeElement.innerHTML = this.cbx_city;
    this.Current_TZ.nativeElement.innerHTML = this.Ct_TZ;
    this.Current_Tmp.nativeElement.innerHTML = this.Ct_Temp;
    this.Current_Sum.nativeElement.innerHTML = this.Ct_Sum;
    this.Current_o_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_o).toPrecision(4)).toString();
    this.Current_c_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_c).toPrecision(2)).toString();
    this.Current_v_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_v).toPrecision(4)).toString();
    this.Current_w_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_w).toPrecision(3)).toString();
    this.Current_p_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_p).toPrecision(5)).toString();
    this.Current_h_txt.nativeElement.innerHTML = (Number.parseFloat(this.Ct_h).toPrecision(2)).toString();
      this.prbar = false;

     this.renderer.setAttribute(this.results_container.nativeElement, "style", "display: block");

     if(this.wkl){
       setTimeout(()=>{    
      this.hzlChart.render();
      }, 500);
     }

     });


    });
  }


  }

  graphChange(x){
    if(x == "Temperature"){
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: block");

    } else if (x == "Pressure"){
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: block");

    } else if (x == "Humidity"){
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: block");

    } else if (x == "Ozone"){
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: block");

    } else if (x == "Visibility"){
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: block");

    } else if (x == "Wind Speed"){
     this.renderer.setAttribute(this.tchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.pchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.hchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.ochartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.vchartc.nativeElement, "style", "display: none");
     this.renderer.setAttribute(this.wchartc.nativeElement, "style", "display: block");

    }

  }

  weekl(){

   setTimeout(()=>{    
      this.hzlChart.render();
      }, 500);
      this.wkl = true;

  }

  curren(){
    this.wkl = false;
  }

  hourl(){
    this.wkl = false;
  }

  star(){
   this.nofav = !this.nofav
   this.fav = !this.fav
  }


} /*main close */



  


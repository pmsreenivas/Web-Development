import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
   providedIn: 'root'
})
export class MyserviceService {
   private finaldata = [];
   private apiurl0 = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/auto?str=";
   private apiurl1 = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/formvals?street="
   private apiurl2 = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/darksky?lat=";
   private apiurl3 = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/seal?state=";
   private apiurl4 = "http://csci571pms2-nodejs.us-west-1.elasticbeanstalk.com/darksky2?lat=";
   private apiurl5 = "http://ip-api.com/json"

   constructor(private http: HttpClient) { }
   getData(no:number, v1:string, v2:string, v3:string) {
      var aurl:string;
   	if(no == 0){
         aurl = this.apiurl0 + v1;
         return this.http.get(aurl);
   	} else if(no == 1){
         aurl = this.apiurl1 + v1 + "&city=" + v2 + "&state=" + v3;
         return this.http.get(aurl);
   	} else if(no == 2){
      aurl = this.apiurl2 + v1 + "&lon=" + v2;
      return this.http.get(aurl);
   	} else if(no == 3){
      aurl = this.apiurl3 + v1;
      return this.http.get(aurl);
   	} else if(no == 4){
      aurl = this.apiurl4 + v1 + "&lon=" + v2 + "&time=" + v3;
      return this.http.get(aurl);
   	} else if(no == 5){
         aurl = this.apiurl5
         return this.http.get(aurl);
         
      }
   }
}








import {Page} from 'ionic/ionic';
import {Http} from 'angular2/http';

var posts;

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  constructor(public http: Http) {
  	var othis = this;
  	http.get("http://api.vk.com/method/wall.get?domain=itclub_psuti&count=20&filter=all")
    .subscribe(
      function(data){ console.log(data); othis.response = data._body;},
      function(err) {console.log(err)},
		function () { return console.log('Random Quote Complete'); }
    );

  	 //posts = VK.callMethod('wall.get',{'domain': 'itclub_psuti','count': 20,'filter':'all'});
  }
}

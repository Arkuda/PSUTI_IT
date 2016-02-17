import {Page} from 'ionic/ionic';


@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  constructor() {
    var othis = this;
    var fb = new Firebase("https://psuti-it.firebaseio.com");
    fb.child("courses").on("value", function(data) {
      othis.courses = data.val();
    });

  }

}

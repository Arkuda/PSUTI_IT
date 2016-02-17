import {Page, Alert} from 'ionic/ionic';


if(localStorage.getItem('isLoged') == undefined || localStorage.getItem('isLoged') == 'undefined') {
    localStorage.setItem('isLoged', false);
}
var isLoged = localStorage.getItem('isLoged');

var othis;


@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {

    constructor() {
    this.isLoged = isLoged;
      othis = this;
    }

    login(email,password){
        isLoged = true;
        localStorage.setItem('isLoged',true);
        var ref = new Firebase("https://psuti-it.firebaseio.com");
        ///https://www.firebase.com/docs/web/api/firebase/authwithpassword.html
        ref.authWithPassword({
  			"email": email,
  			"password": password
		}, function(error, authData) {
  			if (error) {
    			alert('Логин или пасс не верен!');
  			} else {
  				othis.isLoged = true;
        		othis.registration = false;
  				alert('Добро пожаловать');
    			console.log("Authenticated successfully with payload:", authData);
    			localStorage.setItem('user',JSON.stringify(authData));
  			}
	});
    }
    logout(){
        isLoged = false;
        localStorage.setItem('isLoged',false);
        othis.isLoged = false;
        othis.registration = false;
    }
    showReg(){
    	othis.isLoged =false;
    	othis.registration =true;
    }
    reg(email,password,fio){
    	//:TODO Chack input variables 
    	//https://www.firebase.com/docs/web/api/firebase/createuser.html
    	var ref = new Firebase("https://psuti-it.firebaseio.com");
		ref.createUser({
  			email: email,
  			password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        break;
		      default:
		        console.log("Error creating user:", error);
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);

		    ref.child('user').child(email.split('@')[0]).set({ 'user_id': userData.uid, 'email': email, 'fio': fio , 'courses':''});
		    alert('Добро пожаловать ' + fio + ' !');
		    othis.isLoged = true;
		    othis.registration = false;
		    localStorage.setItem('isLoged', true);
		    localStorage.setItem('user', JSON.stringify(userData));
		// Same effect as the previous example, but we've combined the push() and the set().
		  }
		});

    }
}

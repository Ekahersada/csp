(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNdR2xIKyP5jv8rITlJv902fGmnbeTvFU",
    authDomain: "chating-57283.firebaseapp.com",
    databaseURL: "https://chating-57283.firebaseio.com",
    storageBucket: "chating-57283.appspot.com",
    messagingSenderId: "209110199902"
  };
  firebase.initializeApp(config);

  var db = firebase.database();


  //Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');


  //get element
   // const preObject = document.getElementById('object');

    const list = document.getElementById('user');

 
    const dba = firebase.database().ref().child('users/data/');




   var keys = firebase.database().ref('users/data');
    //sync List chanche
    
dba.on ('value', snap => {
    
  

    });

    dba.on('child_added', snap => {
    

        const view = document.createElement('li');
        view.innerText =snap.key, snap.val();
        view.id = snap.key;
        list.appendChild(view);

    });

    dba.on('child_changed', snap => {

      const viewChanged = document.getElementById(snap.key);    
          viewChanged.innerText = snap.val();
    });

    dba.on('child_removed', snap => {

      const viewRemoved = document.getElementById(snap.key);    
          viewRemoved.remove();
    });


  //add Login event
  btnLogin.addEventListener('click', e => {
    //Get Email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });


    //Add Register Event
    btnSignUp.addEventListener('click', e => {
    //Get Email and pass

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    
    promise.catch(e => console.log(e.message));
  });

 
    //logout event
    btnLogout.addEventListener('click', e => {

     var user = firebase.auth().currentUser.uid;
     

      firebase.auth().signOut().then (function(){
       
        db.ref('users/data/'+user).update({ status : 'of' });

      });
       

    });

    // Add A realtime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        btnSignUp.classList.add('hide');
        btnLogin.classList.add('hide');
      var cek = db.ref().child('users');
      var email = firebase.auth().currentUser.email;
      db.ref('users/data/'+ firebaseUser.uid).update({ status : 'on', email });




       
      } else {

        console.log('not logged in');
        btnLogout.classList.add('hide');
        btnSignUp.classList.remove('hide');
        btnLogin.classList.remove('hide');


      }
    });



}());

var express = require('express');
var router = express.Router();
const user = require('../models/subs');
const { check, validationResult } = require('express-validator');
router.get('/', function(req, res, next) {
  res.redirect('/index');

});

/* GET home page. */
router.get('/index', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.get('/faq', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('faq');
});

// router.get('/views', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.render('views');
// });




router.get('/views', function(req, res, next){

  user.find({}, function(err, datalist){
      if(err) throw err
      res.render('views',{datalist: datalist} );

  });
  

});

router.delete('/views/atep', (req, res) => {
        console.log('accesing atep');

  user.findOneAndDelete({name: 'atep'}), (err, doc) => {

    if (!err){
      console.log('eror while deleting');
      res.send('atep deleted');
            // res.redirect('/views');
    }
    else{
      console.log('eror while deleting' + err);
      res.sendStatus(404);
    }
  }
})








validate = [
  check('email').isEmail(),
  check('name').isLength({min: 6}),
  check('password').isLength({ min: 5 })
];





router.post('/index', validate, (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userinit = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    
  })
  // return res.status(400).send('email already exists');


    // use `findOne` rather than `find`
    user.findOne({ 
     'email':req.body.email }, function(err, emailexist) {
       // hanlde err..
       if (emailexist) {
         // user exists 
        //  console.log(emailexist);
          console.log('email already exist');

         res.redirect('/faq');
       } else {
         // user does not exist
         const saveduser = userinit.save();

         res.redirect('/views');
       }
    })







  // const emailexist = user.findOne({email: req.body.email});
  // if(emailexist){
  //   // console.log('email already exist');
  //   console.log(emailexist);
  //   res.redirect('/faq');

  // }else{
  //   const saveduser = userinit.save();

  //   res.redirect('/views');

  // }

 

});

module.exports = router;

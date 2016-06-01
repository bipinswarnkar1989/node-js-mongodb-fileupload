var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//model
//=============================================================================
var User = require('../models/users');

router.use(function(req,res,next){
	console.log('Something is happenning');
	next();//make sure we go to the next routes and dont stop there
});

router.get('/',function(req,res){
	res.json({ message:'welcome to routing rest apie'});
});

router.post('/users',function(req,res){
	var newUser = new User();//create a new instance of the user model
	newUser.name = req.body.name;
	
    //save the user and check for error
	newUser.save(function(err){
		if(err)
			res.send(err);
		
		res.json({message:'User added successfully'});
		console.log(req.body.name);
	});
	
});

router.get('/users',function(req,res){
	User.find(function(err,users){
		if(err)
			res.send(err);
		
		res.json(users);
	});
});

router.get('/users/:id',function(req,res){
	User.findById(req.params.id,function(err,user){
		if(err)
			res.send(err);
		
		res.json(user);
	});
});

router.put('/users/:id',function(req,res){
	User.findById(req.params.id,function(err,user){
		if(err)
			res.send(err);
		
		user.name = req.body.name;//update the user name
		
		//save the user after change
		user.save(function(err){
			if(err)
				res.send(err);
			
			res.json(user);
		});
	});
});

router.delete('/users/:id',function(req,res){
	User.remove({'_id':req.params.id},function(err){
		if(err)
			res.end(err);
		
		res.json({ message:'User Successfully Deleted' });
	});
});

module.exports = router;
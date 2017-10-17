var friendData = require("../data/friends.js");
var path = require("path");

var totalDifference = 0;

module.exports = function(app){
	app.get('/api/friends', function(req,res){
		res.json(friendData);
	});

	app.post('/api/friends', function(req,res){
		
		var userData = req.body;
		var userName = req.name;
		var userImage = userData.image;
		var userScores = userData.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

		//looping through friends array to get scores
		for(var i = 0; i<friendData.length; i++){
			var diff = 0;
			//loop through friends score and user score to calculate totalDifference
			for(var j=0; j<userScores.length; j++){
				diff += Math.abs(parseInt(friendData[i].scores[j])-parseInt(userScores[j]));
				if(diff < totalDifference){
					totalDifference= diff;
					matchName = friendData[i].name;
					matchImage = friendData[i].photo;
					
				}
			}
		}
		friendData.push(userData);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};
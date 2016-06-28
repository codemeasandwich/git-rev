var exec = require('child_process').exec

function _command (cmd, cb) {
  exec(cmd, { cwd: __dirname }, function (err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

function gitInfo(command, parcer){
    return new Promise(function(resolve, reject) {
         _command(command,
           function(val){  resolve((parcer)?parcer(val):val)  })
    });
}

function refrashRepo(branchName) {
    return new Promise(function(resolve, reject) {
         _command("git fetch origin "+branchName,
           function(val){  resolve(branchName)  })
    });
}

var GitRev = { 
    isUpdateToDate : function () {
      
var branchName, localHash
      
      return GitRev
      .branch()
      .then(refrashRepo)
      .then(function(branch){
        branchName = branch;
        return GitRev.long()
      })
      .then(function(hash){
        localHash = hash
        return gitInfo('git rev-parse origin/prod');
      })
      .then(function(remoteHash){
        // console.log("branchName",branchName);
        // console.log("localHash",localHash);
        // console.log("remoteHash",remoteHash);
        return localHash === remoteHash
      })
      .catch(function(err){
          throw err      
      })
      
    },
    short : function () {
      return gitInfo('git rev-parse --short HEAD');
    }
  , long : function () { 
      return gitInfo('git rev-parse HEAD');
    }
  , branch : function () { 
      return gitInfo('git rev-parse --abbrev-ref HEAD');
    }
  , tag : function () { 
      return gitInfo('git describe --always --tag --abbrev=0');
    }
  , log : function () { 
      return gitInfo('git log --no-color --pretty=format:\'[ "%H", "%s", "%cr", "%an" ],\' --abbrev-commit',function (str) {
        str = str.substr(0, str.length-1)
        return JSON.parse('[' + str + ']')
      });
    
    }
}

module.exports = GitRev;

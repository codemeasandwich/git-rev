var exec = require('child_process').exec


function compare(a, b) {
// http://stackoverflow.com/a/6832706/1223585

    if (a === b) {
       return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
}

function gitInfo(command, parcer,raw){
    return new Promise(function(resolve, reject) {
      exec(command, { cwd: __dirname }, function (err, stdout, stderr) {
        var output = (raw) ? stdout : stdout.split('\n').join('').trim();
        resolve((parcer)?parcer(output):output)
      })
    });
}

function refrashRepo(branchName) {
    return new Promise(function(resolve, reject) {
         gitInfo("git fetch origin "+branchName,
           function(val){  resolve(branchName)  })
    });
}

var GitRev = {
    
    // BY: https://github.com/codemeasandwich
    isUpdateToDate : function () {
      
      var branchName, localHash;
      
      return GitRev
      .branch()
      .then(refrashRepo)
      .then(function(branch){
        branchName = branch;
        return GitRev.long();
      })
      .then(function(hash){
        localHash = hash
        return gitInfo('git rev-parse origin/'+branchName);
      })
      .then(function(remoteHash){
        return localHash === remoteHash
      })
      .catch(function(err){
          throw err      
      })
    },
    // BY: https://github.com/tblobaum
    short : function (parcer) {
      return gitInfo('git rev-parse --short HEAD',parcer);
    },
    // BY: https://github.com/rkr-io
    message : function (parcer) { 
      return gitInfo('git log -1 --pretty=%B',parcer);
    },
    // BY: https://github.com/blaffoy
    date : function (parcer) { 
      return gitInfo('git show -s --format=%ci',parcer);
    }
    // BY: https://github.com/tblobaum
  , long : function (parcer) { 
      return gitInfo('git rev-parse HEAD',parcer);
    }
    // BY: https://github.com/tblobaum
  , branch : function (parcer) { 
      return gitInfo('git rev-parse --abbrev-ref HEAD',parcer);
    }
    // BY: https://github.com/codemeasandwich
  , tags : function (parcer) {
      return gitInfo('git tag', function (tags) {
                    var tag = tags.split(/\r?\n/)
                                  .map(function(tag){
                                    return ('v' === tag[0] || 'V' === tag[0]) ? tag.slice(1) : tag
                                   })
                                  .filter(function(tag){
                                    return !! tag
                                   })
                                  .sort(compare);
                     return (parcer) ? parcer(tag) : tag
                  },true);
    }
    // BY: https://github.com/codemeasandwich
  , tag : function (parcer) {
      return GitRev.tags(function (tags) {
                     return (parcer) ? parcer(tags.pop()) : tags.pop()
                  });
    }
    // BY: https://github.com/tblobaum
    // v2 https://github.com/marcoceppi
    // v3 https://github.com/codemeasandwich
  , log : function (parcer) {
      parcer = parcer || function (str) {
        str = str.split("¹").map(function(row){
            return row.split("°");
        });
        str.pop();
        return JSON.stringify(str)
      }
      return gitInfo('git log --no-color --pretty=format:\'%H°%s°%cr°%an¹\' --abbrev-commit',parcer);
    
    }
    // BY: https://github.com/neenhouse
   , count : function(parcer){ 
    return gitInfo('git rev-list HEAD --count',parcer);
  }
}

module.exports = GitRev;

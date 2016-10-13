var git = require('../')

git.short().then(console.log)
  // => aefdd94
  
git.long().then(console.log)
  // => aefdd946ea65c88f8aa003e46474d57ed5b291d1

git.branch().then(console.log)
  // => master

git.count().then(console.log)
  // => 13

git.tag().then(console.log)
  // => 0.1.0
  
git.tags().then(console.log)
  // => ['0.0.1','0.0.2','0.1.0','0.1.1']
  
git.message().then(console.log)
  // => Add commit-message command
  
git.date().then(console.log)
  // => 2015-08-18 17:15: 48 +0100

//git.log().then(console.log).catch(console.error)
  //[[
  //  "83d9628821fb3fa83a0540d329051a862d0b7e01",
  //  "Remove code dump from readme + added missing function call info",
  //  "7 hours ago",
  //  "brian"
  //],[
  //  "9309bff7ad5f8fc8e1a9dcdac84d43d0cdff426b",
  //  "Add commit-message command + you can now pass in a string parsing function",
  //  "7 hours ago",
  //  "brian"
  //],[
  //  "1b69da352c8dc3efec347d8be0e80cc849302fd7",
  //  "Adds `date` promise to return date of commit",
  //  "7 hours ago",
  //  "brian"
  //]]
  
git.isUpdateToDate().then(console.log);

  // => true ... false
var git = require('../')

git.short().then(console.log)
  // => aefdd94
  
git.long().then(console.log)
  // => aefdd946ea65c88f8aa003e46474d57ed5b291d1

git.branch().then(console.log)
  // => master


git.tag().then(console.log)
  // => 0.1.0

//git.log().then(console.log).catch(console.error)
  // [ [ 'aefdd946ea65c88f8aa003e46474d57ed5b291d1',
  //     'add description',
  //     '7 hours ago',
  //     'Thomas Blobaum' ],
  //   [ '1eb9a6c8633a5a47a47487f17b17ae545d0e26a8',
  //     'first',
  //     '7 hours ago',
  //     'Thomas Blobaum' ],
  //   [ '7f85b750b908d28bfeb13ad6dba47d9d604508f9',
  //     'first commit',
  //     '2 days ago',
  //     'Thomas Blobaum' ] ]
  
git.isUpdateToDate().then(console.log);

  // => true ... false
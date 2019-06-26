# git-rev + promises

[![npm version](https://badge.fury.io/js/git-rev-promises.svg)](https://badge.fury.io/js/git-rev-promises)
[![Buy me a coffee](https://img.shields.io/badge/buy%20me-a%20coffee-orange.svg)](https://www.buymeacoffee.com/codemeasandwich)

access git revision state in node with promises

### If this was helpful, [★ it on github](https://github.com/codemeasandwich/git-rev-promises)

# Install

`npm install git-rev-promises`

# Example

## run sample

``` bash
node example/simple.js
```

# Methods

``` js
var git = require('git-rev-promises')
```

## .short()
return the short commit hash

## .long()
return the long commit hash

## .tag()
return the current tag

## .tags()
return all the tags sorted

## .branch()
return the current branch

## .origin()
return the url for origin

## .repo()
return the name of the repository as defined on the origin.

## .message()
return the last commit message on this branch

## .date()
return the date of the last commit

## .isUpdateToDate()
return where or not you are on the SAME commit as origin

## .count()
return the commit count

## .log()
return the git log of `process.cwd()` as an array

``` js
git.log().then(console.log).catch(console.error)
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

```

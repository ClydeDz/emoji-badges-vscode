const assert = require('assert'); 
const fs = require('fs');

describe('JSON snippets test', function () {
  console.log("[test]", this.title);
  var allSnippets;

  before(function () {
    var packageJSON = require('./../package.json');
    var packageJSONContents = JSON.parse(JSON.stringify(packageJSON));
    allSnippets = packageJSONContents.contributes.snippets;
  });

  it('check if JSON snippet file is named after the language identifier', function () {
    console.log("  ", "[test]", this.test.title);
    for (var theme = 0; theme < allSnippets.length; theme++) {
      var filename = (allSnippets[theme].path.substring(allSnippets[theme].path.lastIndexOf('/') + 1).replace(".json",""));
      var language = allSnippets[theme].language; 
      console.log("\t", "[log]", "checking file:", filename, "✔️");
      var isFilenameEqualToLanguageId = filename == language; 
      assert.equal(isFilenameEqualToLanguageId, true, "JSON snippet file must be named after the language identifier");
    }
  });

  it('check if all JSON snippet files exist', function () {
    console.log("  ", "[test]", this.test.title);
    for (var theme = 0; theme < allSnippets.length; theme++) {
      var checkPath = null;
      var filename = allSnippets[theme].path.substring(allSnippets[theme].path.lastIndexOf('/') + 1);

      try {
        console.log("\t", "[log]", "checking file:", filename, "✔️");
        checkPath = fs.readFileSync(require.resolve("./../snippets/" + filename), "utf8");
      }
      catch {
        checkPath = '';
        console.log("\t", "[log]", "error while checking file:", filename, "❌");
      }
      assert.equal(checkPath.length > 0, true, "file must exist and must contain content");
    }
  });

  it('check if each snippets prefix is unique', function () {
    console.log("  ", "[test]", this.test.title);
    var prefixList = []; 

    for (var si = 0; si < allSnippets.length; si++) { 
      var filename = allSnippets[si].path.substring(allSnippets[si].path.lastIndexOf('/') + 1);
      try { 
        console.log("\t", "[log]", "reading file:", filename, "👀");
        var languageJSON = parseSnippetFile("./../snippets/" + filename);
        prefixList = addPrefixKeysToList(languageJSON, prefixList);  
      }
      catch { 
        console.log("\t", "[log]", "error while reading file:", filename, "❌");
      } 
    } 

    // Check for duplicates and log duplicate prefixes
    var duplicateKeysFound = false;
    prefixList.sort();
    for (var i = 0; i < prefixList.length; i++) {
      if (prefixList[i + 1] == undefined || prefixList[i] != prefixList[i + 1]) {
        continue;
      }
      duplicateKeysFound = true;
      console.log("\t", "[log]", prefixList[i], "is a duplicate key:", "❌");
    } 

    assert.equal(duplicateKeysFound, false, "should not contain duplicate keys");
  });

});


//___________________________Test helper methods_______________________________________

function parseSnippetFile(snippetFile){
  var snippetFile = fs.readFileSync(require.resolve(snippetFile), "utf8"); 
  var snippetJSON = JSON.parse(snippetFile);
  return snippetJSON;
}

function addPrefixKeysToList(snippetJSON, prefixList){
  for (var ki = 0; ki < Object.keys(snippetJSON).length; ki++) {
    var key = Object.keys(snippetJSON)[ki];  
    prefixList.push(snippetJSON[key].prefix);
  }
  return prefixList;
}



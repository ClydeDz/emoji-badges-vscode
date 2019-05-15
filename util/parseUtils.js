const fs = require('fs');

/**
 * Reads a snippet file and returns a JSON result of the same.
 * @param {string} snippetFile The snippet file
 */
exports.parseSnippetFile = function (snippetFile) {
	var snippetFile = fs.readFileSync(require.resolve(snippetFile), "utf8"); 
	var snippetJSON = JSON.parse(snippetFile);
	return snippetJSON;
}; 

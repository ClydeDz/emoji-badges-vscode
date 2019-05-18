/**
 * Generates a dynamically populated list of all emoji badges
 * Run this file from the command line root folder: node .\util\dynamic.js
 */

const fs = require('fs');
const parser = require('./parseUtils');

function writeBadgesToFile(){
	var markdownContent = getMarkdownContent('./../snippets/markdown.json');
	writeDataToFile("list-of-badges.md", markdownContent);
}

function getMarkdownContent(markdownFile){
	var data = "# List of badges\n\n";
	var languageJSON = parser.parseSnippetFile(markdownFile);

	data += "Here is the complete list of **" + Object.keys(languageJSON).length + "** emoji badges.\n\n";
	data += "| Badge | Prefix |\n";
	data += "|----|----|\n"; 

	var sortedKeys =  Object.keys(languageJSON).sort();
	for (var ki = 0; ki < sortedKeys.length; ki++) {
		var key = sortedKeys[ki];
		data += "|" + cleanBuiltInVariables(languageJSON[key].body) + "| `" + languageJSON[key].prefix + "` |\n";
	}
	
	data += "\n\n";
	data += "**Note:** `Prefix` defines how this snippet is selected from IntelliSense and tab completion.";
	return data;
}

function writeDataToFile(file, data){
	fs.writeFile(file, data, function (err) {		
		if (err) {
			console.log("An error occured while writing contents to a file.");
			console.log(err);
		}
		console.log("File is created successfully.");
	});	
}

function cleanBuiltInVariables(body){
	body = body.toString();
	if(body.indexOf("$CURRENT_YEAR") > 0){
		var dt = new Date(); 
		body = body.replace("$CURRENT_YEAR", dt.getFullYear());
	}
	return body;
}
	
// Starts here
writeBadgesToFile();

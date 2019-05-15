/**
 * Generates a dynamically populated list of all emoji badges
 * Run this file from the command line root folder: node .\util\dynamic.js
 */

const fs = require('fs');
const parser = require('./parseUtils');

function writeBadgesToFile(){
	var markdownContent = getMarkdownContent();
	writeDataToFile("list-of-badges.md", markdownContent);
}

function getMarkdownContent(){
	var data = "# List of badges\n\n";
	data += "| Badge | Prefix |\n";
	data += "|---|---|\n"; 

	var languageJSON = parser.parseSnippetFile('./../snippets/markdown.json');
	for (var ki = 0; ki < Object.keys(languageJSON).length; ki++) {
		var key = Object.keys(languageJSON)[ki];   
		data += "|" + languageJSON[key].body + "|" + languageJSON[key].prefix + "|\n";
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
	
// Starts here
writeBadgesToFile();

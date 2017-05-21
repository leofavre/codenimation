import Raffler from "./Raffler";
import Codenimation from "./Codenimation";

let targetNode = document.getElementsByClassName("type-canvas")[0];

let snippets = [
	".type--code::after {\n\tcontent: \"\\00a0\";\n}",
	"function init(id, arr) {\n\trecords[id] = isArray(arr) ? arr : [arr];\n}",
	"<link type=\"text/css\" rel=\"stylesheet\" href=\"index.css\">",
	"<!DOCTYPE html>",
	"let getEventName = isActive => isActive ? \"active\" : \"inactive\";",
	".banner__title {\n\tfont-size: 80px;\n\tz-index: 1;\n}",
	"@keyframes blink {\n\tto {\n\t\tvisibility: hidden;\n\t}\n}",
	"\"use strict\";",
	"let getCurrentTimeStamp = () => +new Date();",
	".menu {\n\tdisplay: flex;\n\tflex-flow: row wrap;\n}",
	"let path = (evt.composedPath && evt.composedPath()) || evt.path;",
	"if (evt.type === \"click\") {\n\ttrigger(\"point\");\n}",
	"<meta charset=\"UTF-8\">",
	"/(?:\w+|\[.*?\])\.indexOf\(.*?\) ?(?:> -1|< 0)/g"
];

let appearances = ["smaller", "smaller", "normal", "normal", "bigger", "bigger"];

let mySnippetRaffler = new Raffler(snippets),
	myAppearanceRaffler = new Raffler(appearances);

let poetic = new Codenimation(targetNode, mySnippetRaffler, myAppearanceRaffler);
poetic.animate(5);

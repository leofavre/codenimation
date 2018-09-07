import Raffler from "./Raffler";
import Codenimation from "./Codenimation";

let targetNode = document.getElementsByClassName("type-canvas")[0];

let snippets = [
	".type--code::after {\n  content: \"\\00a0\";\n}",
	"<link type=\"text/css\" rel=\"stylesheet\" href=\"index.css\">",
	"<!DOCTYPE html>",
	"const getActiveClass = isActive => isActive ? \"active\" : \"inactive\";",
	".banner__title {\n  font-size: 80px;\n  z-index: 1;\n}",
	"@keyframes blink {\n  to {\n    visibility: hidden;\n  }\n}",
	"const getCurrentTimeStamp = () => +new Date();",
	".menu {\n  display: flex;\n  flex-flow: row wrap;\n}",
	"const path = (evt.composedPath && evt.composedPath()) || evt.path;",
	"if (evt.type === \"click\") {\n  trigger(\"point\");\n}",
	"<meta charset=\"UTF-8\">",
	"/(import|export|from)\s'.*?\/node_modules\/((?:@.*\/)?.*?)\/.*?'/g"
];

let appearances = ["smaller", "normal", "normal", "bigger", "bigger"];

let mySnippetRaffler = new Raffler(snippets),
	myAppearanceRaffler = new Raffler(appearances);

let poetic = new Codenimation(targetNode, mySnippetRaffler, myAppearanceRaffler);
poetic.animate(3);

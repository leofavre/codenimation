import modifyBemClass from "canivete/dist/modifyBemClass";
import oneOutOf from "canivete/dist/oneOutOf";
import random from "lodash-es/random";

const CodeWriter = function(domNode, sentence) {
	this.model = setInitialModel(sentence);
	this.node = domNode;

	// private

	function setInitialModel(sentence) {
		return {
			sentence,
			textStart: 0,
			selectionStart: 0,
			selectionEnd: 0,
			textEnd: 0
		};
	}
};

CodeWriter.prototype = (function() {

	// model

	function revealOrHideCharacters(model, number) {
		let textEnd = Math.max(0, Math.min(model.textEnd + number, model.sentence.length));

		return updateModel(model, {
			textEnd,
			selectionStart: textEnd,
			selectionEnd: textEnd
		});
	}

	function moveCursor(model, number) {
		let selectionStart = Math.max(0, Math.min(model.selectionStart + number, model.textEnd));

		return updateModel(model, {
			selectionStart,
			selectionEnd: selectionStart
		});
	}

	function selectCharacters(model, number) {
		let selectionEnd = Math.max(0, Math.min(model.selectionEnd + number, model.textEnd));

		return updateModel(model, {
			selectionEnd
		});
	}

	function updateModel(model, modification) {
		return Object.assign({}, model, modification);
	}

	// getters

	function getBreakIndexBeforeCursor(sentence, selectionEnd) {
		for (let i = selectionEnd - 2; i >= 0; i--) {
			if (isBreakCharacter(sentence[i])) {
				return i + 1;
			}
		}

		return 0;
	}

	function getBreakIndexAfterCursor(sentence, selectionEnd) {
		for (let i = selectionEnd + 1; i <= sentence.length; i++) {
			if (isBreakCharacter(sentence[i])) {
				return i;
			}
		}

		return sentence.length;
	}

	let getTextBeforeSelection = (sentence, textStart, selectionStart, selectionEnd) => sentence.slice(textStart, Math.min(selectionStart, selectionEnd));

	let getTextAfterSelection = (sentence, selectionStart, selectionEnd, textEnd) => sentence.slice(Math.max(selectionStart, selectionEnd), textEnd);

	let getSelectedText = (sentence, selectionStart, selectionEnd) => sentence.slice(Math.min(selectionStart, selectionEnd), Math.max(selectionStart, selectionEnd));

	let getSelectedTextDirection = (selectionStart, selectionEnd) => selectionStart < selectionEnd ? 1 : selectionStart > selectionEnd ? -1 : 0;

	let getSelectionLength = (selectionStart, selectionEnd) => Math.abs(selectionStart - selectionEnd);

	let getCurrentCharacter = (sentence, textEnd) => sentence.substr(textEnd, 1);

	let getNextCharacter = (sentence, textEnd) => (textEnd + 1 > sentence.length) ? undefined : sentence.substr(textEnd + 1, 1);

	let getRandomTypingDelay = (sentence, textEnd) => (isCharacterTypedSlowly(getCurrentCharacter(sentence, textEnd)) && oneOutOf(3)) ? random(30, 1500) : random(30, 200);

	let getRandomSelectionDelay = () => random(30, 400);

	let getCodeWidthInCharacters = sentence => Math.max(...sentence.split("\n").map(line => line.replace("\t", "    ").length));

	let getCodeHeightInLines = sentence => sentence.split("\n").length;

	// checkers

	let isBreakCharacter = char => [" ", "\t", "\n"].includes(char);

	let isCharacterTypedSlowly = char => [" ", "\n", ".", "(", "["].includes(char);

	let areDifferent = (modelA, modelB) => !Object.keys(modelA).every(key => modelA[key] === modelB[key]);

	// view

	function updateView(model, domNode) {
		domNode.innerHTML = "";

		let contentNode = formatTypedText(
			model.sentence,
			model.textStart,
			model.selectionStart,
			model.selectionEnd,
			model.textEnd
		);

		domNode.appendChild(contentNode);
	}

	function formatTextBeforeSelection(sentence, textStart, selectionStart, selectionEnd) {
		return document.createTextNode(
			getTextBeforeSelection(sentence, textStart, selectionStart, selectionEnd)
		);
	}

	function formatTextAfterSelection(sentence, textStart, selectionStart, selectionEnd) {
		return document.createTextNode(
			getTextAfterSelection(sentence, textStart, selectionStart, selectionEnd)
		);
	}

	function formatSelectedText(sentence, selectionStart, selectionEnd) {
		let selection = getSelectedText(sentence, selectionStart, selectionEnd),
			selectionDirection = getSelectedTextDirection(selectionStart, selectionEnd),
			selectionTag = document.createElement("span"),
			selectionText = document.createTextNode(selection);

		modifyBemClass(selectionTag, {
			"type-animation__selection": {
				"blinking": (selectionDirection >= 0) ? "end" : "start"
			}
		}, ["__", "--", "-"]);

		selectionTag.appendChild(selectionText);

		return selectionTag;
	}

	function formatTypedText(sentence, textStart, selectionStart, selectionEnd, textEnd) {
		let textBeforeSelection = formatTextBeforeSelection(sentence, textStart, selectionStart, selectionEnd),
			selectedText = formatSelectedText(sentence, selectionStart, selectionEnd),
			textAfterSelection = formatTextAfterSelection(sentence, selectionStart, selectionEnd, textEnd),
			codeTag = document.createElement("span"),
			codeInnerTag = document.createElement("span");

		codeTag.className = "type-animation__code";
		codeInnerTag.className = "type-animation__inner";
		codeTag.appendChild(codeInnerTag);
		codeInnerTag.appendChild(textBeforeSelection);
		codeInnerTag.appendChild(selectedText);
		codeInnerTag.appendChild(textAfterSelection);

		return codeTag;
	}

	// controller

	function start() {
		return Promise.resolve();
	}

	function wait(delay) {
		return render.call(this, undefined, delay);
	}

	function delayTypingRandomly() {
		return render.call(this, undefined, getRandomTypingDelay(this.model.sentence, this.model.textEnd));
	}

	function delaySelectionRandomly() {
		return render.call(this, undefined, getRandomSelectionDelay());
	}

	function typeOneCharacter() {
		return render.call(this, () => revealOrHideCharacters(this.model, +1));
	}

	function removeOneCharacter() {
		// to do: melhorar a lógica de remoção. atualmente é impossível remover caracteres no meio do texto, por exemplo.
		return render.call(this, () => revealOrHideCharacters(this.model, -1));
	}

	function moveCursorToNextCharacter() {
		return render.call(this, () => moveCursor(this.model, +1));
	}

	function moveCursorToPreviousCharacter() {
		return render.call(this, () => moveCursor(this.model, -1));
	}

	function moveCursorToNextBreak() {
		let index = getBreakIndexAfterCursor(this.model.sentence, this.model.selectionEnd);
		return render.call(this, () => moveCursor(this.model, index - this.model.selectionStart));
	}

	function moveCursorToPreviousBreak() {
		let index = getBreakIndexBeforeCursor(this.model.sentence, this.model.selectionEnd);
		return render.call(this, () => moveCursor(this.model, index - this.model.selectionStart));
	}

	function selectNextCharacter() {
		return render.call(this, () => selectCharacters(this.model, +1));
	}

	function selectPreviousCharacter() {
		return render.call(this, () => selectCharacters(this.model, -1));
	}

	function selectUntilNextBreak() {
		let index = getBreakIndexAfterCursor(this.model.sentence, this.model.selectionEnd);
		return render.call(this, () => selectCharacters(this.model, index - this.model.selectionEnd));
	}

	function selectUntilPreviousBreak() {
		let index = getBreakIndexBeforeCursor(this.model.sentence, this.model.selectionEnd);
		return render.call(this, () => selectCharacters(this.model, index - this.model.selectionEnd));
	}

	function removeSelection() {
		// to do: melhorar a lógica de remoção. atualmente é impossível remover caracteres no meio do texto, por exemplo.
		let selectionLength = getSelectionLength(this.model.selectionStart, this.model.selectionEnd);
		return render.call(this, () => revealOrHideCharacters(this.model, 0 - selectionLength));
	}

	function getHeightInLines() {
		return getCodeHeightInLines(this.model.sentence);
	}

	function getWidthInCharacters() {
		return getCodeWidthInCharacters(this.model.sentence);
	}

	// batch

	function enqueue(...promiseArr) {
		return promiseArr.reduce(function(prev, next) {
			return prev.then(next);
		}, Promise.resolve());
	}

	function repeatUntilEnd(...promiseArr) {
		var previousModel = this.model;

		return enqueue(...promiseArr).then(() => {
			let currentModel = this.model;
			return (areDifferent(previousModel, currentModel)) ? this.repeatUntilEnd(...promiseArr) : Promise.resolve();
		});
	}

	// render

	function render(action = () => this.model, delay = 0) {
		return new Promise(resolve => {
			if (delay != null && delay > 0) {
				requestTimeout(() => updateModelAndView.call(this, action, resolve), delay);
			}
			else {
				updateModelAndView.call(this, action, resolve);
			}
		});
	}

	function updateModelAndView(action, resolve) {
		let updatedModel = action();
		if (this.model !== updatedModel) {
			this.model = updatedModel;
			updateView(this.model, this.node);
		}
		resolve();
	}

	function requestTimeout(fn, delay) {
		// as seen on https://gist.github.com/joelambert/1002116
		var start = new Date().getTime(),
			handle = {};

		function loop() {
			var current = new Date().getTime(),
				delta = current - start;

			delta >= delay ? fn.call() : handle.value = (window.requestAnimationFrame || window.setTimeout)(loop);
		}

		handle.value = (window.requestAnimationFrame || window.setTimeout)(loop);
		return handle;
	}

	// public

	return {
		start,
		wait,
		enqueue,
		repeatUntilEnd,
		delayTypingRandomly,
		delaySelectionRandomly,
		typeOneCharacter,
		removeOneCharacter,
		moveCursorToNextCharacter,
		moveCursorToPreviousCharacter,
		moveCursorToNextBreak,
		moveCursorToPreviousBreak,
		selectNextCharacter,
		selectPreviousCharacter,
		selectUntilNextBreak,
		selectUntilPreviousBreak,
		removeSelection,
		getHeightInLines,
		getWidthInCharacters
	};
})();

export default CodeWriter;

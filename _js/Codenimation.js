import modifyBemClass from "canivete/dist/modifyBemClass";
import random from "lodash-es/random";
import CodeWriter from "./CodeWriter";

const Codenimation = function(domNode, snippetRaffler, appearanceRaffler) {
	this.model = setInitialModel(snippetRaffler, appearanceRaffler);
	this.node = domNode;

	// private

	function setInitialModel(snippetRaffler, appearanceRaffler) {
		return {
			snippetRaffler,
			appearanceRaffler
		};
	}
};

Codenimation.prototype = (function() {

	// getters

	let getRandomValueFrom = raffler => raffler.draw();

	let getHeightInPixels = (heightInLines, fontSize) => heightInLines * fontSize * 0.6 * 2;

	let getWidthInPixels = (widthInCharacters, fontSize) => widthInCharacters * fontSize * 0.6;

	function getFontSize(appearance) {
		let fontSizeConversionTable = {
			smaller: 30,
			small: 80,
			normal: 160,
			big: 300,
			bigger: 600
		};

		return fontSizeConversionTable[appearance];
	}

	let getRandomPositionTop = (heightInPixels) => getRandomPosition(heightInPixels, "clientHeight");

	let getRandomPositionLeft = (widthInPixels) => getRandomPosition(widthInPixels, "clientWidth");

	let getRandomPosition = (sizeInPizels, bodyProperty) => Math.round(random(0 - (sizeInPizels * (1 / 4)), document.body[bodyProperty] - (sizeInPizels * (3 / 4))));

	// animation steps

	function putBackTo(raffler, value) {
		return function(instance) {
			raffler.putBack(value);
			return instance;
		};
	}

	function renderCode(domNode, targetNode) {
		return function(instance) {
			targetNode.appendChild(domNode);
			return instance;
		};
	}

	function typeCode(instance) {

		let wait = time => () => instance.wait(time);

		let animate = methodName => () => instance[methodName]();

		let repeatUntilEnd = (...methodArr) => () => instance.repeatUntilEnd(...methodArr.map(methodName => animate(methodName)));

		return instance.start()
			.then(repeatUntilEnd("delayTypingRandomly", "typeOneCharacter"))
			.then(wait(4000))
			.then(repeatUntilEnd("delaySelectionRandomly", "selectUntilPreviousBreak"))
			.then(wait(2000))
			.then(animate("removeSelection"));
	}

	function removeCode(domNode, targetNode) {
		return function(instance) {
			targetNode.removeChild(domNode);
			return instance;
		};
	}

	// dom

	function createNode() {
		return document.createElement("div");
	}

	function styleNode(domNode, appearance, positionTop, positionLeft) {
		modifyBemClass(domNode, {
			"type-animation": {
				[appearance]: true
			}
		}, ["__", "--", "-"]);

		domNode.style.top = positionTop + "px";
		domNode.style.left = positionLeft + "px";
	}

	// animation

	function animateSingle() {

		let snippet = getRandomValueFrom(this.model.snippetRaffler),
			appearance = getRandomValueFrom(this.model.appearanceRaffler),
			fontSize = getFontSize(appearance),
			domNode = createNode(),
			animation = new CodeWriter(domNode, snippet);

		let positionTop = getRandomPositionTop(
			getHeightInPixels(animation.getHeightInLines(), fontSize)
		);

		let positionLeft = getRandomPositionLeft(
			getWidthInPixels(animation.getWidthInCharacters(), fontSize)
		);

		styleNode(domNode, appearance, positionTop, positionLeft);

		return Promise.resolve(animation)
			.then(renderCode(domNode, this.node))
			.then(typeCode)
			.then(removeCode(domNode, this.node))
			.then(putBackTo(this.model.snippetRaffler, snippet))
			.then(putBackTo(this.model.appearanceRaffler, appearance))
			.then(() => animateSingle.call(this));
	}

	function animate(times = 1) {
		for (let i = times; i > 0; i--) {
			animateSingle.call(this);
		}
	}

	// public

	return {
		animate
	};
})();

export default Codenimation;

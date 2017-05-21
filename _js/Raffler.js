import sample from "lodash-es/sample";

/**
 * Representa um sorteador semelhante ao Bingo.
 *
 * @class
 * @param {Array} itemArr Itens do sorteio.
 * @public
 */
function Raffler(itemArr) {
	this.model = setInitialModel(itemArr);

	// private

	function setInitialModel(itemArr) {
		return itemArr.map(item => ({
			item,
			isAvailable: true
		}));
	}
}

Raffler.prototype = (function() {

	// model

	const markAsAvailable = (model, index) => markAs(model, true, index);

	const markAsDrawn = (model, index) => markAs(model, false, index);

	function markAs(model, isAvailable, index) {
		model[index].isAvailable = isAvailable;
		return model;
	}

	// getters

	const getAvailableIndexesByItem = (model, item) => getIndexesByAvailabilityAndItem(model, true, item);

	const getUnavailableIndexesByItem = (model, item) => getIndexesByAvailabilityAndItem(model, false, item);

	const getAvailableIndexes = model => getIndexesByAvailabilityAndItem(model, true);

	const getUnavailableIndexes = model => getIndexesByAvailabilityAndItem(model, false);

	const getItem = (model, index) => model[index].item;

	function getItemsByAvailability(model, isAvailable) {
		return model.filter(entry => entry.isAvailable === isAvailable).map(entry => entry.item);
	}

	function getIndexesByAvailabilityAndItem(model, isAvailable, item) {
		return model.map((entry, index) => index).filter(index => model[index].isAvailable === isAvailable && (item == null || model[index].item === item));
	}

	// controller

	/**
	 * Sorteia um item e o retorna, removendo-o dos próximos sorteios.
	 *
	 * @instance
	 * @memberOf Raffler
	 * @return {*}
	 * @public
	 *
	 * @example
	 * var bingo = new Raffler([0, 2, 4, 6, 8]);
	 * var itemSorteado = bingo.draw(); // 4
	 * var outroItemSorteado = bingo.draw(); // 6
	 * var itensRestantes = bingo.getAvailableItems(); // [0, 2, 8];
	 */
	function draw() {
		let availableIndexes = getAvailableIndexes(this.model);

		if (availableIndexes.length > 0) {
			let randomIndex = sample(availableIndexes),
				randomItem = getItem(this.model, randomIndex);

			this.model = markAsDrawn(this.model, randomIndex);

			return randomItem;
		}
	}

	/**
	 * Devolve um item ao sorteio.
	 * 
	 * @instance
	 * @memberOf Raffler
	 * @param {*} item Item devolvido
	 * @public
	 *
	 * @example
	 * var bingo = new Raffler([0, 2, 4, 6, 8]);
	 * var itemSorteado = bingo.draw(); // 4
	 * bingo.putBack(itemSorteado);
	 * var itensRestantes = bingo.getAvailableItems(); // [0, 2, 4, 6, 8];
	 */
	function putBack(item) {
		var returningIndex = getUnavailableIndexesByItem(this.model, item)[0];
		this.model = markAsAvailable(this.model, returningIndex);
	}

	/**
	 * Retorna os itens disponíveis para sorteio.
	 * 
	 * @instance
	 * @memberOf Raffler
	 * @return {Array}
	 * @public
	 *
	 * @example
	 * var bingo = new Raffler([0, 2, 4, 6, 8]);
	 * var itemSorteado = bingo.draw(); // 8
	 * var outroItemSorteado = bingo.draw(); // 2
	 * var itensDisponiveis = bingo.getAvailableItems(); // [0, 4, 6];
	 */
	function getAvailableItems() {
		return getItemsByAvailability(this.model, true);
	}

	/**
	 * Retorna os itens indisponíveis para sorteio.
	 * 
	 * @instance
	 * @memberOf Raffler
	 * @return {Array}
	 * @public
	 *
	 * @example
	 * var bingo = new Raffler([0, 2, 4, 6, 8]);
	 * var itemSorteado = bingo.draw(); // 8
	 * var outroItemSorteado = bingo.draw(); // 2
	 * var itensNaoDisponiveis = bingo.getUnavailableItems(); // [2, 8];
	 */
	function getUnavailableItems() {
		return getItemsByAvailability(this.model, false);
	}

	return {
		draw,
		putBack,
		getAvailableItems,
		getUnavailableItems
	};
})();

export default Raffler;

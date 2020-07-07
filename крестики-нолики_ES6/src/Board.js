class Board {
    constructor() {
        this.gameTableElement = document.getElementById('game');
    }

    init(game, status) {
        this.game = game;
        this.status = status;
    }

    /**
     * Отрисовка игрового поля
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    /**
     * Инициализация обработчиков событий
     */
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.game.cellClickHandler(event));
    }

    /**
     * Проверка, произведен ли клик по ячейке
     * @param {Event} event 
     * @param {HTMLElement} event.target
     * @returns {boolean} клик по ячейке - true, иначе false
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    }

    /**
     * Проверка, не стоит ли в ячейке крестик или нолик 
     * @param {Event} event 
     * @param {HTMLElement} event.target
     * @returns {boolean} пустая ячейка - true, заполненная - false
     */
    isEmptyCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.status.mapValues[row][col] === '';
    }

    /**
     * Заполняет ячейку, по которой произведен клик 
     * @param {Event} event 
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.status.mapValues[row][col] = this.status.phase;
        event.target.textContent = this.status.phase;
    }
}
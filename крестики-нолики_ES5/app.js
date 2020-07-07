'use strict';

let ticTacToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],

    phase: 'X',

    /**
     * Инициализация игры
     */
    init() {
        this.renderMap();
        this.initEventHandlers();
    },

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
    },

    /**
     * Инициализация обработчиков событий
     */
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    /**
     * Обработчик события клика
     * @param {MouseEvent} event
     */
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }

        this.fillCell(event);
        
        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhrase();
        }

        this.changePhase();
    },

    /**
     * Проверка, был ли клик корректным 
     * @param {Event} event 
     * @returns {boolean} клик корректный - true, иначе false
     */
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isEmptyCell(event);
    },

    /**
     * Проверка, что мы играем
     * @returns {boolean} статус "играем" true, иначе false
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * Проверка, произведен ли клик по ячейке
     * @param {Event} event 
     * @param {HTMLElement} event.target
     * @returns {boolean} клик по ячейке - true, иначе false
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    /**
     * Проверка, не стоит ли в ячейке крестик или нолик 
     * @param {Event} event 
     * @param {HTMLElement} event.target
     * @returns {boolean} пустая ячейка - true, заполненная - false
     */
    isEmptyCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },
    
    /**
     * Заполняет ячейку, по которой произведен клик 
     * @param {Event} event 
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    /**
     * Проверка, есть ли выигрыш
     * @returns {boolean} есть выигрыш - true, нет - false
     */
    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    },

    /**
     * Проверка есть ли выигрышная ситуация на линии
     * @param {{x: int, y: int}} a 1-ая ячейка
     * @param {{x: int, y: int}} b 2-ая ячейка
     * @param {{x: int, y: int}} c 3-я ячейка
     * @returns {boolean} Вернет true, если линия выиграна, иначе false
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    },

    /**
     * Ставит статус игры в "остановлена"
     */
    setStatusStopped() {
        this.status = 'stopped';
    },

    /**
     * Сообщает о победе
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    },

    /**
     * Меняет значение заполняемой ячейки (крестик или нолик)
     */
    changePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },
};

ticTacToe.init();
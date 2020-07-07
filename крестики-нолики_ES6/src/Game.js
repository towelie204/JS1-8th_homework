class Game {

    init(board, status) {
        this.status = status;
        this.board = board;
        
    }

    /**
     * Обработчик события клика
     * @param {MouseEvent} event
     */
    cellClickHandler(event) {
        if (!this.isCorrectClick(event)) {
            return;
        }
        this.board.fillCell(event);
        
        if (this.hasWon()) {
            this.status.setStatusStopped();
            this.sayWonPhrase();
        }

        this.status.changePhase();
    }

    /**
     * Проверка, был ли клик корректным 
     * @param {Event} event 
     * @returns {boolean} клик корректный - true, иначе false
     */
    isCorrectClick(event) {
        return this.status.isStatusPlaying() && this.board.isClickByCell(event) && this.board.isEmptyCell(event);
    }

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
    }

    /**
     * Проверка есть ли выигрышная ситуация на линии
     * @param {{x: int, y: int}} a 1-ая ячейка
     * @param {{x: int, y: int}} b 2-ая ячейка
     * @param {{x: int, y: int}} c 3-я ячейка
     * @returns {boolean} Вернет true, если линия выиграна, иначе false
     */
    isLineWon(a, b, c) {
        let value = this.status.mapValues[a.y][a.x] + this.status.mapValues[b.y][b.x] + this.status.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    }

    /**
     * Сообщает о победе
     */
    sayWonPhrase() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${figure} выиграли!`);
    }
}
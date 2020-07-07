class Status {

    constructor() {
        this.status = 'playing';
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        this.phase = 'X';
    }

    /**
     * Проверка, что мы играем
     * @returns {boolean} статус "играем" true, иначе false
     */
    isStatusPlaying() {
        return this.status === 'playing';
    }

    /**
     * Ставит статус игры в "остановлена"
     */
    setStatusStopped() {
        this.status = 'stopped';
    }

    /**
     * Меняет значение заполняемой ячейки (крестик или нолик)
     */
    changePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}
window.addEventListener('load', function() {
    const game = new Game();
    const board = new Board();
    const status = new Status();

    board.init(game, status);
    game.init(board, status);
    board.renderMap();
    board.initEventHandlers();
});
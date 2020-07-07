'use strict';

function playDrums(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    if (!audio) {
        return; //прерываем выполнение функции, если нажата клавиша без привязанного аудиофайла
    }
    audio.currentTime = 0; //позваоляет не проигрывать аудио до конца, а так же воспроизводить несколько звуков одновреиенно
    audio.play();
    key.classList.add('playing');//добавляем класс с анимацией (transform)
    setTimeout(function() {
        key.classList.remove('playing');//удаляем класс с анимацией (transform)
    }, 150);
}

window.addEventListener('keydown', playDrums);
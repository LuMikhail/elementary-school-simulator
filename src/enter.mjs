function putEnter(node, clickButton) {
    // Выполнение функции, когда пользователь отпускает клавишу на клавиатуре
    node.addEventListener("keyup", function (event) {
    // Число 13 в "Enter" и клавиши на клавиатуре
    if (event.keyCode === 13) {
        event.preventDefault();
        console.log('кнопка нажата');
        document.querySelector('.search').click(clickButton);
    }
});
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export {putEnter, randomInteger};
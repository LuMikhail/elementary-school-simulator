import { putEnter, randomInteger } from "./enter.mjs";

function multi(tip, a, b) {
    if (tip === '-') {
        // условие чтобы не было отрицательного чилса
        return a > b ? a - b : b - a;
    }
    if (tip === '+') {
        return a + b;
    } else {
        return a + b;
    }
}
function check() {
    let out = ''
    let input = document.querySelectorAll('.check');
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            out = input[i].value;
        }
    }
    return out;
}
function checkedButton() {
    let input = document.querySelectorAll('.check');
    return input[0].checked ? input[1].checked = false : input[0].checked = true;
}
/* 
radioGroup.addEventListener("change", function(event) { // добавляем обработчик события изменения
    if (event.target.checked) { // если выбрана одна радиокнопка
      const otherRadios = radioGroup.querySelectorAll("input[type='radio']:not(:checked)"); // выбираем все остальные радиокнопки в группе
      otherRadios.forEach(function(radio) {
        radio.checked = false; // снимаем флажок со всех других радиокнопок в группе
      });
    }
  }); */

checkedButton();
(function runApp() {
    let tip = check();

    let flag = 1;
    let one = randomInteger(1, 10);
    let two = randomInteger(1, 5);
    let sumResult = multi(tip, one, two);
    let question = document.querySelector('.question');
    let out = document.querySelector('.out');
    question.innerHTML =
        `<span class="word">${one} ${tip} ${two} = ...</span>`;
    document.querySelector('.search').addEventListener('click', () => {
        tip = check();
        let checkAll = document.querySelectorAll('.check');
        let countCheckTrue = 0
        for (let i = 0; i < checkAll.length; i++) {
            if (checkAll[i].checked) {
                countCheckTrue++;
            }
        }
        if (countCheckTrue > 1 || countCheckTrue === 0) {
            alert('Выберите один знак вычисления!');
        }

    });

    let node = document.querySelector('.input-search');
    putEnter(node, compareDataAgainstStandard);
    document.querySelector('.search').addEventListener('click', compareDataAgainstStandard);

    function compareDataAgainstStandard() {
        let input = node.value;
        console.log(input);
        if (flag > 8) {
            return out.innerHTML = sumResult + ' конец';
        }
        if (+input === +sumResult) {
            out.innerHTML = `<h2 class="animate__animated animate__lightSpeedOutRight animate__slower">
                Верно, "${sumResult}" молодец!</h2>`;
            one = randomInteger(1, 10);
            two = randomInteger(1, 5);
            sumResult = multi(tip, one, two);
            node.value = '';
            flag++;
            console.log('flag', flag);
        }
        else {
            out.innerHTML = `<h2 class="animate__animated animate__hinge animate__slower animate__repeat-2">
                Ошибка = ${sumResult}</h2>`;
            one = randomInteger(1, 10);
            two = randomInteger(1, 5);
            sumResult = multi(tip, one, two);
            node.value = '';
        }

        if (tip === '-' && two > one) {
            question.innerHTML =
                `<span class="word">${two} ${tip} ${one} = ...</span>`;
        } else {
            question.innerHTML =
                `<span class="word">${one} ${tip} ${two} = ...</span>`;
        }
    };
}());
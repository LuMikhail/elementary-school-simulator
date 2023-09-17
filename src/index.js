import { putEnter } from "./enter.mjs";
const accessKey = 'C7jfrtHfAJZYvVSAQu7sS4n09B4xtQXb7RrxROSWDzU';

const gallery = document.querySelector('.gallery');
let allImages;

function searchWord(search) {
    getImages(search);
    document.querySelector('.input-search').value = '';
}

function getImages(word) {
    const randomPhotoUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${word}&count=1`;

    fetch(randomPhotoUrl)
        .then(res => res.json())
        .then(data => {
            allImages = data;
            makeImages(allImages);
        });
}

let count = 0;
const makeImages = (data) => {
    data.forEach((item, index) => {
        let img = document.createElement('img');
        img.className = 'gallery-img';
        img.src = item.urls.regular;
        gallery.append(img);
        count++;
    });

    if (count > 3) {
        gallery.removeChild(gallery.firstElementChild);
    }
}


let mapWords = new Map([
     ['палатка', 'tent'],
     ['кровать', 'bed'],
     ['сачок или сеть', 'net'],
     ['яйцо', 'egg'],
     ['ручка', 'pen'],
     ['рабочий стол', 'desk'],
     ['ремень', 'belt'],
     ['молоко', 'milk'],
     ['поросенок', 'pig'],
     ['шесть', 'six'],
     ['козленок', 'kid'],
    ['ветер', 'wind'],
    ['собака', 'dog'],
    ['коробка', 'box'],
    ['лиса', 'fox'],
    ['кукла', 'doll'],
    ['лягушка', 'frog'],
    ['пруд', 'pond'],
    ['троль', 'troll'],
    ['грузовик', 'lorry'],
    ['солнце', 'sun'],
    ['автобус', 'bus'],
    ['кружка', 'mug'],
    ['кувшин', 'jug'],
    ['чашка', 'cup']
]);

let arr = Array.from(mapWords.keys());
const lengthMap = mapWords.size
let random = randomInteger(0, arr.length - 1);
let question = getQuestion(arr[random]);
console.log(arr);
let countWrong = 0;
let listWrong = '';

function getQuestion(word) {
    document.querySelector('.question').innerHTML = " ";
    let question = 'Напиши слово';
    document.querySelector('.question').innerHTML = `${question} <span class="word">${word}</span> по-английски!`;
    return word;
}

let inputNode = document.querySelector('.input-search');

putEnter(inputNode, runApp);


document.querySelector('.search').addEventListener('click', runApp);


function runApp() {

    document.querySelector('.out').innerHTML = "";

    console.log('question', question);
    let input = document.querySelector('.input-search').value;
    input = String(input).toLowerCase();
    console.log('input', input);

    if (countWrong > 3) {
        let hidden = document.querySelector('.list-wrong');
        hidden.hidden = false;
    }

    if (mapWords.get(question) === input) {
        searchWord(input);
        console.log('2', input);
        arr.splice(random, 1);
    }

    if (mapWords.get(question) != input) {
        document.querySelector('.out').innerHTML =
            `<h2  class="animate__animated animate__hinge animate__slower animate__repeat-2">
        Ошибка</h2>`;
        countWrong++;
        listWrong += `${mapWords.get(question)} - ${question},`;

    }


    if (arr.length === 0) {
        document.querySelector('.question').innerHTML =
            `<h2 style="color: rgb(170, 17, 109)" 
             class="animate__animated animate__bounceInUp animate__slower">
         вы повторили ${lengthMap} слов, из них ошибок ${countWrong}</h2>`;
        //перезагрузка строницы
        setTimeout(function () {
            location.reload();
        }, 15000);


    } else {
        random = randomInteger(0, arr.length - 1);
        question = getQuestion(arr[random]);
        console.log(arr, random);
    }
}
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getListWrongs() {
    let wrongArr = listWrong.split(',');
    let set = new Set(wrongArr);
    let result = Array.from(set).join(' ')
    document.querySelector('.wrongs').innerHTML = result
}

document.querySelector('.list-wrong').addEventListener('click', getListWrongs);

const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
});

//Сохраняем почту для доступа к проекту
const studentEmail = "stupishin1597@yandex.ru";

// Переменная для хранения данных от сервера
let cards;

fetch(`https://api-code.practicum-team.ru/heroes?_where[_or][0][studentEmail]=${studentEmail}&_where[_or][1][studentEmail]=`)
.then((response) => response.json())
.then((data) => {
    console.log(data); // В консоли можно исследовать полученные данные
    cards = data; // Запишем данные в переменную
    renderCards(cards); // Функция отрисовки полученных данных
})
.catch((error) => console.error("Ошибка:", error));

// Контейнер для карточек
const container = document.getElementById("cards-container");

// Передаём массив с данными аргументом в функцию отрисовки карточек
function renderCards(heroes) {
    // Чистим контейнер для карточек
    container.innerHTML = "";

    //  В цикле достаём из каждого объекта данные о персонаже и вставляем в вёрстку карточки
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i];

        // Создаём верстку карточки и вставляем значения характеристик персонажа
        const cardHtml = `
        <div class="card-wrapper">
            <div class="card">
                <div class="card-title">
                    <h2 class="card-title-text">${hero.title}</h2>
                </div>
                <div class="card-description">
                    <p class="card-description-text">${hero.description}</p>
                    <div class="card-parameters">
                        <div class="card-parameter">
                            <p class="card-parameter-title">str</p>
                            <p class="card-parameter-value">${hero.str}</p>
                        </div>
                        <div class="card-parameter">
                            <p class="card-parameter-title">agi</p>
                            <p class="card-parameter-value">${hero.agi}</p>
                        </div>
                        <div class="card-parameter">
                            <p class="card-parameter-title">hp</p>
                            <p class="card-parameter-value">${hero.hp}</p>
                        </div>
                        <div class="card-parameter">
                            <p class="card-parameter-title">int</p>
                            <p class="card-parameter-value">${hero.int}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        // Добавляем вёрстку карточки в контейнер
        container.innerHTML += cardHtml;
    }
}

//Получение элементов формы
const form = document.forms.addHero; // Получаем форму
const titleInput = form.elements.title; // Получаем поле с именем
const descriptionInput = form.elements.description; // Получаем поле с описанием
const strInput = form.elements.str; // Получаем поле с уровнем силы
const agiInput = form.elements.agi; // Получаем поле с уровнем ловкости
const hpInput = form.elements.hp; // Получаем поле с уровнем здоровья
const intInput = form.elements.int; // Получаем поле с уровнем интеллекта

// Вешаем на форму обработчик события submit
form.addEventListener("submit", function (evt) {
    // Отменяем стандартное поведение
    evt.preventDefault();

    // Создаём объект с новым персонажем и записываем данные
    let newHero = {
                title: titleInput.value,
        description: descriptionInput.value,
        str: strInput.value,
        agi: agiInput.value,
        hp: hpInput.value,
        int: intInput.value,
                // Чтобы выделить карточки проекта, указываем почту 
        studentEmail: studentEmail,
    };

    // Формируем JSON-строку из объекта
    let newHeroJSON = JSON.stringify(newHero);

    fetch("https://api-code.practicum-team.ru/heroes", {
        method: "POST", // POST нужен для сохранения и записи данных
        body: newHeroJSON, // Тело запроса в JSON-формате
        headers: {
            // Добавляем необходимые заголовки
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
                        console.log(data); // Смотрим ответ сервера на наш запрос
            cards.push(data); // Добавляем в переменную cards данные о новой карточке
            renderCards(cards); // Отображаем обновлённый набор карточек
            form.reset(); // Сбрасываем все поля формы
        })
        .catch(() => {
            errorText.textContent = "Произошла ошибка";
        })
        .finally(() => {
            addHeroButton.disabled = false;
            addHeroButton.textContent = "Отправить";
        });
}); 


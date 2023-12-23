// Информация, на основе которой генерится сайт
let heroes = [["Axe", "Tank"], ["Crystal Maiden", "Support"]]; 

let heroesContainer = document.getElementById("heroesContainer");
let nameInput = document.getElementById("heroName");
let classInput = document.getElementById("heroClass");

// Функция, которая отображает героев на странице

function displayHeroes()  {

        // Очищаем текущее содержимое
    heroesContainer.innerHTML = ''; 

        // С помощью цикла проходимся по массиву героев
        // (переменная i будет равняться индексу элемента в массиве)
    for (let i = 0; i < heroes.length; i++) {
            // Создаём элемент, в который будем добавлять информацию о герое
        let heroDiv = document.createElement("div");

            // Записываем в созданный элемент разметку, подставляя необходимые данные
            // (данные достаём из массивов по индексу – если не помнишь, как это делать,
            // перечитай наш урок про массивы)
            // Так как элемент массива heroes[i] и есть массив - hero = ["имя", "класс"],
            // нужно взять отдельно имя и класс по индексу массива: [0]- имя [1]- класс
        heroDiv.innerHTML = `<h3>${heroes[i][0]}</h3><p>${heroes[i][1]}</p>`;

            // Добавляем карточку героя в контейнер
        heroesContainer.appendChild(heroDiv);
    } 
}

// Вызываем написанную функцию
displayHeroes()

function addHero() {
    let newHero = [nameInput.value, classInput.value];
    
    // Кидаем нового персонажа в массив с героями на нашем сайте
    heroes.push(newHero);

    /* 
        Используем функцию, которую мы подготовили в прошлом уроке, 
        чтобы обновить список героев на странице 
    */
    displayHeroes();

    /* 
        Очищаем поля ввода – чтобы пользователю было удобнее 
        сразу иметь возможность вводить данные нового персонажа 
    */
    nameInput.value = "";
    classInput.value = "";
}


document.getElementById("addButton").addEventListener("click", addHero); 

    
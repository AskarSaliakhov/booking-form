const main = document.querySelector('.main');
const form = document.createElement('div');
form.className = 'form';

const title = document.createElement('p');
title.id = 'title';
title.textContent = 'Форма бронирования';

//Уведомления
const popup = document.createElement('div');
popup.id = 'popup';
const titleData = document.createElement('p');
titleData.id = 'title-data';
popup.append(titleData);


//БАШНИ
const towers = document.createElement('div');
towers.className = 'towers';
const selectTowers = document.createElement('select');
const towerA = document.createElement('option');
towerA.textContent = 'Башня А';
towerA.value = 'А';
const towerB = document.createElement('option');
towerB.textContent = 'Башня Б';
towerB.value = 'Б';
const optionTowerHidden = document.createElement('option');
optionTowerHidden.hidden = true;
optionTowerHidden.textContent = 'Выберите башню';
selectTowers.append(optionTowerHidden, towerA, towerB);


//ЭТАЖИ
const floors = document.createElement('div');
floors.className = 'floors';
const selectFloors = document.createElement('select');
const FLOORS_COUNT = 27;
const optionFloorHidden = document.createElement('option');
optionFloorHidden.textContent = 'Выберите этаж';
optionFloorHidden.hidden = true;
selectFloors.append(optionFloorHidden);
for (let i = 3; i <= FLOORS_COUNT; i++) {
    const optionFloor = document.createElement('option');
    optionFloor.className = 'floor' + i;
    optionFloor.textContent = optionFloor.value = 'Этаж ' + i;
    selectFloors.append(optionFloor);
}

//ПЕРЕГОВОРКИ
const meetingRooms = document.createElement('div');
meetingRooms.className = 'meetingRooms';
const optionMeetingRoomsHidden = document.createElement('option');
optionMeetingRoomsHidden.textContent = 'Выберите переговорку';
optionMeetingRoomsHidden.hidden = true;
const selectMeetingRooms = document.createElement('select');
selectMeetingRooms.append(optionMeetingRoomsHidden);
const MEETING_ROOMS_COUNT = 10;
for (let i = 1; i <= MEETING_ROOMS_COUNT; i++) {
    const optionMeetingRoom = document.createElement('option');
    optionMeetingRoom.className = 'meeting__room' + i;
    optionMeetingRoom.textContent = optionMeetingRoom.value = 'Переговорка ' + i;
    selectMeetingRooms.append(optionMeetingRoom);
}

//Время
const inputChooseDay = document.createElement('input');
inputChooseDay.className = 'choose__day';
inputChooseDay.placeholder = 'Выберите день';

const titleChooseStart = document.createElement('p');
titleChooseStart.textContent = 'Время начала';

const inputChooseStart = document.createElement('input');
inputChooseStart.classList.add('choose__time', 'start__time');
inputChooseStart.type = 'time';

const titleChooseFinish = document.createElement('p');
titleChooseFinish.textContent = 'Окончание';

const inputChooseFinish = document.createElement('input');
inputChooseFinish.placeholder = 'Введите';
inputChooseFinish.classList.add('choose__time', 'finish__day');
inputChooseFinish.type = 'time';

const hours = document.createElement('div');
hours.className = 'hours';
hours.append(inputChooseStart, titleChooseStart, inputChooseFinish, titleChooseFinish);

const chooseStartHour = document.createElement('div');
chooseStartHour.className = 'choose__start__hour';
chooseStartHour.append(titleChooseStart, inputChooseStart);

const chooseFinishHour = document.createElement('div');
chooseFinishHour.className = 'choose__finish__hour';
chooseFinishHour.append(titleChooseFinish, inputChooseFinish);

hours.append(chooseStartHour, chooseFinishHour);

const allTimes = document.createElement('div')
allTimes.className = 'times'
allTimes.append(inputChooseDay, hours)
new Datepicker(inputChooseDay, {
        min: (function () {
            let date = new Date();
            date.setDate(date.getDate() - 1);
            return date;
        })(),
    }
);

//Комментарий
const comment = document.createElement('div');
comment.className = 'comment';

const textareaComment = document.createElement('textarea');
textareaComment.className = 'comment';
textareaComment.placeholder = 'Введите комментарий';


//Смайлики
const buttonOpenSmiles = document.createElement('button');
buttonOpenSmiles.className = 'btn__open';

const divOpenSmiles = document.createElement('div');
divOpenSmiles.className = 'open__smiles';
divOpenSmiles.style.display='none';
const emojies = ["😃", "😁", "😂", "🤣", "😟", "🙁", "🥺", "😎", "💗", "👍", "👎", "👌", "✅", "❓", "❗", "🔥", "👈", "👉", "👆", "👇"];


for (let i = 0; i < emojies.length; i++) {
    const smile = document.createElement('span')
    smile.textContent = emojies[i];
    smile.className = 'smile';
    divOpenSmiles.append(smile);
    smile.addEventListener('click', () => {
        textareaComment.value = textareaComment.value.slice(0, textareaComment.selectionStart) +
            emojies[i] +
            textareaComment.value.slice(textareaComment.selectionStart + 1, textareaComment.value.length)
    })
}


function closeEmojies() {
    return divOpenSmiles.style.display = 'none';
}
function openEmojies() {
    return divOpenSmiles.style.display = 'block';
}

//закрыть Esc-ом

document.addEventListener('keydown', function(e) {
    if( e.keyCode === 27 ){
        count=0;
        closeEmojies();
    }
});

//открыть/закрыть смайлики
let count=0
buttonOpenSmiles.addEventListener('click',()=>{
    count++;
    if (count%2===1) {
        openEmojies();
    }
    else {
        closeEmojies();
    }
})

comment.append(textareaComment, buttonOpenSmiles, divOpenSmiles);


//Кнопки отправки и очистки
const buttons = document.createElement('div');
buttons.className = 'buttons';
const buttonSend = document.createElement('button');
buttonSend.classList.add('btn', 'btn__send');
buttonSend.textContent = 'Отправить';
const buttonCleanAll = document.createElement('button');
buttonCleanAll.classList.add('btn', 'btn__clean');
buttonCleanAll.textContent = 'Очистить';
buttons.append(buttonCleanAll, buttonSend);


const allSelects = [selectTowers, selectFloors, selectMeetingRooms];
const allTimesInputs = [inputChooseDay, inputChooseStart, inputChooseFinish];


buttonSend.addEventListener('click', () => {
    popup.className = 'show'
    setTimeout(function () {
        popup.className = popup.className.replace("show", "");
    }, 5000);

    const data = {
        tower: selectTowers.options[selectTowers.selectedIndex].value,
        floor: selectFloors.options[selectFloors.selectedIndex].value,
        meetingRoom: selectMeetingRooms.options[selectMeetingRooms.selectedIndex].value,
        day: inputChooseDay.value,
        start: inputChooseStart.value,
        finish: inputChooseFinish.value,
        comment: textareaComment.value,
    }

    allSelects.forEach(element => {
        if (element.selectedIndex !== 0) {
            element.classList.remove('invalid__data');
        } else {
            element.classList.add('invalid__data');
        }
    })

    allTimesInputs.forEach(element => {
        if (element.value !== '') {
            element.classList.remove('invalid__data');
        } else {
            element.classList.add('invalid__data');
        }
    })

    if (selectTowers.selectedIndex !== 0 &&
        selectFloors.selectedIndex !== 0 &&
        selectMeetingRooms.selectedIndex !== 0 &&
        inputChooseDay.value !== '' &&
        inputChooseStart.value !== '' &&
        inputChooseFinish.value !== '' &&
        !(inputChooseStart.value > inputChooseFinish.value))
    {
        titleData.textContent = 'Форма успешно отправлена';
        popup.classList.add('right__data__popup');
        console.log(JSON.stringify(data));
    } else if (inputChooseStart.value > inputChooseFinish.value) {
        titleData.textContent = 'Время начала больше чем время окончания';
        popup.classList.add('invalid__data__popup');
        inputChooseStart.className = inputChooseFinish.className = 'invalid__data';
    } else {
        titleData.textContent = 'Выберите все значения';
        popup.classList.add('invalid__data__popup');
    }

})


buttonCleanAll.addEventListener('click', () => {
    inputChooseDay.value = '';
    textareaComment.value = '';
    selectFloors.selectedIndex = selectTowers.selectedIndex = selectMeetingRooms.selectedIndex = 0;
    inputChooseStart.value = '';
    inputChooseFinish.value = '';

    allSelects.forEach(element => {
        element.classList.remove('invalid__data');
    })
    allTimesInputs.forEach(element => {
        element.classList.remove('invalid__data');
    })
})

towers.append(selectTowers);
floors.append(selectFloors);
meetingRooms.append(selectMeetingRooms);

form.append(title, towers, floors, meetingRooms, allTimes, comment, buttons);

main.append(form, popup);


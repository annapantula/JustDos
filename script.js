const toDos = [
    {
        text: 'Trip to INDIA',
        completed: false
    },
    {
        text: 'Trip to SWEDEN',
        completed: true
    },
    {
        text: 'Trip to USA',
        completed: false
    },
    {
        text: 'Trip to SWIZ',
        completed: true
    },
    {
        text: 'Trip to PARIS',
        completed: true
    },
    {
        text: 'Trip to GREECE',
        completed: false
    }
]


const filterObj = {
    searchText : '',
    hideCompleted: false
}



// Elements
const toDosContainer = document.querySelector('#to-dos');
const searchToDosInputEl = document.querySelector('#search-todos');
const sortToDosBtnEl = document.querySelector('#sort-todos')
const toDoFormEl = document.querySelector('#todo-form')
const hideCompletedCkbEl = document.querySelector('#hide-just-dos')

const sortToDos = (myToDos) => {
    return myToDos.sort((toDo1, toDo2) => {
        if(toDo1.completed && !toDo2.completed) {
            return 1;
        } else if(!toDo1.completed && toDo2.completed) {
            return -1;
        } else {
            return 0;
        }
    })
}

const getToDosLeft = function(toDos) {
    return toDos.filter((toDo) => {
        return !toDo.completed
    })
}

const createToDoTitle = function() {
    let toDosLeftNumber = getToDosLeft(filteredToDos(toDos, filterObj)).length;
    let title = `You have ${toDosLeftNumber} Just Do's left`;
    const toDoTitleEl = document.createElement('h4')
    toDoTitleEl.textContent = title
    toDoTitleEl.className = 'text-uppercase'
    toDoTitleEl.className = 'animate__animated animate__zoomIn'
    return toDoTitleEl
}

// Add a <p> for the above toDos with text value
const createToDoElement = function(toDo) {
    /* const toDoEl = document.createElement('p')
    toDoEl.textContent = toDo.text
    toDoEl.classList.add('toDoEl')
    return toDoEl */
    const divJD = document.createElement('div')
    divJD.className = 'just-do'
    const lblJD = document.createElement('label')
    lblJD.className = 'lbl'
    lblJD.textContent = toDo.text + ' '
    const ckbJD = document.createElement('input')
    ckbJD.setAttribute('type', 'checkbox')
    ckbJD.setAttribute('id', 'ckb-completed')
    addEventCompleteJustDoCkb(ckbJD)
    lblJD.appendChild(ckbJD)

    divJD.appendChild(lblJD)
    
    return divJD;
}
/* const completeJustDoCkbs = document.querySelectorAll('#ckb-completed')
console.log(completeJustDoCkbs)
completeJustDoCkbs.forEach(addEventCompleteJustDoCkb) */

function addEventCompleteJustDoCkb(completeJustDoCkb) {
    completeJustDoCkb.addEventListener('click', (e) => {
        isCompleted = completeJustDoCkb.checked;
        toDos.completed = isCompleted;
        const lblEl = completeJustDoCkb.parentElement;
        if(isCompleted) {
            lblEl.classList.add('done')
        }else {
            lblEl.classList.remove('done')
        }
    })
}

const createToDoDivLblCkb = (toDo) => {
    const divJD = document.createElement('div')
    const lblJD = document.createElement('label')
    lblJD.textContent = toDo.text
    const ckbJD = document.createElement('input')
    ckbJD.setAttribute('type', 'checkbox')
    ckbJD.setAttribute('id', 'ckb-completed')
    lblJD.appendChild(ckb)
    
    divJD.appendChild(lblJD)
}
// render toDos
const renderToDos = (toDos) => {
    toDosContainer.innerHTML = '';
    toDosContainer.appendChild(createToDoTitle());
    searchText = filterObj.searchText

    toDos.forEach((toDo) => {
        toDosContainer.appendChild(createToDoElement(toDo))
    })
}

const filteredToDos = (toDos, filterObj) => {
    return toDos.filter((toDo) => {
        if(!filterObj.hideCompleted){
            return toDo.text.toLowerCase().includes(filterObj.searchText);
        } else {
            return toDo.text.toLowerCase().includes(filterObj.searchText) && !toDo.completed
        }
    })
}

renderToDos(filteredToDos(toDos, filterObj));

//events
toDoFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDoInputEl = e.target.elements.addToDoInput;
    toDoText = addToDoInputEl.value;
    if(toDoText.trim().length > 0) {
        toDo = {
            text: toDoText,
            completed: false
        }
        toDos.push(toDo);
        addToDoInputEl.value = '';
        renderToDos(filteredToDos(toDos, filterObj));
    }
    
})

searchToDosInputEl.addEventListener('input', (e) => {
    filterObj.searchText = e.target.value;
    renderToDos(filteredToDos(toDos, filterObj));
})

sortToDosBtnEl.addEventListener('click', (e) => {
    renderToDos(sortToDos(filteredToDos(toDos, filterObj)));
})

hideCompletedCkbEl.addEventListener('click', (e) => {
    filterObj.hideCompleted = e.target.checked;
    renderToDos(filteredToDos(toDos, filterObj));
})

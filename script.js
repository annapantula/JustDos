const toDos = [
    {
        text: 'Complete RealityCheck part 2',
        completed: false
    },
    {
        text: 'Saucelabs alternative',
        completed: true
    },
    {
        text: 'RealityCheck mobile',
        completed: false
    },
    {
        text: 'Mail to teams about Saucelabs',
        completed: true
    },
    {
        text: 'Check board',
        completed: true
    },
    {
        text: 'RealityCheck mobile -2',
        completed: false
    },
    {
        text: 'Mail to teams about Saucelabs -2',
        completed: false
    },
    {
        text: 'Check board -2',
        completed: false
    }
]


const filterText = {
    searchText : ''
}

// Elements
const toDosContainer = document.querySelector('#to-dos');
const searchToDosInputEl = document.querySelector('#search-todos');
const sortToDosBtnEl = document.querySelector('#sort-todos')
const toDoFormEl = document.querySelector('#todo-form')

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
    let toDosLeftNumber = getToDosLeft(filterToDos(toDos, filterText.searchText)).length;
    let title = `You have ${toDosLeftNumber} Just Do's left`;
    const toDoTitleEl = document.createElement('h4')
    toDoTitleEl.textContent = title
    toDoTitleEl.className = 'text-uppercase'
    toDoTitleEl.className = 'animate__animated animate__zoomIn'
    return toDoTitleEl
}

// Add a <p> for the above toDos with text value
const createToDoElement = function(toDo) {
    const toDoEl = document.createElement('p')
    toDoEl.textContent = toDo.text + '(' + toDo.completed  +')'
    toDoEl.classList.add('toDoEl')
    return toDoEl
}
// render toDos
const renderToDos = (toDos) => {
    toDosContainer.innerHTML = '';
    toDosContainer.appendChild(createToDoTitle());
    searchText = filterText.searchText

    toDos.forEach((toDo) => {
        toDosContainer.appendChild(createToDoElement(toDo))
    })
}

const filterToDos = (toDos, searchText) => {
    return toDos.filter((toDo) => {
        return toDo.text.toLowerCase().includes(searchText.toLowerCase())
    })
}
renderToDos(filterToDos(toDos, filterText.searchText));

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
        renderToDos(filterToDos(toDos, filterText.searchText));
    }
    
})

searchToDosInputEl.addEventListener('input', (e) => {
    filterText.searchText = e.target.value;
    renderToDos(filterToDos(toDos, filterText.searchText));
})

sortToDosBtnEl.addEventListener('click', (e) => {
    renderToDos(sortToDos(filterToDos(toDos, filterText.searchText)));
})

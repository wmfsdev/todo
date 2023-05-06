import './style.css';
import { todoFactory, projectFactory, Collection }  from './factories.js'
import pubsub from './pubsub.js'
import initialRender from './dom.js'


document.addEventListener('DOMContentLoaded', () => {
    initialRender()
})

let projects = []
let projectTodos = []

//-- FORMS --
//-- BUTTONS --
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const todo = createTodo(formData)
    const collectTodo = assignCollection(todo)
    pushToCollection(collectTodo)
})

document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    createProject(projectData)
})

// --------

const createUUID = () => self.crypto.randomUUID()

function assignCollection(todo) {
    const project = Collection(todo, createUUID())
    return project
}

function pushToCollection(collectTodo) {
    projectTodos.push(collectTodo)
    pubsub.publish('todoAdded', projectTodos)
}

function createTodo(formData) {  
    const todo = todoFactory(formData.get('title'), formData.get('desc'))
    return todo
}

function createProject(projectData) {
    const project = projectFactory(projectData.get('title'))
    console.log(project.title)
}

export default projectTodos
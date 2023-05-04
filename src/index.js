import './style.css';
import { todoFactory, Collection }  from './factories.js'
import pubsub from './pubsub.js'
import initialRender from './dom.js'


document.addEventListener('DOMContentLoaded', () => {
    initialRender()
})

//-- FORMS --
//-- BUTTONS --
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const todo = createTodo(formData)
    const collectTodo = assignCollection(todo)
    pushToCollection(collectTodo)

    //renderDom()
})

document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    createProject(projectData)
})

// --------
//let todos = []

let projectTodos = []


const createUUID = () => self.crypto.randomUUID()

function assignCollection(todo) {
    const project = Collection('hey', todo, createUUID())
//  console.log(project)
    return project
}

function pushToCollection(collectTodo) {
    projectTodos.push(collectTodo)
    pubsub.publish('todoAdded', projectTodos)
 // console.log(projectTodos)
}

function createTodo(formData) {  
    const todo = todoFactory(formData.get('title'), formData.get('desc'))
 // formData.get('title')
    return todo
}


// function createProject(projectData) {
//     const project = projectsFactory(projectData.get('title'))
//     console.log(project.title)
// }

export default projectTodos
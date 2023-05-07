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

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const todo = createTodo(formData)
    const collectTodo = assignCollection(todo)
    pushCollectable(collectTodo)
    pushToProject(collectTodo)
})

document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    const project = createProject(projectData)
    const collectProject = assignCollection(project)
    console.log(collectProject)
    pushToProjectsArray(collectProject)
})

document.querySelector('.logger').addEventListener('click', (e) => {
    e.preventDefault()
    console.log(projectTodos)
     console.log(projects[0].data.stuff[0])
     console.log(projects)
})


const createUUID = () => self.crypto.randomUUID()

function pushToProject(collectTodo) {
  // projects.push(collectTodo)

    // console.log('project array: ' + projects[0].id)
}

function pushToProjectsArray(newProject) {
    projects.push(newProject)
    console.log(projects)
}

function createTodo(formData) {  
    const todo = todoFactory(formData.get('title'), formData.get('desc'))
    return todo
}   // create the todo


function assignCollection(object) {
    const collectable = Collection(object, createUUID())
    console.log(collectable.data.stuff)
    return collectable
}   // turn todo/project into object and assign an ID


function pushCollectable(collectTodo) {
    projectTodos.push(collectTodo)

    // will need some way of determining which array to push the todos into

    projects[0].data.stuff.push(collectTodo)
    //pubsub.publish('projectAdded', )// project data)
    console.log(projectTodos)
    pubsub.publish('todoAdded', projectTodos)
}   // create new object from todo/project object and ID, push to array


function createProject(projectData) {
    const project = projectFactory(projectData.get('title'))
    console.log(project.title)
    return project
}


export default projectTodos
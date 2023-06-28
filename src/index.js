import './style.css';
import { todoFactory, projectFactory, Collection }  from './factories.js'
import pubsub from './pubsub.js'
import { store } from './storage.js'
import { initialRender, subscriptions } from './dom.js'


document.addEventListener('DOMContentLoaded', () => {
    sealDefaultProject() // generates default project Object to populate an array
    // on refresh sealDefault won't create a default project and there won't be anything in the 
    // projectCreation.projects array to render so we need to parse the localStorage first and re-create
    // the object before we move on to render it
    // NOTHING CAN RENDER IF ANYTHING IN STORAGE FAILS i.e. parsing JSON

    initialRender(projectCreation.projects[0])
    subscriptions()
})

document.querySelector('#select').addEventListener('click', (e) => {
    const selectProject = projectCreation.projects.find(item => item.id === e.target.value)
    projectCreation.lastCreatedIndex = selectProject.index
    pubsub.publish('newProject', selectProject)
    pubsub.publish('todoAdded', selectProject)
})


// -- FORMS --
// -- NEW TODO --

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    if (document.querySelector('.remove-button') === null) {
        alert('You need to create a new project first')
        return
    }
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const todo = todoCreation.createTodo(formData)
    const collectTodo = assignCollection(todo)
    todoCreation.pushToProject(collectTodo)
    store.storeTodo(projectCreation.projects[misc.determineProject()], misc.determineProject(), misc.projectId())
}) // TODO FORM


const misc = {

    projectId: () => { 
        const test = document.querySelector('.remove-button').dataset.removeId
        return test
    },

    determineProject: () => {
        for (let i = 0; i < projectCreation.projects.length; i++) {
            if (projectCreation.projects[i].id === misc.projectId()) {
                return i
            }
        }
    }
}


// -- NEW PROJECT --

document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    const project = projectCreation.createProject(projectData)
    const collectProject = assignCollection(project)
    projectCreation.pushToProjectsArray(collectProject)
    store.storeProject(collectProject, projectCreation.projects.length - 1)
    pubsub.publish('selectProject', )
}) // PROJECT FORM

document.querySelector(".project").addEventListener("click", function(e) {
	if((e.target && e.target.dataset.action === "delete-project") ) {  // && projectCreation.projects.length >= 2
        projectCreation.removeProject(e.target.dataset.removeId)
        projectCreation.updateTodo(e.target.dataset.removeId)
        projectCreation.updateProject(e.target.dataset.removeId)
        pubsub.publish('selectProject',)
	}
})  // DELETE PROJECT - BUTTON

document.querySelector(".project").addEventListener("click", function(e) {
	if(e.target && e.target.dataset.action === "edit-project") {
	} 
}) // EDIT PROJECT - BUTTON

document.querySelector('.todo-container').addEventListener('click', function(e) {
    if (e.target && e.target.dataset.action === 'edit-todo') {
        const projectID = e.target.dataset.projectId 
        const todoID = e.target.dataset.id 
        pubsub.publish('todoEdited', [todoID, projectID])
        pubsub.publish('prioritySlider', '#edit-form')
    } 
}) // EDIT TODO

document.querySelector('.todo-container').addEventListener('click', function(e) {
    if (e.target && e.target.dataset.action === 'del-todo') {
        const projectID = e.target.dataset.projectId 
        const todoID = e.target.dataset.id 
        todoUpdates.deleteTodo(todoID, projectID)
    } 
}) // DELETE TODO


document.querySelector('.edit-container').addEventListener('click', function(e) {
    if (e.target.dataset.action === 'edit-cancel') {
        pubsub.publish('clearEditButton',)
    } 
}) // CANCEL

document.querySelector('.edit-container').addEventListener('submit', function(e) {
    e.preventDefault()

        const form = document.querySelector('#edit-form')
        const formData = new FormData(form)
        const todoID = document.querySelector('.update-title').dataset.todoUpdateId     // e.target.dataset.todoUpdateId
        const projectID = document.querySelector('.update-title').dataset.projectId     //e.target.dataset.projectId
       
        todoUpdates.findTodo(projectID, todoID)
        todoUpdates.setTodo(formData)

        store.storeTodo(
            projectCreation.projects[todoUpdates.parentProjectIndex],   // project
            todoUpdates.parentProjectIndex,                             // project index
            todoID                                                      
        )
        store.storeProject(
            projectCreation.projects[todoUpdates.parentProjectIndex],
            todoUpdates.parentProjectIndex
        )
        pubsub.publish('todoAdded', projectCreation.projects[todoUpdates.parentProjectIndex])
        pubsub.publish('clearEditButton',)
}) // SAVE EDIT

// ===/===

const createUUID = () => self.crypto.randomUUID()

function sealDefaultProject() {
    if (localStorage.length === 0) {
        const project = projectFactory('Your First Project')
        const collectProject = assignCollection(project)
        projectCreation.projects.push(Object.seal(collectProject))
        store.storeProject(collectProject, projectCreation.projects.length - 1)
    } else {
        console.log('else')
        store.parseProject()
        store.parseTodo()
    }
}


// --- TODO METHODS ---

const todoUpdates = {

    parentProjectIndex: 0,
    foundTodoIndex: 0,

    findTodo: (projectID, todoID) => {
        todoUpdates.parentProjectIndex = projectCreation.projects.findIndex(project => project.id === projectID)
        const parentProject = projectCreation.projects.find(project => project.id === projectID)
        const foundTodo = parentProject.data.stuff.find(todo => todo.id === todoID)
        todoUpdates.foundTodoIndex = parentProject.data.stuff.findIndex(todo => todo.id === todoID)
    },

    setTodo: formData => {
        const todo = projectCreation.projects[todoUpdates.parentProjectIndex].data.stuff[todoUpdates.foundTodoIndex].data
        todo.setProperty('title', formData.get('update-title'))
        todo.setProperty('desc', formData.get('update-desc'))
        todo.setProperty('due', formData.get('due'))
        todo.setProperty('priority', formData.get('priority-input'))
    },

    deleteTodo: (todoID, projectID) => {
        const projectIndex = projectCreation.projects.findIndex(item => item.id === projectID)
        const todoIndex = projectCreation.projects[projectIndex].data.stuff.findIndex(item => item.id === todoID)
        projectCreation.projects[projectIndex].data.stuff.splice(todoIndex, 1)
        store.removeTodo(todoID)
        pubsub.publish('todoAdded', projectCreation.projects[projectIndex])
    },

    setProject: () => {
    }
}

const todoCreation = {

    createTodo: formData => {  
        const todo = todoFactory(
            formData.get('title'), 
            formData.get('desc'), 
            formData.get('due'), 
            formData.get('priority-input')
            )
        return todo
    },

    pushToProject: collectTodo => {
        projectCreation.projects[projectCreation.lastCreatedIndex].data.stuff.push(collectTodo)
        pubsub.publish('todoAdded', projectCreation.projects[projectCreation.lastCreatedIndex])
    }
}

const assignCollection = (object) => {
    const collectable = Collection(object, createUUID())
    return collectable
}


// --- PROJECT METHODS ---

const projectCreation = {
    lastCreatedIndex:  0,

    projects: [],

    createProject: projectData => {
        const project = projectFactory(projectData.get('title'))
        return project
    },

    pushToProjectsArray: newProject => {
        projectCreation.projects.push(newProject)
        projectCreation.lastCreatedIndex = projectCreation.projects.length - 1
        pubsub.publish('newProject', newProject)
    },

    removeProject: projectID => {
        const projectIndex = projectCreation.projects.findIndex(item => item.id === projectID)
        store.removeProject(projectCreation.projects[projectIndex])
        projectCreation.projects.splice(projectIndex, 1)
        pubsub.publish('projectRemoved', projectID)
    },

    updateProject: () => {
       projectCreation.projects.forEach(project => store.storeProject(project, projectCreation.projects.indexOf(project)))
    },

    updateTodo: () => {
        projectCreation.projects.forEach(project => store.storeTodo(project, projectCreation.projects.indexOf(project), project.id))
    }
}


export { assignCollection, createUUID, projectCreation }
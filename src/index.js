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
    
    console.log(projectCreation.projects)
    initialRender(projectCreation.projects[0])
    subscriptions()
})

document.querySelector('#select').addEventListener('click', (e) => {
    const selectProject = projectCreation.projects.find(item => item.id === e.target.value)
    console.log(selectProject.index)
    projectCreation.lastCreatedIndex = selectProject.index
    pubsub.publish('newProject', selectProject)
    pubsub.publish('todoAdded', selectProject)

    console.log(selectProject)
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

    console.log('===============')
    console.log(collectTodo)
    // console.log(projectCreation.projects[misc.determineProject()])
    // console.log(misc.determineProject())
    // console.log(misc.projectId())
    console.log('===============')

    store.storeTodo(projectCreation.projects[misc.determineProject()], misc.determineProject(), misc.projectId())

}) // TODO FORM


const misc = {

    projectId: () => { 
        const test = document.querySelector('.remove-button').dataset.removeId
      //  console.log(test)
        return test
    },

    determineProject: () => {
        for (let i = 0; i < projectCreation.projects.length; i++) {
            if (projectCreation.projects[i].id === misc.projectId()) {
              //  console.log(projectCreation.projects[i].id)
              //  console.log(misc.projectId())
                return i
            }
        }
    }
}

// function determineProject() {

//     const projectID = document.querySelector('.remove-button').dataset.removeId

//     for (let i = 0; i < projectCreation.projects.length; i++) {
//         if (projectCreation.projects[i].id === projectID) {
//             return i
//         }
//     // console.log(document.querySelector('.remove-button').dataset.removeId)
//     // projectCreation.projects.indexOf(document.querySelector('.remove-button').dataset.removeId)
//     }
// }

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

// document.querySelector('.logger').addEventListener('click', (e) => {
    
//    console.log(projectCreation.projects)
// }) // LOGGER

document.querySelector(".project").addEventListener("click", function(e) {
	if((e.target && e.target.dataset.action === "delete-project") ) {  // && projectCreation.projects.length >= 2
        projectCreation.removeProject(e.target.dataset.removeId)
        projectCreation.updateTodo(e.target.dataset.removeId)
        projectCreation.updateProject(e.target.dataset.removeId)
        pubsub.publish('selectProject',)
	} // else alert("Minimum one Project required")
    // e.target.setAttribute("disabled", true)
})  // DELETE PROJECT - BUTTON

document.querySelector(".project").addEventListener("click", function(e) {
	if(e.target && e.target.dataset.action === "edit-project") {
     console.log('edit')
	} 
    //e.target.setAttribute("disabled", true)
}) // EDIT PROJECT - BUTTON

document.querySelector('.todo-container').addEventListener('click', function(e) {
    if (e.target && e.target.dataset.action === 'edit-todo') {
        const projectID = e.target.dataset.projectId 
        const todoID = e.target.dataset.id 
        // const editValue = "#edit-value" 
        // const editPriority = "#edit-priority-input" 
        pubsub.publish('todoEdited', [todoID, projectID])
        pubsub.publish('prioritySlider', '#edit-form') // needs to take parameter, the parent div
        // projectCreation.projects.forEach(project => { /// important
        //     console.log(projectCreation.projects)  
        // const todoIndexValue = project.data.stuff.findIndex(item => item.id === e.target.dataset.id)
       
        //console.log(project.data.stuff[todoIndexValue].data.getProperty('id'))  
        // projectCreation.projects.data.stuff[0].forEach(project => {
        //     console.log(project)

            // if (e.target.dataset.id === project.data.getProperty(`id`)) {
            //     console.log('hey')
            // }
         //console.log(project.data.getProperty(`${e.target.dataset.id}`))
           //Property(`${e.target.dataset.id}`)
          //  console.log(project.data.stuff)
       // })
       // console.log(projectCreation.projects.getProperty('id'))
      //  pubsub.publish('removeTodo', e.target.dataset.id)
		//console.log(e.target.dataset.id);
    } 
}) // EDIT TODO

document.querySelector('.todo-container').addEventListener('click', function(e) {
    if (e.target && e.target.dataset.action === 'del-todo') {
        const projectID = e.target.dataset.projectId 
        const todoID = e.target.dataset.id 
        console.log(projectID)
        console.log(todoID)

        todoUpdates.deleteTodo(todoID, projectID)

     //   pubsub.publish('deleteTodo', [todoID, projectID])
        
    } 
}) // DELETE TODO



document.querySelector('.edit-container').addEventListener('click', function(e) {
    if (e.target.dataset.action === 'edit-cancel') {
        pubsub.publish('clearEditButton',)
    } 
}) // CANCEL

document.querySelector('.edit-container').addEventListener('submit', function(e) {
    e.preventDefault()
   
    
   //  (e.target.dataset.action === 'save-todo-changes') { 
        console.log("test")
        const form = document.querySelector('#edit-form')
        const formData = new FormData(form)
        console.log(formData.values())
        const todoID = document.querySelector('.update-title').dataset.todoUpdateId     // e.target.dataset.todoUpdateId
        const projectID = document.querySelector('.update-title').dataset.projectId  //e.target.dataset.projectId
        console.log(todoID)
        console.log(projectID)
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
  // }
}) // SAVE EDIT

const createUUID = () => self.crypto.randomUUID()


function sealDefaultProject() {
    if (localStorage.length === 0) {
        const project = projectFactory('Your First Project')
        const collectProject = assignCollection(project)
        projectCreation.projects.push(Object.seal(collectProject))
       // console.log(projectCreation.projects)
        store.storeProject(collectProject, projectCreation.projects.length - 1)
        console.log(collectProject)
    } else {
        console.log('else')
       // projectCreation.projects = []
      //  console.log(projectCreation.projects)
     
        store.parseProject()
         store.parseTodo()
    }
}

const todoUpdates = {

    parentProjectIndex: 0,
    foundTodoIndex: 0,

    findTodo: (projectID, todoID) => {
       console.log(projectCreation.projects)

        //console.log(projectCreation.projects.findIndex(project => project.id === projectID))
        todoUpdates.parentProjectIndex = projectCreation.projects.findIndex(project => project.id === projectID)
        const parentProject = projectCreation.projects.find(project => project.id === projectID)

        const foundTodo = parentProject.data.stuff.find(todo => todo.id === todoID)
        todoUpdates.foundTodoIndex = parentProject.data.stuff.findIndex(todo => todo.id === todoID)
      //  console.log(projectCreation.projects[0].data.stuff[0].data.getObject()) // works
        console.log(todoUpdates.parentProjectIndex)
    },

    setTodo: formData => {
        // console.log(todoUpdates.parentProjectIndex)
        // console.log(todoUpdates.foundTodoIndex)

        const todo = projectCreation.projects[todoUpdates.parentProjectIndex].data.stuff[todoUpdates.foundTodoIndex].data
        console.log(formData.get('update-desc'))
        todo.setProperty('title', formData.get('update-title'))
        todo.setProperty('desc', formData.get('update-desc'))
        todo.setProperty('due', formData.get('due'))


        todo.setProperty('priority', formData.get('priority-input')) // need to query dom output?


        console.log(projectCreation.projects[todoUpdates.parentProjectIndex].data.stuff[todoUpdates.foundTodoIndex].data.getObject())
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
   // projectTodos: [],

    createTodo: formData => {  
        const todo = todoFactory(
            formData.get('title'), 
            formData.get('desc'), 
            formData.get('due'), 
            formData.get('priority-input')
            )
        return todo
    },  

    // pushCollectable: collectTodo => {
    //     todoCreation.projectTodos.push(collectTodo)
    //    // pubsub.publish('todoAdded', todoCreation.projectTodos) // change from the basic array in this object
    //     // to the complex array in ProjectCreation - 
    // },

    pushToProject: collectTodo => {
        projectCreation.projects[projectCreation.lastCreatedIndex].data.stuff.push(collectTodo)
        pubsub.publish('todoAdded', projectCreation.projects[projectCreation.lastCreatedIndex])
        console.log(projectCreation.projects[projectCreation.lastCreatedIndex])
    }
}


const assignCollection = (object) => {
    const collectable = Collection(object, createUUID())
    return collectable
}


const projectCreation = {
    lastCreatedIndex:  0,

    projects: [
        // {
        // data: {
        //         title: 'default',
        //         stuff: []
        // },
        // id: '55555'
        // }
    ],

    createProject: projectData => {
        const project = projectFactory(projectData.get('title'))
        return project
    },

    pushToProjectsArray: newProject => {
        console.log(newProject)
        projectCreation.projects.push(newProject)
        projectCreation.lastCreatedIndex = projectCreation.projects.length - 1
        pubsub.publish('newProject', newProject)
    },

    removeProject: projectID => {
        console.log(projectID)
        console.log(projectCreation.projects)
        const projectIndex = projectCreation.projects.findIndex(item => item.id === projectID)
        console.log(projectIndex)
        store.removeProject(projectCreation.projects[projectIndex])

        projectCreation.projects.splice(projectIndex, 1)

     //   store.updateProject(projectIndex, projectID)

        pubsub.publish('projectRemoved', projectID)
    },

    updateProject: () => {
    console.log(projectCreation.projects)
       projectCreation.projects.forEach(project => store.storeProject(project, projectCreation.projects.indexOf(project)))
    },

    updateTodo: () => {
        projectCreation.projects.forEach(project => store.storeTodo(project, projectCreation.projects.indexOf(project), project.id))
    }
}


export { assignCollection, createUUID, projectCreation }
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

    initialRender(projectCreation.projects[0])
    subscriptions()
})

// function store(project, projectIndex) {
// // console.log(project, projectIndex)
//     const test = {
//         id: project.id,
//         title: project.data.title,
//         index: projectIndex
//     }   
//    // console.log(test)
//     localStorage[`${project.id}`] = JSON.stringify(test)
//     pass()
//   // localStorage.setItem(project.id, JSON.stringify(test))
// //console.log(id, data)
//   // console.log(localStorage.getItem(id, data))
// }
// function pass() {
//     let parse = {}
//     for (let i = 0; i < localStorage.length; i++) { // 
//         parse = JSON.parse(localStorage.getItem(localStorage.key(i)));  // 
//       }
//       console.log(parse)
//         // const project = projectFactory()
//         // const assignedProject = assignCollection(project)
//         // console.log(assignedProject)
//         // const test = Object.assign(assignedProject, parse)
//         // console.log(test)
//         // projectCreation.projects.push(assignedProject)
//     const project = projectFactory(parse.title)
//     const assignedProject = assignCollection(project)
//     console.log(assignedProject.id = parse.id)
//     projectCreation.projects.push(assignedProject)
// }
// function renderStore() {
//     // 
// }

// -- FORMS --
// -- NEW TODO --
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    // for (const key of formData.keys()) {
    //     console.log(key);
    //   }
    const todo = todoCreation.createTodo(formData)
    console.log(todo)
    const collectTodo = assignCollection(todo)
   // todoCreation.pushCollectable(collectTodo)
  //  console.log(collectTodo)
    todoCreation.pushToProject(collectTodo) 
})

// -- NEW PROJECT --
document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    const project = projectCreation.createProject(projectData)
    const collectProject = assignCollection(project)
    //store(collectProject)
   // console.log(collectProject)
    projectCreation.pushToProjectsArray(collectProject)
    store.storeProject(collectProject, projectCreation.projects.length - 1)
   // projectCreation.clearProjectTodos()
})

document.querySelector('.logger').addEventListener('click', (e) => {
    
   console.log(projectCreation.projects)
})

document.querySelector(".project").addEventListener("click", function(e) {
	if(e.target.dataset.action === "delete-project") {
        projectCreation.removeProject(e.target.dataset.removeId)
	}
})

document.querySelector('.todo-container').addEventListener('click', function(e) {
    if (e.target.dataset.action === 'edit-todo') {
        const projectID = e.target.dataset.projectId 
        const todoID = e.target.dataset.id 
        pubsub.publish('todoEdited', [todoID, projectID])
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
})

document.querySelector('.edit-container').addEventListener('click', function(e) {
    if (e.target.dataset.action === 'edit-cancel') {
        pubsub.publish('clearEditButton',)
    } 
})

document.querySelector('.edit-container').addEventListener('click', function(e) {
    e.preventDefault()
    
    if (e.target.dataset.action === 'save-todo-changes') {
        const form = document.querySelector('#edit-form')
        const formData = new FormData(form)
        
         //console.log(formData.get('update-title'))

        const todoID = e.target.dataset.todoUpdateId
        const projectID = e.target.dataset.projectId
        
        todoUpdates.findTodo(projectID, todoID)
        todoUpdates.setTodo(formData)
        pubsub.publish('todoAdded', projectCreation.projects[todoUpdates.parentProjectIndex])
        pubsub.publish('clearEditButton',)
    }
})

const createUUID = () => self.crypto.randomUUID()

function sealDefaultProject() {
    if (localStorage.length === 0) {
        const project = projectFactory('first project')
        const collectProject = assignCollection(project)
        projectCreation.projects.push(Object.seal(collectProject))
        console.log(projectCreation.projects)
        store.storeProject(collectProject, projectCreation.projects.length - 1)
        
    } else {
        store.parseProject()
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
        console.log(todo)
        todo.setProperty('title', formData.get('update-title'))

        console.log(projectCreation.projects[todoUpdates.parentProjectIndex].data.stuff[todoUpdates.foundTodoIndex].data.getObject())
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
        //  console.log(projectCreation.projects)
        projectCreation.projects.push(newProject)
        console.log(newProject)
        //console.log(newProject.data.title)
        projectCreation.lastCreatedIndex = projectCreation.projects.length - 1
        pubsub.publish('newProject', newProject)
    },

    removeProject: projectID => {
        console.log(projectCreation.projects)
        const projectIndex = projectCreation.projects.findIndex(item => item.id === projectID)
        projectCreation.projects.splice(projectIndex, 1)
        pubsub.publish('projectRemoved', projectID)
        
        console.log(projectIndex)
        console.log(projectCreation.projects)
    }
}


export { assignCollection, createUUID, projectCreation }

// let projects = [
//     {
//         data: {
//             title: 'default',
//             stuff: []
//         },
//         id: '55555'
//     }
// ]

// let lastCreatedIndex = 0

// function pushToProjectsArray(newProject) {
//     projects.push(newProject)
//     lastCreatedIndex = projects.length - 1
//     console.log(lastCreatedIndex)
//     console.log(newProject)
// }

// function createProject(projectData) {
//     const project = projectFactory(projectData.get('title'))
//     pubsub.publish('newProject', project)
//     console.log(project.title)
//     return project
// }



// function createTodo(formData) {  
//     const todo = todoFactory(formData.get('title'), formData.get('desc'))
//     return todo
// }   // create the todo

// function pushToProject(collectTodo) {   // a second parameter to identify the correct
//     // index to push todos - for when switching between Projects
// // need to check which Project we are working on
// //pubsub.subscribe('whichProject', determineProject())

// // if (projects.length === 0) {
// //     const project = createProject('test')
// //     const collectProject = assignCollection(project)
// //     console.log(collectProject)
// // }
// projects[lastCreatedIndex].data.stuff.push(collectTodo)
// }

// function pushCollectable(collectTodo) {
//     todoCreation.projectTodos.push(collectTodo)
//     // will need some way of determining which array to push the todos into
//    // projects[0].data.stuff.push(collectTodo)
//     //pubsub.publish('projectAdded', )// project data)
//    //console.log(projectTodos)
//     pubsub.publish('todoAdded', todoCreation.projectTodos)
// }   // create new object from todo/project object and ID, push to array

// assignCollection is needed for project creation as well... mmm?
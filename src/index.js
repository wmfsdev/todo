import './style.css';
import { todoFactory, projectFactory, Collection }  from './factories.js'
import pubsub from './pubsub.js'
import initialRender from './dom.js'


document.addEventListener('DOMContentLoaded', () => {
    initialRender()
})

// -- FORMS --
// -- NEW TODO --
document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#form')
    const formData = new FormData(form)
    const todo = todoCreation.createTodo(formData)
    const collectTodo = assignCollection(todo)
    todoCreation.pushCollectable(collectTodo)
    todoCreation.pushToProject(collectTodo)
    
})

// -- NEW PROJECT --
document.querySelector('#project-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const projectForm = document.querySelector('#project-form')
    const projectData = new FormData(projectForm)
    const project = projectCreation.createProject(projectData)
    const collectProject = assignCollection(project)
    console.log(collectProject)
    projectCreation.pushToProjectsArray(collectProject)
    projectCreation.clearProjectTodos()
})

document.querySelector('.logger').addEventListener('click', (e) => {
     console.log(projectCreation.projects)
})


document.querySelector(".project").addEventListener("click", function(e) {
	if(e.target.dataset.action === "delete") {
		console.log('hey'); // 
	}
});

// document.getElementById('.remove-button').addEventListener('click', (e) => {
//     console.log('hey')
// })


const todoCreation = {
    projectTodos: [],

    createTodo: formData => {  
        const todo = todoFactory(formData.get('title'), formData.get('desc'))
        return todo
    },   // create the todo

    pushCollectable: collectTodo => {
        todoCreation.projectTodos.push(collectTodo)
        pubsub.publish('todoAdded', todoCreation.projectTodos)
    },

    pushToProject: collectTodo => {
        projectCreation.projects[projectCreation.lastCreatedIndex].data.stuff.push(collectTodo)
    }
}

const createUUID = () => self.crypto.randomUUID()

function assignCollection(object) {
    const collectable = Collection(object, createUUID())
    // console.log(collectable.data.stuff)
    return collectable
}   // turn todo/project into object and assign an ID

const projectCreation = {
    lastCreatedIndex:  0,

    projects: [
        {
        data: {
                title: 'default',
                stuff: []
        },
        id: '55555'
        }
    ],

    createProject: projectData => {
        const project = projectFactory(projectData.get('title'))
        // console.log(project)
        return project
    },

    pushToProjectsArray: newProject => {
        projectCreation.projects.push(newProject)
        projectCreation.lastCreatedIndex = projectCreation.projects.length - 1
        pubsub.publish('newProject', newProject)
        
        //console.log(newProject)
        // console.log(projectCreation.lastCreatedIndex)
    },

    clearProjectTodos: () => {
        todoCreation.projectTodos = []
    },
}


export default todoCreation.projectTodos



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
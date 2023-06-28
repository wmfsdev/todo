import { todoFactory, projectFactory  } from "./factories"
import { assignCollection, projectCreation } from './index'


const store = {

    project: {},

    storeProject: (project, projectIndex) => {
        const storedProject = {
            id: project.id,
            title: project.data.title,
            index: projectIndex,
        }  

        localStorage[`proj-${project.id}`] = JSON.stringify(storedProject)
    },

    storeTodo: (project, projectIndex, projectID) => {

        let storedTodo

        project.data.stuff.forEach(todo => { 
            storedTodo = {
                title: todo.data.title,
                priority: todo.data.priority,
                desc: todo.data.desc,
                due: todo.data.due,
                pid: projectID,
                id: todo.id,
                projectIndex: projectIndex,
                todoIndex: project.data.stuff.indexOf(todo)
            }

            localStorage[`todo-${todo.id}`] = JSON.stringify(storedTodo)
        });    
    },

    parseTodo: () => {

        let parse = {}

            for (let i = 0; i < localStorage.length; i++) {
  
                if (localStorage.key(i).charAt(0) === 't') {
                   
                    parse = JSON.parse(localStorage.getItem(localStorage.key(i))); 

                    const project = todoFactory()
                    const assignedProject = assignCollection(project)

                    assignedProject.id = parse.id
                    assignedProject.projectIndex = parse.projectIndex
                    assignedProject.data.priority = parse.priority
                    assignedProject.data.title = parse.title
                    assignedProject.data.desc = parse.desc
                    assignedProject.data.due = parse.due
                    assignedProject.data.todoIndex = parse.todoIndex

                    projectCreation.projects[assignedProject.projectIndex].data.stuff.push(assignedProject)
                    projectCreation.projects[assignedProject.projectIndex].data.stuff.sort((a, b) => (a.data.todoIndex > b.data.todoIndex) ? 1 : -1)
                }
            }
    },

    parseProject: () => {

        let parse = {}

            for (let i = 0; i < localStorage.length; i++) {

                if (localStorage.key(i).charAt(0) === 'p') {
                    parse = JSON.parse(localStorage.getItem(localStorage.key(i))); 
                    const project = projectFactory()
                    const assignedProject = assignCollection(project)

                    assignedProject.id = parse.id
                    assignedProject.index = parse.index
                    assignedProject.data.title = parse.title

                    projectCreation.projects.push(assignedProject)
                    projectCreation.projects.sort((a, b) => (a.index > b.index) ? 1 : -1)
                }
            }
        },
    
    removeProject: project => {
        const projectID = project.id
        project.data.stuff.forEach(todo => {
            store.removeTodo(todo.id)
        })
        localStorage.removeItem(`proj-${projectID}`)
    },

    removeTodo: todoID => {
        localStorage.removeItem(`todo-${todoID}`)
    },
}


export { store } 
import { todoFactory, projectFactory, Collection  } from "./factories"
import { assignCollection, createUUID, projectCreation } from './index'


const store = {

    project: {},

    storeProject: (project, projectIndex) => {

        const storedProject = {
        
            id: project.id,
            title: project.data.title,
            index: projectIndex,
            // todo: {
            //    // id: project.data.stuff.id,
            //     stuff: project.data.stuff,
            //         // index: 
            // }
        }  

        localStorage[`${project.id}`] = JSON.stringify(storedProject)
            
        // localStorage.setItem(project.id, JSON.stringify(test))
        //  console.log(localStorage.getItem(id, data))
    },

    storeTodo: (todos) => {
        console.log(todos.data.stuff)

        const storedTodo = {
            id: project.data.stuff,
            title: project.data.title,
            index: index
        }
    },
    
    parseProject: () => {

        let parse = {}

            for (let i = 0; i < localStorage.length; i++) { // 
                parse = JSON.parse(localStorage.getItem(localStorage.key(i)));  // 
            }
            
        const project = projectFactory()
        const assignedProject = assignCollection(project)
      
        assignedProject.id = parse.id
        assignedProject.index = parse.index
        assignedProject.data.title = parse.title
        // assignedProject.data.__proto__.title = parse.title

        console.log(assignedProject.data.title)
        projectCreation.projects.push(assignedProject)
        
    },

    // setProject: () => {
    //     const project = projectFactory()
    //     const assignedProject = assignCollection(project)
    //     console.log(assignedProject)
    // },


            // const project = projectFactory()
    //         const assignedProject = assignCollection(project)
    //        console.log(assignedProject)
    
    //         const test = Object.assign(assignedProject, parse)
    //     //    console.log(test)
    //         projectCreation.projects.push(assignedProject)
        
    //         // const project = projectFactory(parse.title)
    //         // const assignedProject = assignCollection(project)
    //         // console.log(assignedProject.id = parse.id)
    //         // projectCreation.projects.push(assignedProject)
    // },
    

    renderStore: () => {
        // 
    }

}


export { store } 
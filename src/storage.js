import { todoFactory, projectFactory, Collection  } from "./factories"
import { assignCollection, createUUID, projectCreation } from './index'


const store = {

    project: {},

    storeProject: (project, projectIndex) => {
        console.log(project)
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

        localStorage[`proj-${project.id}`] = JSON.stringify(storedProject)
            
        // localStorage.setItem(project.id, JSON.stringify(test))
        //  console.log(localStorage.getItem(id, data))
    },

    storeTodo: (projectObject, projectID) => {

        console.log(projectObject)
        console.log(projectID)

        let storedTodo

        projectObject.data.stuff.forEach(todo => { 
            console.log(todo)
            storedTodo = {
                title: todo.data.title,
                priority: todo.data.priority,
                desc: todo.data.desc,
                due: todo.data.due,
                pid: projectObject.id
            }

            localStorage[`todo-${todo.id}`] = JSON.stringify(storedTodo)
         //   console.log(element)
        });

        const test = todoFactory()
            
       },

        // const todo = project.find(project => property.id) 
        // console.log(todo)
        // console.log(todo.id)
        // }
    
    parseProject: () => {

        let parse = {}

      //  console.log(localStorage)

            for (let i = 0; i < localStorage.length; i++) { // 

            // console.log(localStorage.getItem(prefix => prefix.charAt(0) === 'p'))
            //  console.log((localStorage.getItem(localStorage.key(i).charAt(0) === 'p')))

                if (localStorage.key(i).charAt(0) === 'p') {

                    parse = JSON.parse(localStorage.getItem(localStorage.key(i)));  // 
                    const project = projectFactory()
                    const assignedProject = assignCollection(project)
                //  console.log(assignedProject)
                    assignedProject.id = parse.id
                    assignedProject.index = parse.index
                    assignedProject.data.title = parse.title
                    projectCreation.projects.push(assignedProject)
                    projectCreation.projects.sort((a, b) => (a.index > b.index) ?1 : -1)
                }
            }
            
            console.log(projectCreation.projects) 
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
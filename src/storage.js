import { todoFactory, projectFactory, Collection  } from "./factories"
import { assignCollection, createUUID, projectCreation } from './index'


const store = {

    project: {},

    storeProject: (project, projectIndex) => {
    //    console.log(project)
        const storedProject = {
        
            id: project.id,
            title: project.data.title,
            index: projectIndex,
        }  

        localStorage[`proj-${project.id}`] = JSON.stringify(storedProject)
            
        // localStorage.setItem(project.id, JSON.stringify(test))
        //  console.log(localStorage.getItem(id, data))
    },

    storeTodo: (project, projectIndex, projectID) => {

        console.log(project)
        console.log(projectIndex)
        console.log(projectID)

        let storedTodo

        project.data.stuff.forEach(todo => { 
            console.log(todo)
            storedTodo = {
                title: todo.data.title,
                priority: todo.data.priority,
                desc: todo.data.desc,
                due: todo.data.due,
                pid: projectID,
                id: todo.id,
                projectIndex: projectIndex,
                todoIndex: project.data.stuff.indexOf(todo)
                // 
            }

            localStorage[`todo-${todo.id}`] = JSON.stringify(storedTodo)
         //   console.log(element)
        });    
    },

    parseTodo: () => {

        let parse = {}
      //  console.log(localStorage.length)

            for (let i = 0; i < localStorage.length; i++) {
  
                if (localStorage.key(i).charAt(0) === 't') {
                    console.log(`test: ${i}`)
                    console.log(localStorage.getItem(localStorage.key(i)))
                 

                    parse = JSON.parse(localStorage.getItem(localStorage.key(i))); 
                    
                 //   console.log(parse)

                    const project = todoFactory()
                    const assignedProject = assignCollection(project)

                    console.log(assignedProject)
                   
                    assignedProject.id = parse.id
                    assignedProject.projectIndex = parse.projectIndex // can figure this out
                    
                    assignedProject.data.priority = parse.priority
                    assignedProject.data.title = parse.title
                    assignedProject.data.desc = parse.desc
                    assignedProject.data.due = parse.due
                    assignedProject.data.todoIndex = parse.todoIndex

                    console.log(assignedProject)
                    
                  //  console.log(assignedProject.projectIndex)
                  //  console.log(projectCreation.projects[assignedProject.index])
                   
                   // console.log(projectCreation.projects)
                   // console.log(assignedProject.data.todoIndex)

                  //  console.log(projectCreation.projects[assignedProject.projectIndex].data.stuff.push(assignedProject))
   
//  projectCreation.projects = []
     //   projectCreation.projects[assignedProject.projectIndex].data.stuff.splice(assignedProject.data.todoIndex, 1, assignedProject)

    projectCreation.projects[assignedProject.projectIndex].data.stuff.push(assignedProject)
  //  projectCreation.projects[assignedProject.projectIndex].data.stuff[assignedProject.data.todoIndex].push(assignedProject)
  
  projectCreation.projects[assignedProject.projectIndex].data.stuff.sort((a, b) => (a.data.todoIndex > b.data.todoIndex) ? 1 : -1)
                    }
            }
    },

    
    parseProject: () => {

        let parse = {}

      //  console.log(localStorage)

            for (let i = 0; i < localStorage.length; i++) {

                if (localStorage.key(i).charAt(0) === 'p') {
                    console.log(localStorage.key(i))
                    parse = JSON.parse(localStorage.getItem(localStorage.key(i))); 
                    const project = projectFactory()
                    const assignedProject = assignCollection(project)
               
                    console.log(assignedProject)

                    assignedProject.id = parse.id
                    assignedProject.index = parse.index
                    assignedProject.data.title = parse.title
                    console.log(assignedProject)
                    console.log(projectCreation.projects)
                    projectCreation.projects.push(assignedProject)
                    projectCreation.projects.sort((a, b) => (a.index > b.index) ? 1 : -1)
                    
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
    
    removeProject: project => {
        console.log(project)
        const projectID = project.id
        project.data.stuff.forEach(todo => {
            console.log(todo)
            store.removeTodo(todo.id)
        })
        localStorage.removeItem(`proj-${projectID}`)
    },

    removeTodo: todoID => {
        console.log(todoID)
        localStorage.removeItem(`todo-${todoID}`)
    },

    
    updateProject: (projectIndex) => {
        
        console.log(projectIndex)
        for (let i = projectIndex + 1 ; i <= localStorage.length ; i++) {
            console.log(i)
            console.log(localStorage.getItem(localStorage.key(i)))
       
         }
    },


    renderStore: () => {
        // 
    }

}


export { store } 
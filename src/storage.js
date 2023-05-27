import { todoFactory, projectFactory, Collection  } from "./factories"
import { assignCollection, createUUID, projectCreation } from './index'


const store = {

    storeProject: (project, projectIndex) => {
        // console.log(project, projectIndex)
        
            const test = {
                id: project.id,
                title: project.data.title,
                index: projectIndex
            }
            
           // console.log(test)
            localStorage[`${project.id}`] = JSON.stringify(test)
            
          //  pass()
    
          // localStorage.setItem(project.id, JSON.stringify(test))
        
        //console.log(id, data)
          // console.log(localStorage.getItem(id, data))
        },
        
        parseProject: () => {

            let parse = {}

            for (let i = 0; i < localStorage.length; i++) { // 
                parse = JSON.parse(localStorage.getItem(localStorage.key(i)));  // 
              }
              console.log(parse)
        
                const project = projectFactory()
                const assignedProject = assignCollection(project)
                console.log(assignedProject)
    
                const test = Object.assign(assignedProject, parse)
                console.log(test)
                projectCreation.projects.push(assignedProject)
        
            // const project = projectFactory(parse.title)
            // const assignedProject = assignCollection(project)
            // console.log(assignedProject.id = parse.id)
            // projectCreation.projects.push(assignedProject)
        },
    
        renderStore: () => {
            // 
        }

}


export { store } 
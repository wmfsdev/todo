
import pubsub from "./pubsub"

// const stuff = {
//     list: [],
//     render: () => {  
//     },
//     addTodo: todo => {
//         console.log("todo")
//      // pubsub.publish('todoUpdate', render.list)
//     }
// }

const initialRender = () => {
    // const div = document.createElement('div')
    // div.classList.add('project-info')
    // div.textContent = "default project"
    // project.prepend(div)
    // const projectTitle = document.querySelector('.project-title')
    // projectTitle.classList.add('project-title')
    // project.prepend(projectTitle)
    // const button = document.createElement('button')
    // button.classList.add('remove-button')
    // button.textContent = "remove project"
    // projectInfo.appendChild(button)

    const projectTemp = document.querySelector('.project-temp').content
    const copy = document.importNode(projectTemp, true)
    document.querySelector('.project').prepend(copy)

    
   // pubsub.subscribe('newProject', rendering.clearTodo)
    pubsub.subscribe('newProject', rendering.renderProject)
    // will render the project title based on pub/sub )
    pubsub.subscribe('todoAdded', rendering.renderTodo)
    pubsub.subscribe('todoAdded', rendering.populateTodo)
}


const rendering = {
  
  renderProject: newProject => {
    rendering.clearProject()

    const projectTemp = document.querySelector('.project-temp').content
    const copy = document.importNode(projectTemp, true)
    document.querySelector('.project').prepend(copy)

    document.querySelector('.project-title').textContent = newProject.data.title
    console.log(projectTemp)
    console.log(copy)
    // const project = document.querySelector('.project')
    // const para = document.querySelector('.project-info')
    // para.textContent = newProject.data.title
    // project.prepend(para)

    // const projectInfo = document.querySelector('.project-info')
    // const button = document.createElement('button')
    // button.classList.add('remove-button')
    // button.textContent = "remove project"
    // button.dataset.id = newProject.id
    // projectInfo.appendChild(button)
  },

  clearProject: () => {
    const parent = document.querySelector('.project') // this and clearProject same thing
    const child = document.querySelector('.project-info')
    parent.removeChild(child)
  },

  clearTodo: () => {
    const ele = document.querySelector('.todo') // this and clearProject same thing
    while (ele.firstChild) {   
    ele.removeChild(ele.firstChild)
    }
  },

  renderTodo: projectTodos => {
   // rendering.clearTodo() // clear display
   console.log(projectTodos)
    projectTodos.forEach(el => {
      const tempTodo = document.querySelector('.todo-temp').content
      tempTodo.children[0].dataset.id = el.id
      const copy = document.importNode(tempTodo, true) 
      console.log(tempTodo, copy)
      document.querySelector('.todo-container').appendChild(copy)
      
    })

    // const ele = document.querySelector('.todo')
    // projectTodos.forEach(el => {                  // re-populate with array members
    //   const test = document.createElement('div')  // create divs per member
    //   test.classList.add('data')
    //   ele.appendChild(test)
    //   test.dataset.id = el.id
    // })
  },

  populateTodo: projectTodos => {
    let ids = ''
    const getDivs = document.querySelectorAll('.data')
    getDivs.forEach(div => { 
      ids = projectTodos.find(item => item.id === div.dataset.id)
      const quick = document.querySelector(`.data[data-id='${ids.id}']`)
      const test = document.createElement('p')
      quick.appendChild(test)
      test.textContent = ids.data.title
    })
  }
}


// rendering.clearTodo()                         // clear display
// const ele = document.querySelector('.todo')
// projectTodos.forEach(el => {                  // re-populate with array members
//   const test = document.createElement('div')  // create divs per member
//   test.classList.add('data')
//   ele.appendChild(test)
//   test.dataset.id = el.id
// })


// query all data divs, then loop through array, if div's dataset matches 
    // object id render rest of the objects property/values in that div

export default initialRender


// bunch of different render methods
// addTodo
// removeTodo
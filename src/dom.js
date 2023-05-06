
//import projectTodos from "."
import pubsub from "./pubsub"

// import projectTodos from "./index.js"

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
    const project = document.querySelector('.project')
    const div = document.createElement('p')
    div.textContent = "default project"
    project.prepend(div)

    pubsub.subscribe('defaultProject', )
    pubsub.subscribe('todoAdded', rendering.renderTodo)
    pubsub.subscribe('todoAdded', rendering.populateTodo)
}

const rendering = {
 // array: [],
  renderTodo: projectTodos => {
   console.log(projectTodos)
   console.log(projectTodos[0].data.title)
      const ele = document.querySelector('.test')
      while (ele.firstChild) {   
      ele.removeChild(ele.firstChild)               // clear display
      }
      projectTodos.forEach(el => {                  // re-populate with array members
        const test = document.createElement('div')  // create divs per member
        test.classList.add('data')
        ele.appendChild(test)
        test.dataset.id = el.id
      })
      // array.push(projectTodos)
      // console.log(array)
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


// query all data divs, then loop through array, if div's dataset matches 
    // object id render rest of the objects property/values in that div

export default initialRender


// bunch of different render methods
// addTodo
// removeTodo




// BACKUP

// const renderTodo = (projectTodos) => {
//   console.log(projectTodos)
//   console.log(projectTodos[0].todo.title)
//     const ele = document.querySelector('.test')
//     while (ele.firstChild) {   
//     ele.removeChild(ele.firstChild)                 // clear display
//     }
//     projectTodos.forEach(el => {                    // re-populate with array members
//         const test = document.createElement('div')  // create divs per member
//         test.classList.add('data')
//         ele.appendChild(test)
//         test.dataset.id = el.id
//     })
// }
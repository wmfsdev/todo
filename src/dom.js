
import projectTodos from "."
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
  //  const container = document.querySelector('.test')
  //  const div = document.createElement('div')
    //ele.textContent = "testing para"
  //  container.appendChild(div)
    pubsub.subscribe('todoAdded', rendering.renderTodo)
}

const rendering = {
  renderTodo: projectTodos => {
    console.log(projectTodos)
    console.log(projectTodos[0].todo.title)
      const ele = document.querySelector('.test')
      while (ele.firstChild) {   
      ele.removeChild(ele.firstChild)                 // clear display
      }
      projectTodos.forEach(el => {                    // re-populate with array members
          const test = document.createElement('div')  // create divs per member
          test.classList.add('data')
          ele.appendChild(test)
          test.dataset.id = el.id
      })
  }
}


// function info() {
  
// }


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
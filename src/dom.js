
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
    pubsub.subscribe('todoAdded', rendering.renderTodo)
    pubsub.subscribe('todoAdded', rendering.populateTodo)
    pubsub.subscribe('todoEdited', rendering.editTodo)
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
    const todoContainer = document.querySelector('.todo-container')
    const todo = document.querySelectorAll('.todo')
    if (todoContainer.children.length > 1) {
      todo.forEach(el => {
        todoContainer.removeChild(el)
      })  
    }
  },

  clearEditTodo: () => {
    const editTodoContainer = document.querySelector('.edit-container')
    const editTodo = document.querySelectorAll('.edit-footer')
    if (editTodoContainer.children.length > 1) {
      editTodo.forEach(el => {
        editTodoContainer.removeChild(el)
      })  
    }
  },

  renderTodo: projectTodos => {
  rendering.clearTodo() // clear display
   console.log(projectTodos)
    projectTodos.forEach(el => {
      const tempTodo = document.querySelector('.todo-temp').content
      tempTodo.children[0].dataset.id = el.id
      const copy = document.importNode(tempTodo, true) 
     // console.log(tempTodo, copy)
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
    const getDivs = document.querySelectorAll('.todo')
    getDivs.forEach(div => { 
     // console.log(div)
     // console.log(projectTodos) // array
      ids = projectTodos.find(item => item.id === div.dataset.id) // object
      // console.log(ids.data.title)
      // console.log(ids.id)

      const todoTitle = document.querySelector(`.todo[data-id='${ids.id}'] p`)
      const button = document.querySelector(`.todo[data-id='${ids.id}'] button`)
      
      todoTitle.textContent = ids.data.title
      button.dataset.id = ids.id
      
      pubsub.subscribe('removeTodo', rendering.removeTodo)
     // console.log(todoTitle, button)

    })
  },

  removeTodo: todoID => {
    console.log(todoID)
  },

  editTodo: todoEditID => {
    rendering.clearEditTodo()
    console.log(todoEditID)
    const editTemp = document.querySelector('.edit-temp').content
    const copy = document.importNode(editTemp, true)
    document.querySelector('.edit-container').prepend(copy)
    document.querySelector('.update-title').dataset.todoUpdateID = todoEditID


   // document.querySelector('.project-title').textContent = newProject.data.title

  }
}


export default initialRender



// query all data divs, then loop through array, if div's dataset matches 
    // object id render rest of the objects property/values in that div

// bunch of different render methods
// addTodo
// removeTodo

// OLD CODE

// rendering.clearTodo()                         // clear display
// const ele = document.querySelector('.todo')
// projectTodos.forEach(el => {                  // re-populate with array members
//   const test = document.createElement('div')  // create divs per member
//   test.classList.add('data')
//   ele.appendChild(test)
//   test.dataset.id = el.id
// })
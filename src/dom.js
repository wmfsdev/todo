
import pubsub from "./pubsub"
import { format } from 'date-fns'


const initialRender = () => {
    const projectTemp = document.querySelector('.project-temp').content
    const copy = document.importNode(projectTemp, true)
    document.querySelector('.project').prepend(copy)

    pubsub.subscribe('newProject', rendering.clearTodo)
    pubsub.subscribe('newProject', rendering.renderProject)
    pubsub.subscribe('todoAdded', rendering.renderTodo)
    pubsub.subscribe('todoAdded', rendering.populateTodo)
    pubsub.subscribe('todoEdited', rendering.editTodo)

    rendering.renderPriority()
}

const rendering = {

  renderPriority: () => {
    const value = document.querySelector("#value")
    const input = document.querySelector("#priority-input")
      
    input.addEventListener("input", (e) => {
      console.log(e.target.value)
      switch (e.target.value) {
        case '0':
          value.textContent = "no pressure";
          break
        case '1':
          value.textContent = "get to it";
          break
        case '2':
          value.textContent = "NOW!"
          break
        default: "no pressure"
      }
    })
  },
  
  renderProject: newProject => {
    rendering.clearProject()
    const projectTemp = document.querySelector('.project-temp').content
    const copy = document.importNode(projectTemp, true)
    document.querySelector('.project').prepend(copy)
    document.querySelector('.project-title').textContent = newProject.data.title

    // console.log(projectTemp)
    //console.log(copy)
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
    rendering.clearTodo()
      projectTodos.data.stuff.forEach(el => {
        const tempTodo = document.querySelector('.todo-temp').content
        tempTodo.children[0].dataset.id = el.id
        const copy = document.importNode(tempTodo, true) 
        document.querySelector('.todo-container').appendChild(copy)
      })
    },

  populateTodo: projectTodos => {
    let ids = ''

    const getDivs = document.querySelectorAll('.todo')
    getDivs.forEach(div => { 
      ids = projectTodos.data.stuff.find(item => item.id === div.dataset.id)
      
      const todoTitle = document.querySelector(`.todo[data-id='${ids.id}'] p.todo-title`)
      const button = document.querySelector(`.todo[data-id='${ids.id}'] button`)
      const dueDate = document.querySelector(`.todo[data-id='${ids.id}'] p.due-date`)

      console.log(ids.data.due)
      const due = new Date(ids.data.due);
      const formattedDate = format(due, `EE do LLL yyyy`);
      
      console.log(formattedDate);

      todoTitle.textContent = ids.data.title
      button.dataset.id = ids.id
      button.dataset.projectId = projectTodos.id
      dueDate.textContent = formattedDate  // ids.data.due
      
      pubsub.subscribe('removeTodo', rendering.removeTodo)
    })
  },

  removeTodo: todoID => {
   // console.log(todoID)
  },

  editTodo: todoEdit => {
    rendering.clearEditTodo()
    const editTemp = document.querySelector('.edit-temp').content
    const copy = document.importNode(editTemp, true)
    document.querySelector('.edit-container').prepend(copy)
    document.querySelector('.update-title').dataset.todoUpdateId = todoEdit[0] //todoID
    document.querySelector('.update-title').dataset.projectId = todoEdit[1] //projectID
    pubsub.subscribe('clearEditButton', rendering.clearEditTodo)
   // document.querySelector('.project-title').textContent = newProject.data.title
  }
}


export default initialRender
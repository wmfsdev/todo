
import { projectCreation } from "."
import pubsub from "./pubsub"
import { format } from 'date-fns'


const initialRender = defaultProject => {
 // console.log(defaultProject)
    rendering.renderProject(defaultProject)
    rendering.renderProjectSelect()
    rendering.renderPriority()
}

function subscriptions() {
    pubsub.subscribe('selectProject', rendering.renderProjectSelect)
    pubsub.subscribe('projectRemoved', rendering.clearProject)
    pubsub.subscribe('projectRemoved', rendering.clearTodo)
    pubsub.subscribe('newProject', rendering.clearTodo)
    pubsub.subscribe('newProject', rendering.renderProject)
    pubsub.subscribe('todoAdded', rendering.renderTodo)
    pubsub.subscribe('todoAdded', rendering.populateTodo)
    pubsub.subscribe('todoEdited', rendering.editTodo)
}

const rendering = {

  renderProjectSelect: () => {
    rendering.clearProjectSelect()
    const select = document.querySelector('#select')
    
    projectCreation.projects.forEach(project => {
      const newOption = new Option(`${project.data.title}`, `${project.id}`)  // , 'title'
      select.add(newOption, undefined)
    })
    // console.log('select')
    // console.log(select.options)
    
  },

  clearProjectSelect: () => {
    const select = document.querySelector('#select')
      while (select.options.length > 0) {
      select.remove(0);
      }

    // select.removeChild(selectBox.options[0]);
    // console.log(parent.options)
    // const child = document.querySelector('.project-info')
    // parent.removeChild(child)
    console.log(select)
  },

  prioritySwitch: (priorityStatus, eventTarget) => {
    switch (eventTarget) {
      case '0':
        priorityStatus.textContent = "no pressure";
      //  priorityStatus.style.color = "red"
        break
      case '1':
        priorityStatus.textContent = "get to it";
        break
      case '2':
        priorityStatus.textContent = "NOW!"
        break
      default: "no pressure"
    }
  },

  renderPriority: () => {
    const value = document.querySelector("#value")
    const input = document.querySelector("#priority-input")
      
    input.addEventListener("input", (e) => {
      console.log(e.target.value)
      rendering.prioritySwitch(value, e.target.value)
      
      // switch (e.target.value) {
      //   case '0':
      //     value.textContent = "no pressure";
      //     break
      //   case '1':
      //     value.textContent = "get to it";
      //     break
      //   case '2':
      //     value.textContent = "NOW!"
      //     break
      //   default: "no pressure"
      // }
    })
  },
  
  renderProject: newProject => {
    console.log(newProject)
    if (document.querySelector('.project-title') !== null) {
    rendering.clearProject()
    }   // checks to see if a project has already been created - stops render conflict
        // since no project would mean no 'project-title' node to be removed from parent
    const projectTemp = document.querySelector('.project-temp').content
    const copy = document.importNode(projectTemp, true)
    document.querySelector('.project').prepend(copy)
   
    document.querySelector('.project-title').textContent = newProject.data.title
    document.querySelector('.remove-button').dataset.removeId = newProject.id
  },

  clearProject: () => {
    const parent = document.querySelector('.project')
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
      const priority = document.querySelector(`.todo[data-id='${ids.id}'] p.priority`)

     // console.log(ids.data.due)
      const due = new Date(ids.data.due);
      const formattedDate = format(due, `EE do LLL yyyy`);
      
     // console.log(formattedDate);

      todoTitle.textContent = ids.data.title
      button.dataset.id = ids.id
      button.dataset.projectId = projectTodos.id
      dueDate.textContent = formattedDate  // ids.data.due

      rendering.prioritySwitch(priority, ids.data.priority)
      
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
  }
}


export { initialRender, subscriptions }
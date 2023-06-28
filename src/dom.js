
import { projectCreation } from "."
import pubsub from "./pubsub"
import { format } from 'date-fns'


const initialRender = defaultProject => {
  rendering.renderProject(defaultProject)
  rendering.renderTodo(defaultProject)
  rendering.populateTodo(defaultProject)
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
  },

  clearProjectSelect: () => {
    const select = document.querySelector('#select')
      while (select.options.length > 0) {
      select.remove(0);
      }
  },

  prioritySwitch: (priorityStatus, eventTarget, todoID) => {
    switch (eventTarget) {
      case '0':
        priorityStatus.textContent = " NO PRESSURE";
        document.querySelector(`.todo[data-id='${todoID}']`).style = "border-top: 15px solid lightseagreen;"
        break
      case '1':
        priorityStatus.textContent = " GET TO IT";
        document.querySelector(`.todo[data-id='${todoID}']`).style = "border-top: 15px solid mediumpurple;"
        break
      case '2':
        priorityStatus.textContent = " NOW!"
        document.querySelector(`.todo[data-id='${todoID}']`).style = "border-top: 15px solid crimson;"
        break
      default: "no pressure"
    }
  },

  renderPriority: (a = "#form") => {   // v = "#value", i = "#priority-input"
    const value = document.querySelector(`${a} #value`)
    const input = document.querySelector(`${a} #priority-input`)

    input.addEventListener("input", (e) => {
        rendering.prioritySwitch(value, e.target.value)
    })
  },
  
  renderProject: newProject => {
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
      const editButton = document.querySelector(`.todo[data-id='${ids.id}'] button.edit-todo`)
      const deleteButton = document.querySelector(`.todo[data-id='${ids.id}'] button.del-todo`)
      const todoDesc = document.querySelector(`.todo[data-id='${ids.id}'] p.todo-desc`)
      const dueDate = document.querySelector(`.todo[data-id='${ids.id}'] p.due-date`)
      const priority = document.querySelector(`.todo[data-id='${ids.id}'] p.priority`)
      const due = new Date(ids.data.due);
      const formattedDate = format(due, `EE do LLL yyyy`);
      
      todoTitle.textContent = ids.data.title
      todoDesc.textContent = ids.data.desc
      editButton.dataset.id = ids.id
      editButton.dataset.projectId = projectTodos.id
      deleteButton.dataset.id = ids.id
      deleteButton.dataset.projectId = projectTodos.id
      dueDate.textContent = formattedDate  // ids.data.due

      const todoID = ids.id // todo-id for prioritySwitch

      rendering.prioritySwitch(priority, ids.data.priority, todoID)
      pubsub.subscribe('deleteTodo', rendering.deleteTodo)
    })
  },

  deleteTodo: () => { // (todoID)
    const editTemp = document.querySelector('.edit-temp').content
    const copy = document.importNode(editTemp, true)
    document.querySelector('.edit-container').prepend(copy)
    document.querySelector('.update-title').dataset.todoUpdateId = todoEdit[0] //todoID
    document.querySelector('.update-title').dataset.projectId = todoEdit[1] //projectID
    pubsub.subscribe('clearEditButton', rendering.clearEditTodo)
  },

  editTodo: todoEdit => {
    rendering.clearEditTodo()
    const editTemp = document.querySelector('.edit-temp').content
    const copy = document.importNode(editTemp, true)
    document.querySelector('.edit-container').prepend(copy)
    document.querySelector('.update-title').dataset.todoUpdateId = todoEdit[0] //todoID
    document.querySelector('.update-title').dataset.projectId = todoEdit[1] //projectID
    pubsub.subscribe('clearEditButton', rendering.clearEditTodo)
    pubsub.subscribe('prioritySlider', rendering.renderPriority)
  }
}


export { initialRender, subscriptions }
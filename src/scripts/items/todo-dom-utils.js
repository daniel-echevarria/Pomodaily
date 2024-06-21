import { format } from "date-fns";
import createToDoItem from '../items/to-do-item'
import '../../styles/items-box.css'

export function createItemEl(item) {
  const itemEl = document.createElement('div')
  itemEl.className = 'todo-item'

  const itemTitleEl = document.createElement('p')
  itemTitleEl.innerHTML = item.getTitle()
  itemTitleEl.className = 'item-title'

  const itemDueDateEl = document.createElement('p')
  itemDueDateEl.className = 'item-due-date'
  const formattedDate = format(item.getDueDate(), 'dd MMM y')
  itemDueDateEl.innerHTML = `Due Date: ${formattedDate}`

  const statusBox = createCheckBox(item)
  const itemDialog = createExpandedItemDialog(item)
  itemDialog.className = 'item-dialog'
  const expandButton = createItemExpandButton(item, itemDialog)

  itemEl.append(statusBox, itemTitleEl, itemDueDateEl, itemDialog, expandButton)
  return itemEl

}

function createExpandedItemDialog(item) {
  const expandedItemDialog = document.createElement('dialog')
  return expandedItemDialog
}

function createItemExpandButton(item, itemDialog) {
  const itemExpandButton = document.createElement('button')
  itemExpandButton.innerHTML = 'Expand'
  itemExpandButton.className = 'expand-item'
  itemExpandButton.addEventListener('click', () => {
    itemDialog.show()
  })
  return itemExpandButton
}

function createCheckBox(item) {
  const checkBox = document.createElement('input')
  checkBox.type = 'checkbox'
  return checkBox
}

// Given a list object create a container with all the items in the list
export function displayItems(listObj) {
  const toDoItemsBox = document.createElement('div')
  toDoItemsBox.className = 'items-box'
  const toDoItems = listObj.getToDos()
  toDoItems.forEach((item) => {
    toDoItemsBox.append(createItemEl(item))
  })

  return toDoItemsBox
}

export function createAddTaskSection(itemsBox, listObj) {
  const addTaskBox = document.createElement('div')
  addTaskBox.className = 'new-task-box'
  const inputEl = createNewTaskInput()
  const buttonEl = createAddTaskButton(inputEl, itemsBox, listObj)
  addTaskBox.append(inputEl, buttonEl)
  return addTaskBox
}

const createNewTaskInput = () => {
  const newTaskInput = document.createElement('input')
  newTaskInput.placeholder = `+ Add Task...`
  newTaskInput.addEventListener('focus', () => {
    // const addTaskButton = document.getElementById('add-task-button')
  })
  return newTaskInput
}

const createAddTaskButton = (inputEl, itemsBox, listObj) => {
  const addTaskButton = document.createElement('button')
  addTaskButton.id = 'add-task-button'
  addTaskButton.innerHTML = '➕'
  addTaskButton.addEventListener('click', () => {
    const myFreshTask = createToDoItem()
    if (inputEl.value) { myFreshTask.setTitle(inputEl.value) }
    listObj.addToDo(myFreshTask)
    itemsBox.append(createItemEl(myFreshTask))
    inputEl.value = ''
  })
  return addTaskButton
}



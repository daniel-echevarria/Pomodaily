import createTaskList from "./lists/task-lists"
import createTask from "./tasks/task"


// localStorage.clear()

export function storeList(list) {
  const listId = list.getId()
  const myListObj = list.getObj()
  const listString = JSON.stringify(myListObj)
  localStorage.setItem(`list-${listId}`, listString)
}

export function buildListBack(listKey) {
  const savedList = retrieveObject(listKey)
  const myList = createTaskList(savedList.id, savedList.title)
  return myList
}

function retrieveObject(key) {
  const myListString = localStorage.getItem(key)
  const listObject = JSON.parse(myListString)
  return listObject
}

export function getItemsIncluding(subString) {
  const storageKeys = Object.keys(localStorage)
  const listCount = storageKeys.filter(el => el.includes(subString))
  return listCount
}

export function storeTask(task) {
  const myPropertiesObj = task.getPropertiesObj()
  const taskString = JSON.stringify(myPropertiesObj)
  const startIdx = localStorage.getItem('index') || 0
  let nextIndex = parseInt(startIdx) + 1
  localStorage.setItem(`task-${startIdx}`, taskString)
  localStorage.setItem('index', nextIndex)
}

export function buildTaskBack(taskKey) {
  const task = retrieveObject(taskKey)
  const myTask = createTask()
  myTask.setListId(task.listId)
  myTask.setTitle(task.title)
  myTask.setDescription(task.description)
  myTask.setDueDate(task.dueDate)
  myTask.setPriority(task.priority)
  myTask.setStatus(task.status)
  myTask.setDeleted(task.deleted)
  return myTask
}



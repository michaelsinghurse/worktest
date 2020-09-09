// taskManager.js

const fs = require("fs");

const TASK_FILE = "./tasks.json";

const taskManager = {
  add(newTitle) {
    const tasks = this.getAll();

    const maxId = tasks.reduce((max, task) => {
      return task.id > max ? task.id : max;
    }, 0);
    const newId = maxId + 1;

    const newTask = { 
      id: newId,
      title: newTitle,
      isDone: false
    };

    tasks.push(newTask);
    this.write(tasks);
    return newTask;
  },
  
  delete(id) {
    const tasks = this.getAll();
    const newTasks = this.tasks.filter(task => task.id !== id);

    if (tasks.length === newTasks.length) return false;

    this.write(newTasks);
    return true;
  },

  get(id) {
    const tasks = this.getAll();
    return tasks.find(task => task.id === id);
  },

  getAll() {
    const json = fs.readFileSync(TASK_FILE, "utf8");
    return JSON.parse(json);
  },
  
  update(updatedTask) {
    const tasks = this.getAll();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

    if (taskIndex < 0) return false;

    tasks.splice(taskIndex, 1, updatedTask);

    this.write(tasks);

    return updatedTask;
  },

  write(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks), "utf8");
  },
};

module.exports = taskManager;

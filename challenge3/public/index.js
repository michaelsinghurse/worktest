// index.js

"use strict";

const App = {
  createTaskTemplate: null,
  editTaskTemplate: null,
  taskTemplate: null,
  
  bindListeners() {
    // listener on Create Task button
    const newTaskBtn = document.querySelector("[data-action='createTask']");
    newTaskBtn.addEventListener("click", this.handleNewTaskBtnClick.bind(this));

    // TODO: add listener on ul task list. delegation for list item buttons.
  },

  compileHtmlTemplates() {
    const taskTemplate = document.querySelector("#taskTemplate");
    this.taskTemplate = Handlebars.compile(taskTemplate.innerHTML);

    const createTaskTemplate = document.querySelector("#createTaskTemplate");
    this.createTaskTemplate = Handlebars.compile(createTaskTemplate.innerHTML);
  },
  
  getAllTasks() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.responseType = "json";
      request.open("GET", "/api/tasks");

      request.addEventListener("load", event => {
        const data = request.response;
        if (data) {
          resolve(data);
        } else {
          reject("Error occured loading data");
        }
      });

      request.send();
    });
  },
  
  handleNewTaskBtnClick(event) {
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.addEventListener("click", this.handleOverlayClick.bind(this));
    document.body.appendChild(overlay);
    document.body.insertAdjacentHTML("beforeend", this.createTaskTemplate());
  },
  
  handleOverlayClick(event) {
    event.currentTarget.remove();
    document.querySelector(".create-task").remove();
  },

  init() {
    this.compileHtmlTemplates();  
    this.bindListeners();
    this.getAllTasks()
      .then(tasks => this.renderTasks(tasks));
  },

  renderTasks(tasks) {
    const ul = document.querySelector("#taskList");

    ul.innerHTML = "";

    tasks.forEach(task => {
      const htmlString = this.taskTemplate(task);
      ul.insertAdjacentHTML("beforeend", htmlString);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

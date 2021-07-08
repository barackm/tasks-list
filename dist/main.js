/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var v1 = __webpack_require__(/*! ./v1 */ \"./node_modules/uuid/v1.js\");\nvar v4 = __webpack_require__(/*! ./v4 */ \"./node_modules/uuid/v4.js\");\n\nvar uuid = v4;\nuuid.v1 = v1;\nuuid.v4 = v4;\n\nmodule.exports = uuid;\n\n\n//# sourceURL=webpack://tasks-list/./node_modules/uuid/index.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/***/ ((module) => {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]]\n  ]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack://tasks-list/./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/***/ ((module) => {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack://tasks-list/./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\n// **`v1()` - Generate time-based UUID**\n//\n// Inspired by https://github.com/LiosK/UUID.js\n// and http://docs.python.org/library/uuid.html\n\nvar _nodeId;\nvar _clockseq;\n\n// Previous uuid creation time\nvar _lastMSecs = 0;\nvar _lastNSecs = 0;\n\n// See https://github.com/uuidjs/uuid for API details\nfunction v1(options, buf, offset) {\n  var i = buf && offset || 0;\n  var b = buf || [];\n\n  options = options || {};\n  var node = options.node || _nodeId;\n  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;\n\n  // node and clockseq need to be initialized to random values if they're not\n  // specified.  We do this lazily to minimize issues related to insufficient\n  // system entropy.  See #189\n  if (node == null || clockseq == null) {\n    var seedBytes = rng();\n    if (node == null) {\n      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)\n      node = _nodeId = [\n        seedBytes[0] | 0x01,\n        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]\n      ];\n    }\n    if (clockseq == null) {\n      // Per 4.2.2, randomize (14 bit) clockseq\n      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;\n    }\n  }\n\n  // UUID timestamps are 100 nano-second units since the Gregorian epoch,\n  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so\n  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'\n  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.\n  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();\n\n  // Per 4.2.1.2, use count of uuid's generated during the current clock\n  // cycle to simulate higher resolution clock\n  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;\n\n  // Time since last uuid creation (in msecs)\n  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;\n\n  // Per 4.2.1.2, Bump clockseq on clock regression\n  if (dt < 0 && options.clockseq === undefined) {\n    clockseq = clockseq + 1 & 0x3fff;\n  }\n\n  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new\n  // time interval\n  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {\n    nsecs = 0;\n  }\n\n  // Per 4.2.1.2 Throw error if too many uuids are requested\n  if (nsecs >= 10000) {\n    throw new Error('uuid.v1(): Can\\'t create more than 10M uuids/sec');\n  }\n\n  _lastMSecs = msecs;\n  _lastNSecs = nsecs;\n  _clockseq = clockseq;\n\n  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch\n  msecs += 12219292800000;\n\n  // `time_low`\n  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;\n  b[i++] = tl >>> 24 & 0xff;\n  b[i++] = tl >>> 16 & 0xff;\n  b[i++] = tl >>> 8 & 0xff;\n  b[i++] = tl & 0xff;\n\n  // `time_mid`\n  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;\n  b[i++] = tmh >>> 8 & 0xff;\n  b[i++] = tmh & 0xff;\n\n  // `time_high_and_version`\n  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version\n  b[i++] = tmh >>> 16 & 0xff;\n\n  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)\n  b[i++] = clockseq >>> 8 | 0x80;\n\n  // `clock_seq_low`\n  b[i++] = clockseq & 0xff;\n\n  // `node`\n  for (var n = 0; n < 6; ++n) {\n    b[i + n] = node[n];\n  }\n\n  return buf ? buf : bytesToUuid(b);\n}\n\nmodule.exports = v1;\n\n\n//# sourceURL=webpack://tasks-list/./node_modules/uuid/v1.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack://tasks-list/./node_modules/uuid/v4.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _editTodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editTodo */ \"./src/editTodo.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _todoActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todoActions */ \"./src/todoActions.js\");\n\n\n\n\n\nconst storedDefaultProject = JSON.parse(localStorage.getItem('defaultProject'));\nlet defaultProject = storedDefaultProject || null;\nlet defaultTodo = null;\n\nconst render = (function () {\n  const renderAppContent = (projects) => {\n    (0,_projects__WEBPACK_IMPORTED_MODULE_1__.default)(projects);\n    (0,_todo__WEBPACK_IMPORTED_MODULE_2__.default)(defaultProject);\n    (0,_editTodo__WEBPACK_IMPORTED_MODULE_0__.default)(defaultTodo, defaultProject);\n  };\n  const updateUI = (projects) => {\n    render.renderAppContent(projects);\n  };\n\n  const updateDefaultProject = (id) => {\n    const projects = JSON.parse(localStorage.getItem('projectList'));\n    const project = projects.find((f) => f.id.toString() === id);\n    let myDefaultProject = project;\n    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];\n    let todos = [];\n    if (allTodos.length > 0) {\n      todos = allTodos.filter((todo) => todo.projectId.toString() === project.id.toString());\n    }\n    myDefaultProject = { ...myDefaultProject, todos };\n    localStorage.setItem('defaultProject', JSON.stringify(myDefaultProject));\n    (0,_todo__WEBPACK_IMPORTED_MODULE_2__.default)(myDefaultProject);\n    (0,_editTodo__WEBPACK_IMPORTED_MODULE_0__.default)(defaultTodo, myDefaultProject);\n    defaultProject = myDefaultProject;\n\n    let selectTodoBtns = document.querySelectorAll('.todo-title');\n\n    selectTodoBtns = Array.from(selectTodoBtns);\n    if (selectTodoBtns.length > 0) {\n      selectTodoBtns.map((btn) => btn.addEventListener('click', (e) => {\n        e.preventDefault();\n        render.updateDefaultTodo(btn.getAttribute('data-id'));\n      }));\n    }\n    const editTodoForm = document.querySelector('.editTodoForm');\n    if (editTodoForm) {\n      editTodoForm.addEventListener('submit', (e) => {\n        e.preventDefault();\n        const title = document.querySelector('.todo-title-input').value;\n        const description = document.querySelector('.todo-description').value;\n        const date = document.querySelector('.todo-date').value;\n        const priorityId = document.querySelector('.todo-priority').value;\n        const projectId = editTodoForm.getAttribute('data-project');\n        const todoId = editTodoForm.getAttribute('data-todo');\n\n        if (editTodoForm.getAttribute('data-editing') === 'true') {\n          _todoActions__WEBPACK_IMPORTED_MODULE_3__.default.editTodos(todoId, {\n            title, description, date, priorityId, id: todoId,\n          });\n          (0,_todo__WEBPACK_IMPORTED_MODULE_2__.default)(defaultProject);\n          (0,_editTodo__WEBPACK_IMPORTED_MODULE_0__.default)(defaultTodo, defaultProject);\n        } else {\n          _todoActions__WEBPACK_IMPORTED_MODULE_3__.default.createTodo({\n            title, description, date, priorityId,\n          }, projectId);\n          (0,_todo__WEBPACK_IMPORTED_MODULE_2__.default)(defaultProject);\n          (0,_editTodo__WEBPACK_IMPORTED_MODULE_0__.default)(defaultTodo, defaultProject);\n        }\n      });\n    }\n  };\n\n  function updateDefaultTodo(id) {\n    defaultTodo = defaultTodo && null;\n    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];\n    const todo = allTodos.find((t) => t.id.toString() === id.toString());\n    defaultTodo = todo;\n    (0,_editTodo__WEBPACK_IMPORTED_MODULE_0__.default)(defaultTodo, defaultProject);\n    updateDefaultProject(defaultProject.id);\n  }\n\n  return {\n    renderAppContent, updateUI, updateDefaultProject, updateDefaultTodo,\n  };\n}());\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);\n\n//# sourceURL=webpack://tasks-list/./src/dom.js?");

/***/ }),

/***/ "./src/editTodo.js":
/*!*************************!*\
  !*** ./src/editTodo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ editTodo)\n/* harmony export */ });\nfunction editTodo(todo, selectedProject) {\n  const mainContainer = document.querySelector('.right-section');\n  const inputsWrapper = document.createElement('div');\n  const welcomeMsg = document.createElement('h2');\n  const currentDate = new Date().toISOString().slice(0, 10);\n  console.log(todo);\n  mainContainer.innerHTML = '';\n  inputsWrapper.className = 'right-section-form-div';\n  const form = document.createElement('form');\n\n  if (!selectedProject) {\n    welcomeMsg.innerHTML = '';\n    inputsWrapper.innerHTML = '<h3>Select first a project</h3>';\n  } else {\n    inputsWrapper.appendChild(welcomeMsg);\n    welcomeMsg.innerHTML = todo ? 'Edit todo' : 'Create todo';\n    form.setAttribute('data-editing', `${!!todo}`);\n    form.setAttribute('data-todo', `${todo ? todo.id : null}`);\n    form.setAttribute('data-project', `${selectedProject.id}`);\n    form.className = 'editTodoForm';\n    form.innerHTML = `<div class=\"mb-1\">\n    <label for=\"exampleFormControlInput1\" class=\"form-label\"\n      >Title</label\n    >\n    <input\n      type=\"text\"\n      class=\"form-control todo-title-input\"\n      value='${todo ? todo.title : ''}'\n      id=\"exampleFormControlInput1\"\n      placeholder=\"name@example.com\"\n      required\n    />\n  </div>\n  <div class=\"mb-1\">\n    <label for=\"exampleFormControlInput1\" class=\"form-label\"\n      >Description</label\n    >\n    <input\n      type=\"text\"\n      class=\"form-control todo-description\"\n      value='${todo ? todo.description : ''}'\n      id=\"exampleFormControlInput1\"\n      placeholder=\"name@example.com\"\n      required\n    />\n  </div>\n  <div class=\"mb-1\">\n    <label for=\"exampleFormControlInput1\" class=\"form-label\"\n      >Due date</label\n    >\n    <input\n      type=\"date\"\n      class=\"form-control todo-date\"\n      value=${todo ? todo.date : currentDate}\n      id=\"exampleFormControlInput1\"\n      placeholder=\"name@example.com\"\n      required\n    />\n  </div>\n  <p>To-do Priority</p>\n  <select\n    class=\"form-select mb-3 todo-priority\"\n    aria-label=\"Default select example\"\n    value=${'2'}\n    >\n    <option value=\"1\" >\n      <i class=\"bi bi-flag-fill todo-priority\"></i>\n      <span>Priority 1</span>\n    </option>\n    <option value=\"2\" >\n      <i class=\"bi bi-flag-fill todo-priority\"></i>\n      <span>Priority 2</span>\n    </option>\n    <option value=\"3\">\n      <i class=\"bi bi-flag-fill todo-priority\"></i>\n      <span>Priority 3</span>\n    </option>\n  </select>\n  <button class=\"btn btn-primary\" type=\"submit\">${\n  todo ? 'Update todo' : 'Add to-do'\n}</button>`;\n  }\n\n  inputsWrapper.appendChild(welcomeMsg);\n  inputsWrapper.appendChild(form);\n  mainContainer.appendChild(inputsWrapper);\n}\n\n\n//# sourceURL=webpack://tasks-list/./src/editTodo.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\nfunction NewProject(name) {\n  this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();\n  this.name = name;\n}\n\nconst helper = (function () {\n  const addProject = (name) => {\n    const project = new NewProject(name);\n    const allProjects = JSON.parse(localStorage.getItem('projectList'));\n    allProjects.unshift(project);\n    localStorage.setItem('projectList', JSON.stringify(allProjects));\n    _dom__WEBPACK_IMPORTED_MODULE_1__.default.updateUI(JSON.parse(localStorage.getItem('projectList')));\n    window.location.reload();\n  };\n\n  const removeProject = (id) => {\n    let allProjects = JSON.parse(localStorage.getItem('projectList'));\n    allProjects = allProjects.filter((project) => project.id.toString() !== id);\n    localStorage.setItem('projectList', JSON.stringify(allProjects));\n    _dom__WEBPACK_IMPORTED_MODULE_1__.default.updateUI(JSON.parse(localStorage.getItem('projectList')));\n    window.location.reload();\n  };\n\n  return {\n    addProject, removeProject,\n  };\n}());\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (helper);\n\n//# sourceURL=webpack://tasks-list/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\n\nconst defaultProjects = [\n  {\n    id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n    name: 'CapstoneProject',\n  },\n  {\n    id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n    name: 'Todo Project',\n  },\n  {\n    id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(),\n    name: 'RestaurauntProject',\n  },\n];\n\nif (!localStorage.getItem('projectList')) {\n  localStorage.setItem('projectList', JSON.stringify(defaultProjects));\n}\n\nif (!localStorage.getItem('defaultProject')) {\n  const allProjects = JSON.parse(localStorage.getItem('projectList')) || [];\n  if (allProjects.length === 0) {\n    localStorage.setItem('defaultProject', null);\n  } else {\n    let todos = [];\n    let defaultProject = allProjects[0];\n    const allTodos = JSON.parse(localStorage.getItem('todoList')) || [];\n    if (allTodos.length > 0) {\n      todos = allTodos.filter((todo) => todo.projectId.toString() === defaultProject.id.toString());\n    }\n\n    defaultProject = { ...defaultProject, todos };\n    localStorage.setItem('defaultProject', JSON.stringify(defaultProject));\n  }\n}\n\n_dom__WEBPACK_IMPORTED_MODULE_1__.default.renderAppContent(JSON.parse(localStorage.getItem('projectList')));\n\nconst editTodoForm = document.querySelector('.editTodoForm');\nif (editTodoForm) {\n  editTodoForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    if (editTodoForm.getAttribute('data-editing')) {\n      _helper__WEBPACK_IMPORTED_MODULE_2__.default.editTodo(editTodoForm.getAttribute('data-todo'));\n    } else {\n      _helper__WEBPACK_IMPORTED_MODULE_2__.default.createTodo({ name: 'todo' }, 2);\n    }\n  });\n}\n\nconst formSubmit = document.querySelector('.newProjectForm');\nformSubmit.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const projectName = document.querySelector('#addProjectInput');\n  _helper__WEBPACK_IMPORTED_MODULE_2__.default.addProject(projectName.value);\n});\n\nlet removeProjectBtns = document.querySelectorAll('.remove-project-btn');\nremoveProjectBtns = Array.from(removeProjectBtns);\nif (removeProjectBtns.length > 0) {\n  removeProjectBtns.map((btn) => btn.addEventListener('click', (e) => {\n    e.preventDefault();\n    _helper__WEBPACK_IMPORTED_MODULE_2__.default.removeProject(btn.getAttribute('data-id'));\n  }));\n}\n\nlet selectProjectBtns = document.querySelectorAll('.project-name');\nselectProjectBtns = Array.from(selectProjectBtns);\nif (selectProjectBtns.length > 0) {\n  selectProjectBtns.map((btn) => btn.addEventListener('click', (e) => {\n    e.preventDefault();\n    _dom__WEBPACK_IMPORTED_MODULE_1__.default.updateDefaultProject(btn.getAttribute('data-id'));\n  }));\n}\n\nlet selectTodoBtns = document.querySelectorAll('.todo-title');\nselectTodoBtns = Array.from(selectTodoBtns);\nif (selectTodoBtns.length > 0) {\n  selectTodoBtns.map((btn) => btn.addEventListener('click', (e) => {\n    e.preventDefault();\n    _dom__WEBPACK_IMPORTED_MODULE_1__.default.updateDefaultTodo(btn.getAttribute('data-id'));\n  }));\n}\n\n\n//# sourceURL=webpack://tasks-list/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderProjects)\n/* harmony export */ });\nfunction renderProjects(projects) {\n  const projectSection = document.querySelector('.left-section');\n  projectSection.innerHTML = '';\n  const header = document.createElement('div');\n  header.className = 'header flex-center flex-column';\n  header.innerHTML = \"<h1>All projects</h1><form class='w-100 newProjectForm'><input type='text' class='form-control' id='addProjectInput' placeholder='name@example.com' required/><button class='mt-2 btn bnt-primary' type='submit'>Add new project</button></form>\";\n  const projectList = document.createElement('ul');\n  projectList.className = 'all-project-list flex-center flex-column';\n  projects.map((project) => {\n    const projectItem = document.createElement('li');\n    projectItem.className = 'flex-between w-100';\n    projectItem.innerHTML = `<a href=\"\" class=\"project-name\" data-id='${project.id}'> <h5>${project.name}</h5></a>\n  <div class=\"flex-center project-btn-wrapper\">\n    <a class=\"project-b flex-center trash-btn remove-project-btn\" data-id='${project.id}'href=\"#\">\n      <i class=\"bi bi-trash-fill\"></i>\n    </a>\n    <a class=\"project-b flex-center add-todo-btn\" href=\"#\">\n      <i class=\"bi bi-plus-lg\"></i>\n    </a>\n  </div>`;\n    return projectList.appendChild(projectItem);\n  });\n  projectSection.appendChild(header);\n  projectSection.appendChild(projectList);\n}\n\n\n//# sourceURL=webpack://tasks-list/./src/projects.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction renderToDos(project) {\n  const todoSection = document.querySelector('.middle-section');\n  todoSection.innerHTML = '';\n  const header = document.createElement('div');\n  const todoContainer = document.createElement('ul');\n  header.className = 'header flex-center text-center flex-column';\n  if (!project) {\n    header.innerHTML = '<h1>No project selected</h1><br><p>Create a new project, or select and existing one.</p>';\n  } else {\n    header.innerHTML = `<h1>Todos for ${project.name}</h1>`;\n    todoContainer.className = 'project-todos-wrapper';\n    project.todos.map((todo) => {\n      const todoItem = document.createElement('li');\n      todoItem.className = 'flex-between todo-item';\n      todoItem.innerHTML = `<a href=\"#\" class=\"todo-title\" data-id='${todo.id}'>${todo.title}</a>\n        <div class=\"flex-center text-center\">\n          <i class=\"bi bi-flag-fill todo-priority ${todo.priority}\"></i>\n          <p class=\"todo-due-date\">${todo.date}</p>\n          <button class=\"complete-todo flex-center\">\n            <i class=\"bi bi-check2-square\"></i>\n          </button>\n        </div>`;\n      return todoContainer.appendChild(todoItem);\n    });\n  }\n  todoSection.appendChild(header);\n  todoSection.appendChild(todoContainer);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderToDos);\n\n//# sourceURL=webpack://tasks-list/./src/todo.js?");

/***/ }),

/***/ "./src/todoActions.js":
/*!****************************!*\
  !*** ./src/todoActions.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/index.js\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass Todo {\n  constructor(data, projectId) {\n    this.data = data;\n    this.projectId = projectId;\n  }\n\n  addTodo() {\n    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];\n    const newTodo = { id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)(), ...this.data, projectId: this.projectId };\n\n    if (todoList.length === 0) {\n      todoList.push(newTodo);\n      localStorage.setItem('todoList', JSON.stringify(todoList));\n      window.location.reload();\n    } else {\n      todoList.push(newTodo);\n      localStorage.setItem('todoList', JSON.stringify(todoList));\n      window.location.reload();\n    }\n  }\n\n  updateTodo(todoId) {\n    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];\n    const todoIndex = todoList.findIndex((t) => t.id.toString() === todoId.toString());\n    const myTodo = todoList[todoIndex];\n    myTodo.title = this.data.title;\n    myTodo.description = this.data.description;\n    myTodo.date = this.data.date;\n    todoList[todoIndex] = myTodo;\n    localStorage.setItem('todoList', JSON.stringify(todoList));\n    window.location.reload();\n  }\n}\n\nconst todoActions = (function () {\n  const editTodos = (todoId, todo) => {\n    const updateTodo = new Todo(todo);\n    updateTodo.updateTodo(todoId);\n  };\n\n  const createTodo = (todo, projectId) => {\n    const newTodo = new Todo(todo, projectId);\n    newTodo.addTodo();\n  };\n\n  return {\n    editTodos,\n    createTodo,\n  };\n}());\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoActions);\n\n//# sourceURL=webpack://tasks-list/./src/todoActions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
angular.module('finalTodoListApp', ['firebase']).constant('firebaseConfig', {
  apiKey: "AIzaSyDKW5wS2IakCjfOGo6dToJH903kcTUnhg4",
  authDomain: "todolist-94480.firebaseapp.com",
  databaseURL: "https://todolist-94480.firebaseio.com",
  projectId: "todolist-94480",
  storageBucket: "todolist-94480.appspot.com",
  messagingSenderId: "384695176815"
})
  .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
  .service('dbRefRoot', DbRefRoot)
  .service('todos', Todos)
  .controller('TodoCtrl', TodoCtrl)


//references from one document to another using the value of the first document’s _id field
  function DbRefRoot() {
  return firebase.database().ref()
  }

  function Todos(dbRefRoot, $firebaseObject, $firebaseArray) {
    const dbTodoList = dbRefRoot.child('todos')
    this.get = function get(id) {
      return $firebaseObject(dbTodoList.child(id))
  }
  

  this.getAll = function getAll() {
    return $firebaseArray(dbTodoList)
    }
  }

/* ------ TODO CTRL FOR THE PAGE --------*/
  function TodoCtrl(todos) {
    this.clearForm = function clearForm() {
      return { 
        title: '',
        date: '',
        category: '',
        priority: '',
        note: '',
        done: false
      
      } 
    }
  
  /*--------- FILTER FOR CATEGORIES --------*/
  this.filterCat = ""; // creating a variable that is attached to the filter of the list items to sort whichever is selected.
  
  this.newListItem = this.clearForm() // clearing the form for the model
  this.todo = todos.get('id')
  this.todos = todos.getAll()
  
  /*---------- ADD ITEM -------------*/
  this.addListItem = function addListItem(newListItem) {
    this.newListItem.id = cuid() // creating unique id for each item added.
    this.todos.$add(newListItem).then(newRef => {
      $('#addTodoListModal').modal('hide')
      this.newListItem = this.clearForm()
    })
  }
  
           
    
  this.remove = function remove(todo) {
    if (confirm("Deleting a list item from the database cannot be undone. Are you sure you want to delete this Item?")) {
      this.todos.$remove(todo)
    }
  }
  this.save = function save(todo) {
    this.todos.$save(todo)
  }
  
} // end of CustomerCtrl
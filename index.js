import {initializeApp} from"https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addtolist-22d0b-default-rtdb.asia-southeast1.firebasedatabase.app/"
    
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const addToListDB = ref(database,"addToList")


const inputFieldEl = document.getElementById("input-value")
const addButtonEl = document.getElementById("add-button")
const addToListEl = document.getElementById("add-to-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    //console.log(`${inputValue}`)
    push(addToListDB, inputValue)
    clearInputFieldEl()
})

onValue(addToListDB,function(snapshot){
   if(snapshot.exists()){
        let itemListArray = Object.entries(snapshot.val())
        //console.log(snapshot.val())
        clearAddToListEl()
        for(let i = 0; i<itemListArray.length; i++){
            let currentItem = itemListArray[i]
            let currentId = itemListArray[0]
            let currentValue = itemListArray[1]
            appendItemToAddToList(currentItem)
        }
        //appendItemToAddToList()
   }
   else{
    addToListEl.innerHTML = "List is empty ..."
   }
})

function clearAddToListEl(){
    addToListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToAddToList(item){
    let itemId = item[0]
    let itemValue = item[1]
    //addToListEl.innerHTML += `<li>${itemId}</li`
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function(){
        //console.log(itemId)
        let exactLocationOfItemInDb = ref(database, `addToList/${itemId}`)
        remove(exactLocationOfItemInDb)
    })
    addToListEl.append(newEl)
}



// newEl.addEventListener("click", function(){
//     // console.log(itemId)
//      let exactLocationOfItemInDb = ref(database, `shoppingList/${itemId}`)

//      remove(exactLocationOfItemInDb)
//  })

//  shoppingListEl.append(newEl)
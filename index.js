import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://fir-e5caa-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppinglistEl = document.getElementById('shopping-list')

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(itemsInDB, inputValue)
    clearInputFields()
})

onValue(itemsInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        shoppinglistEl.innerHTML = ""
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItems(currentItem)
        }
    } else {
        shoppinglistEl.innerHTML = "No items here....yet!"
    }
})


function clearInputFields() {
    inputFieldEl.value = ""
}
function appendItems(item) {
    let itemID = item[0]
    let itemval = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemval

    //deleting an item after click
    newEl.addEventListener("click", function () {
        let exactLocationInDB = ref(database, `items/${itemID}`)
        remove(exactLocationInDB)
    })
    shoppinglistEl.append(newEl)
}
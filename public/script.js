// Fetching data from database
let dbData

async function readDB() {
    const res = await fetch("http://127.0.0.1:5000/read")
    const data = await res.json()
    dbData = data
}

readDB()


// Targeting important fields
let nameField = document.getElementById("nameField")
let businessField = document.getElementById("businessField")
let addressField = document.getElementById("addressField")
let numberField = document.getElementById("numberField")
let productField = document.getElementById("productField")
let imagePreview = document.getElementById("previmg")
let imageInput = document.getElementById("imageInput")


// function for searching data
function search() {

    const val = document.getElementById("searchField").value

    dbData.forEach( obj => {
        
        if ( 
            obj.name == val || 
            obj.business == val || 
            obj.address == val || 
            obj.number == val || 
            obj.product == val 
        ) {
            nameField.value = obj.name
            businessField.value = obj.business
            addressField.value = obj.address
            numberField.value = obj.number
            productField.value = obj.product
            
        }

    })

}


// function for displaying selected image
function displayImage() {
    const file = event.target.files[0]
    previmg.src = URL.createObjectURL(file)
}


// function for discarding everything
function discardImage() {
    imageInput.value = null
    imagePreview.src = "/static/placeholder.jpg"
}


// function for clearing all data
function clearAll() { location.reload() }


// function for extracting data from image and printing on screen
async function uploadImage() {

    const worker = await Tesseract.createWorker()

    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const { data: { text } } = await worker.recognize(imagePreview.src)

    await worker.terminate()

    const resArr = text.split("\n")

    nameField.value = resArr[0] || ""
    businessField.value = resArr[1] || ""
    addressField.value = resArr[2] || ""
    numberField.value = resArr[3] || ""
    productField.value = resArr[4] || ""

}


// function for saving data in database
async function saveData() {

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nameField.value,
            business: businessField.value,
            address: addressField.value,
            number: numberField.value,
            product: productField.value
        })
    }

    const res = await fetch("http://127.0.0.1:5000/save", options)    

    const data = await res.json()

    console.log(data)

    clearAll()

}

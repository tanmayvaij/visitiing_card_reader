let nameField = document.getElementById("nameField")
let businessField = document.getElementById("businessField")
let addressField = document.getElementById("addressField")
let numberField = document.getElementById("numberField")
let productField = document.getElementById("productField")
let imagePreview = document.getElementById("previmg")
let imageInput = document.getElementById("imageInput")

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
function clearAll() {
    nameField.value = ""
    businessField.value = ""
    addressField.value = ""
    numberField.value = ""
    productField.value = ""
    imageInput.value= ""
    imagePreview.src = "/static/placeholder.jpg"
}

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

const previmg = document.getElementById("previmg")

function displayImage() {
    const file = event.target.files[0]
    previmg.src = URL.createObjectURL(file)
}

function discardImage() {
    location.reload()
}
const imagePreview = document.getElementById("image-preview");
const filePicker = document.getElementById("image-upload")

function showPreview() {
    const files = filePicker.files;

    if (!files || files.length === 0) {
        imagePreview.src = "https://placehold.co/100";
        return;
    }

    const pickedFile = files[0];

    imagePreview.src = URL.createObjectURL(pickedFile);
}

filePicker.addEventListener('change', showPreview)

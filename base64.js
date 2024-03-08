
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result;
            // console.log(base64String);
            resolve(base64String);
        }
        reader.onerror = (error) => {
            // console.error('ERROR:', error);
            reject(error);
        }
    })
}

function handleFileInput(e) {
    let files = [];
    let tbody = document.getElementById('tbody')
    tbody.innerHTML = ''

    Object.values(e.files).forEach(file => {
        if (file.size < 500 * 1000) {
            getBase64(file)
                .then(result => {
                    file.base64 = result;
                    files.push(file);
                    tbody.innerHTML += `<tr>
                    <td>${file.name}</td>
                    <td>${Math.floor(file.size / 1000)}kb</td>
                    <td>${file.type}</td>
                    <td>
                        <button id='copy' onclick='navigator.clipboard.writeText("${file.base64}")'>copy</button>
                        ${(file.base64).slice(0, 60)}...
                    </td>
                    </tr>`
                })
                .catch(error => {
                    console.error(error);
                })
        }
    });


}

function base64ToFile(base64) {
    const b64 = base64.split(',')[1];
    const type = base64.split(',')[0].split(';')[0].split(':')[1];
    const byteCharacters = atob(b64);
    const sliceSize = /* sliceSize || */ 512;
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    return new File(byteArrays, 'image', {type});
}

module.exports = {
    base64ToFile
}
var input_Playlist = document.getElementById('Playlist_name')
var input_Song = document.getElementById('Song_name')
var input_Artist = document.getElementById('Artist_name')

function save_data() {

    let contador_data = 1

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }

    var Playlist = document.getElementById('Playlist_name').value
    var Song = document.getElementById('Song_name').value
    var Artist = document.getElementById('Artist_name').value

    localStorage.setItem("Playlist_" + contador_data, Playlist)
    localStorage.setItem("Song_" + contador_data, Song)
    localStorage.setItem("Artist_" + contador_data, Artist)
    contador_data = parseInt(contador_data) + 1
    localStorage.setItem("contador", contador_data)
    console.log(contador_data)

    let contador_actual = parseInt(contador_data) - 1
    list_data(contador_actual)
    document.getElementById("formulario").reset()

}

function list_data(contador_actual = 1, actualiza_tabla = false) {
    let body_tabla = document.getElementById("user_data")

    let titulo_formulario = document.querySelector("#cambio_formulario")
    titulo_formulario.innerHTML = `Create Playlist :)`

    if (actualiza_tabla) {
        let contador_futuro = localStorage.getItem('contador')
        for (let id_dato = 1; id_dato < contador_futuro; id_dato++) {
            if (localStorage.getItem('Playlist_' + id_dato) != null && localStorage.getItem('Song_' + id_dato) != null && localStorage.getItem('Artist_' + id_dato)) {
                body_tabla.innerHTML += `
                <tr>
                    <td>${localStorage.getItem('Song_' + id_dato)}</td>
                    <td>${localStorage.getItem('Artist_' + id_dato)}</td>
                    <td>
                    <i class="far fa-edit mx-2" onclick="edit(${id_dato})"></i>
                    <i class="far fa-trash-alt mx-2" onclick="delete_(${id_dato})"></i>
                    </td>
                </tr>
                `
            }
        }
    } else {
        body_tabla.innerHTML += `
        <tr>
            <td>${localStorage.getItem('Song_' + contador_actual)}</td>
            <td>${localStorage.getItem('Artist_' + contador_actual)}</td>
            <td>
                <i class="far fa-edit mx-2" onclick="edit(${contador_actual})"></i>
                <i class="far fa-trash-alt mx-2" onclick="delete_(${contador_actual})"></i>
            </td>
        </tr>
        `
    }


}

list_data(1, true)


function edit(indice_dato) {

    let boton = document.getElementById("boton_form")
    boton.setAttribute('onclick', `edit_element(${indice_dato})`)

    let titulo_formulario = document.querySelector("#cambio_formulario")
    titulo_formulario.innerHTML = `Edit song and artist name`


    input_Song.value = localStorage.getItem("Song_" + indice_dato)
    input_Artist.value = localStorage.getItem("Artist_" + indice_dato)

    console.log(input_Song)
    console.log(input_Artist)
}

function edit_element(indice_dato) {
    console.log(indice_dato)
    var Song_actualizacion = document.getElementById('Song_name').value
    var Artist_actualizacion = document.querySelector('#Artist_name').value


    localStorage.setItem("Song_" + indice_dato, Song_actualizacion)
    localStorage.setItem("Artist_" + indice_dato, Artist_actualizacion)


    let body_tabla = document.querySelector("#user_data")
    body_tabla.innerHTML = ''

    let titulo_formulario = document.querySelector("#cambio_formulario")
    titulo_formulario.innerHTML = `New song?`

    list_data(1, true)
    let boton = document.getElementById("boton_form")
    boton.setAttribute('onclick', `save_data()`)

    document.getElementById("formulario").reset()
}

function delete_(id_dato) {
    Swal.fire({
        title: 'Are you sure you want to delete this song?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'YES',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            let body_tabla = document.querySelector("#user_data")
            body_tabla.innerHTML = ''

            localStorage.removeItem("Song_" + id_dato)
            localStorage.removeItem("Artist_" + id_dato)
            list_data(1, true)


            Swal.fire({
                icon: 'success'
            })
            document.getElementById("formulario").reset()
        }
    })

}
list_data(1, true)

// evento para crear un nueva tarea


document.getElementById("formulario").addEventListener("submit", crear);


// función crear nueva tarea

function crear(e) {
    tarea = document.getElementById("tarea").value
    descripcion = document.getElementById("descripcion").value

    let task = {
        tarea,
        descripcion,

    }
    if (localStorage.getItem("Tareas") === null) {
        let tareas = []
        tareas.push(task)
        localStorage.setItem("Tareas", JSON.stringify(tareas))
    } else {
        let tareas = JSON.parse(localStorage.getItem("Tareas"))
        tareas.push(task)
        localStorage.setItem("Tareas", JSON.stringify(tareas))
    }

    leer();
    document.getElementById("formulario").reset();
    console.log("tarea guardada correctamente")
    e.preventDefault()
}

function leer() {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    document.getElementById("tbody").innerHTML = ""
    for (let i = 0; i < tareas.length; i++) {
        let tarea = tareas[i].tarea
        let descripcion = tareas[i].descripcion


        document.getElementById("tbody").innerHTML +=
            `<tr>
        <td>${tarea}</td>
        <td>${descripcion}</td>
        
        <td colspan="2">
        <button onclick="editar('${tarea}')" class="btn btn-danger">Editar</button>
        <button onclick="eliminar('${tarea}')" class="btn btn-success">Eliminar</button>
        </td>
        
        </tr>`
    }
}

// Función Editar tarea


function editar(tarea) {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].tarea === tarea) {
            document.getElementById("body").innerHTML = `
            
            <div class="row">
            <div class="col-md-12">
                <div class="card ">
                    <div class="card-header card-header-primary card-header-text">
                        <div class="card-text">
                            <h4 class="card-title">Editar tarea</h4>
                        </div>
                    </div>
                    <br>
                    <form id="formulario">

                        <div class=" row">
                            <label for="tarea" class="col-sm-2 col-form-label">Tarea:</label>
                            <div class="col-md-9">
                                <div class=" has-default">
                                    <input type="text" class="form-control input-sm" id="newtarea" name="newtarea"
                                    placeholder="${tareas[i].tarea}" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class=" row">

                            <label for="descripcion" class="col-sm-2 col-form-label">Descripción:</label>
                            <div class="col-md-9">
                                <div class=" has-default">


                                    <textarea class="form-control" id="newdescripcion" name="newdescripcion" rows="3"
                                        cols="20" placeholder="${tareas[i].descripcion}"required></textarea>
                                    
                                </div>
                            </div>
                        </div>

                        
                    </form>
                    <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                    <button class="btn btn-primary" onclick="vistaPrincipal()">Cancelar</button>

                </div>
                    
            `

        }
    }
}
// Función Actualizar tarea 

function actualizar(i) {

    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    tareas[i].tarea = document.getElementById("newtarea").value;
    tareas[i].descripcion = document.getElementById("newdescripcion").value;


    localStorage.setItem("Tareas", JSON.stringify(tareas));
    if (tareas[i].tarea === "") {
        alert("tarea está vacio");
        document.getElementById("newtarea").focus();
    }
    else if (tareas[i].descripcion === "") {
        alert("descripción está vacio");
        document.getElementById("newdescripcion").focus();
    }

    else {
        vistaPrincipal();
    }


}

// Función Eliminar

function eliminar(tarea) {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].tarea === tarea) {
            tareas.splice(i, 1);
        }
    }
    localStorage.setItem("Tareas", JSON.stringify(tareas));
    leer();

}

// Función para mostrar la interfaz principal

function vistaPrincipal() {
    document.getElementById("body").innerHTML = `
    <div class="row">
    <div class="col-md-12">

    <div class="card ">
        <div class="card-header card-header-primary card-header-text">
            <div class="card-text">

                <h4 class="card-title">Agregar nueva tarea</h4>
            </div>
        </div>

        <br>
        <form id="formulario">

            <div class=" row">
                <label for="tarea" class="col-sm-2 col-form-label">Tarea:</label>
                <div class="col-md-9">
                    <div class=" has-default">
                        <input type="text" class="form-control input-sm" id="tarea" name="tarea"
                            placeholder="Tarea" required>

                    </div>
                </div>
            </div>
            <div class=" row">

                <label for="descripcion" class="col-sm-2 col-form-label">Descripción:</label>
                <div class="col-md-9">
                    <div class=" has-default">
                        <textarea class="form-control" id="descripcion" name="descripcion" rows="3"
                            cols="20" required></textarea>

                    </div>
                </div>
            </div>

            <div class="form-check">
                <button type="submit" class="btn btn-info btn-round">Agregar
                    tarea</button>
            </div>
        </form>

    </div>

    <div class="card">
        <div class="col-md-12">
            <table class="table caption-top bg-light">
                <thead>
                    <tr>
                        <th scope="col">Tarea</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr>
                    <td>Tarea 1</td>
                    <td>Tarea de mate</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


</div>
</div>
    `
    leer();

}


leer();
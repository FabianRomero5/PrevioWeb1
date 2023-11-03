function generarIdUnico() {
    const timestamp = Date.now();
    const aleatorio = Math.floor(Math.random() * 1000); 
    return `${timestamp}${aleatorio}`;
}

function onSubmitForm(event) {
    event.preventDefault();
    console.log('aaaaaaaaaaaa');

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const tel = document.querySelector("#tel").value;
   
    const gustos = document.querySelector("#gustos").value;

   
    const tabla = document.querySelector("#table");
    const tbody = tabla.querySelector("tbody");

    const idUnicoPorEjecucion = generarIdUnico()
   
    const filaId = "fila_" + idUnicoPorEjecucion;
    const linkId = "link_" + idUnicoPorEjecucion;

    const fila = tbody.insertRow();
    fila.id = filaId; 

    
    const celdaGustos = fila.insertCell(0);
    const celdaPorcentaje = fila.insertCell(1);
    const celdaEditar = fila.insertCell(2);


    celdaGustos.textContent = gustos;
    celdaPorcentaje.textContent = "0";
    celdaPorcentaje.id = 'tph';


    const enlaceEditar = document.createElement("a");
    enlaceEditar.href = `#${filaId}`;
    enlaceEditar.textContent = "Editar";
    celdaEditar.appendChild(enlaceEditar);
    celdaEditar.id = linkId;


    enlaceEditar.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("CLIKED LINK")

        const editInput = 'edit-input'
        const fila = document.querySelector("#" + filaId);
        const editLink = fila.querySelector("#" + linkId);

        const actualizarBoton = document.querySelector("#actualizar");
        const cancelarBoton = document.querySelector("#cancelar");
        const mensaje = document.getElementById('mensaje');

        if(actualizarBoton ){
            console.log('ENTER IF CHECK');
            mensaje.style.display = 'inline-block';
            actualizarBoton.style.display = 'inline-block'; 
            cancelarBoton.style.display = 'inline-block'; 

        }
        

       
        if (fila.classList.contains("edit-mode")) {
            console.log("!IF")
            
            const celdaGustos = fila.cells[0]; 
            const nuevoGusto = celdaGustos.querySelector("input").value;
            celdaGustos.textContent = nuevoGusto;

            const celdaPorcentaje = fila.cells[1]; 
            const nuevoPorcentaje = celdaPorcentaje.querySelector("input").value;
            celdaPorcentaje.textContent = nuevoPorcentaje;
    


            fila.id = filaId;
            
            fila.removeAttribute("class");
        } else {
            console.log("!!ELSE");
            
            const celdaGustos = fila.cells[0];
            const antiguoGusto = celdaGustos.textContent;
            

            editLink.textContent = "En\n" + "edicion"

            const celdaPorcentaje = fila.cells[1];
            const antiguoPorcentaje = celdaPorcentaje.textContent;

            const inputGustos = document.createElement("input");
            inputGustos.type = "text";
            inputGustos.value = antiguoGusto;

            const inputPorcentaje = document.createElement("input");
            inputPorcentaje.type = "text";
            inputPorcentaje.value = antiguoPorcentaje;

            celdaGustos.textContent = ""; 
            celdaGustos.appendChild(inputGustos);

            celdaPorcentaje.textContent = ""; 
            celdaPorcentaje.appendChild(inputPorcentaje);

            inputGustos.id = editInput;
            inputPorcentaje.id = editInput;


            
            fila.classList.add("edit-mode");
        }
    });


    
    document.querySelector("#gustos").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".form");

    

    if (formulario) {
        formulario.addEventListener("submit", onSubmitForm);
    }
    const texto=document.querySelector(".texto")
    const actualizarBoton = document.querySelector(".fix-buttons");
    const existEditcells = this.querySelector(".editmode");

    if(existEditcells){
        actualizarBoton.style.display = 'inline-block'; 
        cancelarBoton.style.display = 'inline-block'; 
        texto.style.display = 'inline-block';


    }

    
    if (actualizarBoton) {
        actualizarBoton.addEventListener("dblclick", function () {
            console.log("console doble clcik");
           
            const formulario = document.querySelector(".classform");
            const formData = new FormData(formulario); 
                       

            let name = document.querySelector("#name").value
            let email = document.querySelector("#email").value
            let text = document.querySelector("#tel").value
           

            console.log("NAME",name);

            const tabla = document.querySelector("#table");
            const tbody = tabla.querySelector("tbody");
            const filas = tbody.querySelectorAll("tr");

            
            const datosTabla = [];

            datosTabla.push({name: name}, {email:email},{text: text});

            filas.forEach((fila) => {
                const celdaGustos = fila.cells[0].textContent;
                const celdaPorcentaje = fila.cells[1].textContent;
                datosTabla.push({
                    gustos: celdaGustos,
                    porcentaje: celdaPorcentaje,
                });
            });

            
            formData.append("datosTabla", JSON.stringify(datosTabla));
            console.log("console doble clcik", datosTabla);

            const urlParams = new URLSearchParams(formData);
            const url = `resivido2.html?${urlParams.toString()}`;

            
           window.location.href=url
        
        });
    

        actualizarBoton.addEventListener("click", function () {
            const filaEdit = document.querySelector(".edit-mode");

            if (filaEdit) {
                
                const celdaGustos = filaEdit.cells[0];
                const nuevoGusto = celdaGustos.querySelector("input").value;

                const celdaPorcentaje = filaEdit.cells[1];
                const nuevoPorcentaje = celdaPorcentaje.querySelector("input").value;

               
                celdaGustos.textContent = nuevoGusto;
                celdaPorcentaje.textContent = nuevoPorcentaje;

                
                const editLink = filaEdit.cells[2];
                const linkRestore = "#fila_" + editLink.id.split('_')[1];
                const linkRestored = document.createElement("a");
                linkRestored.href = linkRestore;

                linkRestored.textContent = "Editar";
                editLink.textContent = "";
                editLink.appendChild(linkRestored);



               
                filaEdit.removeAttribute("class");

                linkRestored.addEventListener("click", function (event) {
                    event.preventDefault();
                    
                    const editInput = 'edit-input'
                    const fila = document.querySelector(linkRestore);
                  
                    console.log("CLIKED LINK", editLink)
                    const editLinkk = fila.querySelector("#"+editLink.id);

                    
                    if (fila.classList.contains("edit-mode")) {
                        console.log("!IF")
                        
                        const celdaGustos = fila.cells[0]; 
                        const nuevoGusto = celdaGustos.querySelector("input").value;
                        celdaGustos.textContent = nuevoGusto;

                        const celdaPorcentaje = fila.cells[1]; 
                        const nuevoPorcentaje = celdaPorcentaje.querySelector("input").value;
                        celdaPorcentaje.textContent = nuevoPorcentaje;




                        fila.id = filaId;
                       
                        fila.removeAttribute("class");
                    } else {
                        console.log("!!ELSE");
                        
                        const celdaGustos = fila.cells[0];
                        const antiguoGusto = celdaGustos.textContent;

                        editLinkk.textContent = "En\n" + "edicion"

                        const celdaPorcentaje = fila.cells[1];
                        const antiguoPorcentaje = celdaPorcentaje.textContent;

                        const inputGustos = document.createElement("input");
                        inputGustos.type = "text";
                        inputGustos.value = antiguoGusto;

                        const inputPorcentaje = document.createElement("input");
                        inputPorcentaje.type = "text";
                        inputPorcentaje.value = antiguoPorcentaje;

                        celdaGustos.textContent = ""; 
                        celdaGustos.appendChild(inputGustos);

                        celdaPorcentaje.textContent = ""; 
                        celdaPorcentaje.appendChild(inputPorcentaje);

                        inputGustos.id = editInput;
                        inputPorcentaje.id = editInput;


                        
                        fila.classList.add("edit-mode");
                    }
                });


                
                document.querySelector("#gustos").value = "";
            }
        });
    }
});
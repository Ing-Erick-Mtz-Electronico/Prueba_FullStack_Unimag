//este script es el encargado de crear un nuevo producto
//se conecta con los elementos del DOM
let code = document.getElementById("code");
let nam = document.getElementById("name");
let price = document.getElementById("price");
let form = document.getElementById("form");
let note = document.getElementById("warning");

//funcion encargada de enviar los datos al servidor
const postData = async (url = "", data = {})=> {
    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          return res.json();

    } catch (error) {
        return {};
    }
}

//evento encargado de validar y enviar los datos al servidor
form.addEventListener('submit', e => {
  e.preventDefault();
  let warning = '';
  let ack = false;

  if (code.value.length > 8) {
    warning += `El codigo debe ser menor a 8 caracteres. <br>`;
    ack = true;
  }

  if (nam.value.length > 20) {
    warning += `El nombre debe ser menor a 20 caracteres.`;
    ack = true;
  }

  if (ack) {
    note.innerHTML = warning;
  } else {
    let body = {
        _id: Number(code.value),
        name: nam.value,
        price: Number(price.value)
    }
    postData("http://localhost:3000/products", body)
      .then(data => {
        if (data.body.acknowledged) {
          note.innerHTML = `ID: ${data.body.insertedId}`;
        } else {
          note.innerHTML = "Error de envio";
        }
      })
      .catch(e=>{
        alert('Error de envio')
      });
  }
});

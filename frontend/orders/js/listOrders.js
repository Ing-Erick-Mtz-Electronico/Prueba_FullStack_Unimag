//---este script es el encargado de mostrar la lista de ordenes que se encuentran en el servidor
//se conectan los elementos del DOM
let divCardBody = document.getElementById('cardBody');

//peticion para traer los datos del servidor e imprimir en pantalla
fetch("http://localhost:3000/orders")
    .then(res=> res.json())
    .then(data=>{
        for (const itemData of data.body) {

            let divCard = document.createElement('div');
            let divCardHeader = document.createElement('div');
            let {_id:id,user,products} = itemData;

            let divId = document.createElement('div');
            let h4Id = document.createElement('h4');
            let pId = document.createElement('p');

            divCard.className = 'card container mt-4 shadow-lg p-3 mb-1 rounded'
            divCardHeader.className = 'card-header'
            divId.className = 'mb-3';
            h4Id.innerText = 'ID pedio:';
            pId.innerText = id;
            divId.appendChild(h4Id);
            divId.appendChild(pId);
            divCardHeader.appendChild(divId);

            let bodyTable = '';
            let tableUser = document.createElement('table');
            tableUser.className = 'table table-bordered';
            tableUser.innerHTML = `<thead class="table-dark" ><tr><th>Id usuario</th><th>Nombre</th><th>Direccion</th><th>Telefono</th></tr></thead>`;
            bodyTable += `<tr><td>${user._id}</td><td>${user.name}</td><td>${user.direcction}</td><td>${user.phone}</td></tr>`;
            tableUser.innerHTML += bodyTable;

            divCardHeader.appendChild(tableUser);
            divCard.appendChild(divCardHeader);

            let tableProduct = document.createElement('table');
            tableProduct.className = 'table table-bordered'
            tableProduct.innerHTML = `<thead class="table-dark" ><tr><th>Id producto</th><th>Cantidad</th><th>Precio</th></tr></thead>`;
            bodyTable = '';
            for (let i = 0; i < products.length; i++) {
                bodyTable += `<tr><td>${products[i]._id}</td><td>${products[i].amount}</td><td>${products[i].price}</td></tr>`;
            }
            tableProduct.innerHTML += bodyTable;
            let divCardTable = document.createElement('div');
            divCardTable.className = 'card-body';
            divCardTable.appendChild(tableProduct);
            divCard.appendChild(divCardTable);
            divCardBody.appendChild(divCard);
        }

    })
    .catch(e=>{
        alert('Error de servidor, vuelva a recargar la pagina');
    });



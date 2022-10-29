//---este script muestra en pantalla un pedido solicitado
//traer elementos del DOM
let form = document.getElementById('form');
let idOrder = document.getElementById('idOrder');
let divBody= document.getElementById('divBody')

//evento para traer los datos del servidor
form.addEventListener('submit', e =>{
    e.preventDefault();
    //peticion Get /orders/:id al servidodor
    fetch(`http://localhost:3000/orders/${idOrder.value}`)
        .then(res=>res.json())
        .then(data=>{

            let {_id:id,user,products} = data.body;
            const cardBody = document.createElement('div');
            let divId = document.createElement('div');
            let h4Id = document.createElement('h4');
            let pId = document.createElement('p');

            cardBody.className = 'card-body';
            divId.className = 'mb-3';
            h4Id.innerText = 'ID pedio:';
            pId.innerText = id;
            divId.appendChild(h4Id);
            divId.appendChild(pId);
            cardBody.appendChild(divId);

            let bodyTable = '';
            let tableUser = document.createElement('table');
            tableUser.className = 'table';
            tableUser.innerHTML = `<thead class="table-dark"><tr><th>Id usuario</th><th>Nombre</th><th>Direccion</th><th>Telefono</th></tr></thead>`;
            bodyTable += `<tr><td>${user._id}</td><td>${user.name}</td><td>${user.direcction}</td><td>${user.phone}</td></tr>`;
            tableUser.innerHTML += bodyTable;

            cardBody.appendChild(tableUser);

            let tableProduct = document.createElement('table');
            tableProduct.className = 'table'
            tableProduct.innerHTML = `<thead class="table-dark"><tr><th>Id producto</th><th>Cantidad</th><th>Precio</th></tr></thead>`;
            bodyTable = '';
            for (let i = 0; i < products.length; i++) {
                bodyTable += `<tr><td>${products[i]._id}</td><td>${products[i].amount}</td><td>${products[i].price}</td></tr>`;
            }
            tableProduct.innerHTML += bodyTable;
            cardBody.appendChild(tableProduct);
            divBody.appendChild(cardBody);
        }).catch(e=>{
            alert('No existe un pedido con este codigo');
        })
})
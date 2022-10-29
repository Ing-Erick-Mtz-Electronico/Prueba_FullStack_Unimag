//este script es el encargado de realizar un pedido
// se conectan con los elementos del DOM
let amount = document.getElementById('amount');
let ident = document.getElementById('ident');
let name = document.getElementById('name');
let direcction = document.getElementById('direcction');
let phone = document.getElementById('phone');
let form = document.getElementById('form');
let buttonAddNewSelect = document.getElementById('buttonAdd');
let divSelect = document.getElementById('divSelect')
let note = document.getElementById('warning');
let count = 0;

//funcion encargada de enviar el producto al servidor
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

//funcion encargada de traer un producto del servisor
const getData= async (url = "")=>{
    try {
        let res = await fetch(url);
        return res.json();

    } catch (error) {
        return {};
    }
}

//funcion encargada de insertar una nueva lista de seleccion de productos
const insertSelect = ()=>{
    let divSelectProduct = document.createElement('div');
    let labelSelect = document.createElement('label');
    let select = document.createElement('select');
    let divAmount = document.createElement('div');
    let labelAmount = document.createElement('label');
    let inputAmount = document.createElement('input');

    divSelectProduct.className = 'mb-3';
    labelSelect.htmlFor = `select-${count}`;
    labelSelect.className = 'form-label';
    labelSelect.innerText = 'Seleccione un producto:';
    select.className = 'form-select';
    select.id = `select-${count}`;

    divAmount.className = 'mb-3';
    labelAmount.htmlFor = `amount-${count}`;
    labelAmount.className = 'form-label';
    labelAmount.innerText = 'Cantidad:';
    inputAmount.type = 'number';
    inputAmount.className = 'form-control';
    inputAmount.id = `amount-${count}`;
    inputAmount.placeholder = 'Cantidad';
    inputAmount.name = 'amount';
    inputAmount.required = true;
    divAmount.appendChild(labelAmount);
    divAmount.appendChild(inputAmount);

    getData("http://localhost:3000/products")
        .then((data)=>{
            let {body:listProducts} = data;
            for (const product of listProducts) {
                let option = document.createElement('option');
                option.value = product._id;
                option.innerText = product.name;
                select.appendChild(option);
            }

            divSelectProduct.appendChild(labelSelect);
            divSelectProduct.appendChild(select);
            divSelectProduct.appendChild(divAmount);
            divSelect.appendChild(divSelectProduct);
            count++;
        })
        .catch(e=>{
            alert('Error de ejecución')
        });
}

//evento encargado de insertar una nueva lista
buttonAddNewSelect.addEventListener('click',e=>{
    insertSelect();
})

//evento encargado de enviar los datos al servidor
form.addEventListener('submit',async e=>{
    e.preventDefault();

    let body = {
        user: {_id: ident.value,
        name: name.value,
        direcction: direcction.value,
        phone: phone.value
        },
        products:[]
    }

    for (let i = 0; i < count; i++) {

        let id = document.getElementById(`select-${i}`).value;
        let amount = Number(document.getElementById(`amount-${i}`).value);
        let price = await getData(`http://localhost:3000/products/${id}`);

        let ObjectProductsSales = {
            _id: id,
            amount: amount,
            price: price.body.price
        }
        body.products.push(ObjectProductsSales);
    }

    postData("http://localhost:3000/orders", body)
        .then((data) => {
            if (data.body.acknowledged) {
                note.innerText = 'Id orden: '+data.body.insertedId;
            } else {
                note.innerText = "Error de envio";
            }
        })
        .catch(e=>{
            alert('Error de servidor')
        })
})

insertSelect();


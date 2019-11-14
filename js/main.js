let prod = [
    // {
    //     nombre: 'Carne',
    //     cantidad: 1,
    //     precio: 45
    // },
    // {
    //     nombre: 'Pollo',
    //     cantidad: 3,
    //     precio: 20
    // },
    // {
    //     nombre: 'Fideos',
    //     cantidad: 5,
    //     precio: 10
    // },
    // {
    //     nombre: 'Huveos',
    //     cantidad: 2,
    //     precio: 15
    // }
]

const ul = document.createElement("ul");
ul.classList.add("demo-list-item");
ul.classList.add("mdl-list");

document.querySelector("#button-add").addEventListener("click", e => {
    const valor = document.querySelector("input#producto-input");

    if (valor.value != '')
        prod.push({
            nombre: valor.value,
            cantidad: 2,
            precio: 15
        })

    valor.value = "";

    render();

});

document.querySelector("#button-clr").addEventListener("click", e => {
    prod = [];
    render();
});

if(prod.length){
    
}

function render() {

    ul.innerHTML = "";

    index = 0;

    prod.forEach(producto => {

        ul.innerHTML +=
            `<li class="mdl-list__item">
            <span class="w-30 mdl-list__item-primary-content">
                ${producto.nombre} <br>
                <!-- Qty: ${producto.cantidad} <br>
                Precio: ${producto.precio} -->
            </span>
        <!-- </li>
        <li class="mdl-list__item"> -->
            <div class="w-25 mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input cantidad-input" type="Cantidad" id="cantidad${index}">
                <label class="mdl-textfield__label" for="cantidad">${producto.cantidad}</label>
            </div>
            <div class="ml-items w-30 mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input precio-input" type="Precio" id="precio${index}">
                <label class="mdl-textfield__label" for="precio">${producto.precio}</label>
            </div>
            <div class="button-div w-25">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect button-clr-one">
                    <i class="material-icons">remove</i>
                </button>
            </div>
        </li>`

        index++;

        componentHandler.upgradeElements(ul)

    });

    document.querySelector("div#lista").appendChild(ul);

    update_buttons();
    update_inputs();

}

function remove_item(arr, n){
    let arr_ret = [];
    arr.forEach((element,idx) => {
        if(idx != n)
            arr_ret.push(element);
    });
    return arr_ret;
}

function update_buttons(){
    document.querySelectorAll(".button-clr-one").forEach((element, index) => {
        element.addEventListener("click", e => {
            console.log("click");
            prod = remove_item(prod, index);
            render();
        })
    });
}

function update_inputs(){
    document.querySelectorAll("input.cantidad-input").forEach((element, index) => {
        element.addEventListener("blur", e => {
            prod[index].cantidad = parseInt(e.target.value);
        })
    });
    document.querySelectorAll("input.precio-input").forEach((element, index) => {
        element.addEventListener("blur", e => {
            prod[index].precio = parseInt(e.target.value);
        })
    });

    
}

function guardar_lista() {
    let prod_str = JSON.stringify(prod);
    localStorage.setItem('lista', prod_str);
}

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log("Registrado ", reg))
    .catch(err => console.log("Error ", err))
}
let names = ['Margherita', 'Tonno', 'Salami', 'Funghi'];
let ingredients = ['mit Tomatensauce und Mozzarella', 'mit Thunfisch und Zwiebeln', 'mit Salami', 'mit frischen Champignons'];
let prices = [8.00, 9.50, 9.00, 8.50];


let basket_food = [];
let basket_price = [];
let basket_amount = [];
let basket_ingredient = [];


function renderPizzaContainer() {
    let container = document.getElementById('pizza-container');
    container.innerHTML = '';
    for (let i = 0; i < names.length; i++) {
        container.innerHTML += generatePizzaContainer(i);
    }
}


function generatePizzaContainer(index) {
    let price = prices[index]
    let ingredient = ingredients[index]
    let pizza = names[index]
    let formattedPrice = price.toFixed(2).replace('.', ',');

    return /*html*/ `
    <div class="pizza-container" onclick="addFoodToArrays('${pizza}','${price}','${ingredient}')">
        <div>
            <h4>Pizza ${pizza}</h4>
             <p class="description">${ingredient}</p>
            <p class="topping">Wahl aus: mit Ananas...usw.</p>
            <p class="price"><b>${formattedPrice} €</b></p>
        </div>
        <div class="plus"><img class="plus-icon" src="./img/plus.png"></div>
    </div>
    `;
}


function addFoodToArrays(pizza, price, ingredient) {
    let index = basket_food.indexOf(pizza);
    if (index == -1) {
        pushFood(pizza, price, ingredient);
    } else {
        basket_amount[index]++;
    }
    showShoppingCart();
}

function pushFood(pizza, price, ingredient) {
    basket_food.push(pizza);
    basket_price.push(price);
    basket_ingredient.push(ingredient);
    basket_amount.push(1);
}


function removeFood(i) {
    if (basket_amount[i] > 1) {
        basket_amount[i]--;
    } else {
        spliceFood(i);
        if (basket_amount.length == 0) {
            showBasketPreset();
            hideFinalSumContainer();
        }
    }
    renderShoppingCart();
}


function spliceFood(i) {
    basket_food.splice(i, 1);
    basket_ingredient.splice(i, 1);
    basket_price.splice(i, 1);
    basket_amount.splice(i, 1);
}


function addOneMore(i) {
    basket_amount[i]++;
    renderShoppingCart();
}


function showShoppingCart() {
    hideBasketPreset();
    renderShoppingCart();
    showFinalSumContainer();
}


function showBasketPreset() {
    document.getElementById('basket-description').classList.remove('d-none');
}


function hideBasketPreset() {
    document.getElementById('basket-description').classList.add('d-none');
}


function renderShoppingCart() {
    let xyz = document.getElementById('js-sidebar');
    xyz.innerHTML = '';

    for (let i = 0; i < basket_food.length; i++) {

        xyz.innerHTML += generateBasketItem(i);
    }
    doFinalSum();
}


function generateBasketItem(i) {
    let sum = basket_price[i] * basket_amount[i];

    return /*html*/ `
    <div class="basket-total">
        <div class="order">
            <div><b>${basket_amount[i]}</b></div>
            <div class="order-child">
                <div><b>Pizza ${basket_food[i]}</b></div>
                <div>${sum.toFixed(2).replace('.', ',')} €</div>
            </div>
        </div>
        <div class="order-description">${basket_ingredient[i]}</div>
        <div class="order-details">
            <div class="comment"><a>Anmerkung hinzufügen</a></div>
            <div class="add-remove">
                <div class="add-remove-child" onclick="removeFood(${i})"><img class="icon" src="./img/minus.png"></div>
                <div class="add-remove-child" onclick="addOneMore(${i})"><img class="icon" src="./img/plus.png"></div>
            </div>
        </div>
    </div>
    `;
}


function doFinalSum() {
    let sum = 0;
    for (let i = 0; i < basket_food.length; i++) {
        sum += basket_price[i] * basket_amount[i];
    }
    let final_sum = sum + 2;
    generateFinalSumContainer(sum, final_sum);
}


function generateFinalSumContainer(sum, final_sum) {
    document.getElementById('final-sum-container').innerHTML =
    /*html*/ `
    <div class="sum">Zwischensumme
        <div>${sum.toFixed(2).replace('.', ',')} €
        </div>
    </div>
    <div class="delivery-price">Lieferkosten
        <div>2,00 €</div>
    </div>
    <div class="final-sum">Gesamtsumme
        <div>${final_sum.toFixed(2).replace('.', ',')} €
        </div>
    </div>
    <div class="button" onclick="thankYou()"><button>Bestellen ${final_sum.toFixed(2).replace('.', ',')} €</button></div>
    `;
}


function hideFinalSumContainer() {
    document.getElementById('final-sum-container').classList.add('d-none');
}


function showFinalSumContainer() {
    document.getElementById('final-sum-container').classList.remove('d-none');
}


function thankYou() {
    alert('Vielen Dank für deine Bestellung');
}
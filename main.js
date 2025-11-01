//get total
let Title = document.getElementById("title");
let Price = document.getElementById("price");
let Taxes = document.getElementById("taxes");
let Total = document.getElementById("total");
let btn = document.getElementById("btn");
let Count = document.getElementById("count");
let Category = document.getElementById("category");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
function getTotal() {
    if (Price.value!=null && Price.value!=""){
        let ressult=parseFloat(Price.value) + parseFloat(Taxes.value) + parseFloat(ads.value) - parseFloat(discount.value)
        Total.innerHTML = ressult    
        Total.style.background = "rgba(6, 52, 153, 1)";
    } 
    else{
       Total.innerHTML= "";
       Total.style.background = "rgba(94, 47, 223, 1)";
    }
   
}

//create product 
let dadta = [];
sumb.onclick = function () {
    let newPro = {
        title: Title.value,
        price: Price.value,
        taxes: Taxes.value,
        ads: ads.value, 
        discount: discount.value,
        total: getTotal(),
        count: Count.value,
        category: Category.value
    };
    dadta.push(newPro);
};

//save product to localstorage
localStorage.setItem("products", JSON.stringify(dadta));




//clear on click
//read
//update
//count
//search
//delete
//update
//clean data
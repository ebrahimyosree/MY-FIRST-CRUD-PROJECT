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
    if (Price.value != null && Price.value != "") {
        let ressult = parseFloat(Price.value) + parseFloat(Taxes.value) + parseFloat(ads.value) - parseFloat(discount.value)
        Total.innerHTML = ressult
        Total.style.background = "rgba(6, 52, 153, 1)";
    }
    else {
        Total.innerHTML = "";
        Total.style.background = "rgba(94, 47, 223, 1)";
    }

}




//create product 
let sumb = document.getElementById("sumb");
let dadta;
if (localStorage.products != null && localStorage.products != "") {
    dadta = JSON.parse(localStorage.products);
}
else {
    dadta = [];

}
sumb.onclick = function () {
    let newPro = {
        title: Title.value,
        price: Price.value,
        taxes: Taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: Total.innerHTML,
        count: Count.value,
        category: Category.value
    };
      // تحقق لو أي قيمة فاضية أو صفر بدون معنى
    if (
        Title.value.trim() === "" ||
        Price.value.trim() === "" ||
        isNaN(Price.value) || Number(Price.value) <= 0 ||
        Taxes.value.trim() === "" ||
        isNaN(Taxes.value) ||
        ads.value.trim() === "" ||
        isNaN(ads.value) ||
        discount.value.trim() === "" ||
        isNaN(discount.value) ||
        Count.value.trim() === "" ||
        isNaN(Count.value) || Number(Count.value) <= 0 ||
        Category.value.trim() === ""
    ) {
        return;
    }
    dadta.push(newPro);
    //save product to localstorage
    localStorage.setItem("products", JSON.stringify(dadta));
    clearData();
    read();

    };



    //read
    function read() {
        let table = "";
        for (let i = 0; i < dadta.length; i++) {
            table += `
        <tr>
            <td>${i + 1}</td>   
            <td>${dadta[i].title}</td>
            <td>${dadta[i].price}</td>
            <td>${dadta[i].taxes}</td>
            <td>${dadta[i].ads}</td>
            <td>${dadta[i].discount}</td>
            <td>${dadta[i].total}</td>
            <td>${dadta[i].category}</td>
            <td><button id="update">Update</button></td>
            <td><button  id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
        }
        document.getElementById("t-body").innerHTML = table;
    }


//clear on click
    function clearData() {
        Title.value = "";
        Price.value = "";
        Taxes.value = "";
        Total.innerHTML = "";
        Count.value = "";
        Category.value = "";
        ads.value = "";
        discount.value = "";
    };


//delete
function deleteData(i) {
    dadta.splice(i, 1);
    localStorage.products = JSON.stringify(dadta);
    read();
}





//update
//count
//search
//delete
//update
//clean data-from inputs-
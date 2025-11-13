//get total
let Title = document.getElementById("title");
let Price = document.getElementById("price");
let Taxes = document.getElementById("taxes");
let Total = document.getElementById("total");
let Count = document.getElementById("count");
let Category = document.getElementById("category");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
function getTotal() {
    if (Price.value != null && Price.value != "" && ads.value != "" && Taxes.value != "" && discount.value != "") {
        let ressult = parseFloat(Price.value) + parseFloat(Taxes.value) + parseFloat(ads.value) - parseFloat(discount.value)
        Total.innerHTML = ressult
        Total.style.background = "rgba(25, 189, 47, 1)";
        small = document.getElementById("total")
        //small.style.background = "rgba(25, 189, 47, 1)";

    }
    else {
        Total.innerHTML = "";
        Total.style.background = "#000";
    }

}
let mood = "create";




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
    if (mood === "create") {
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
        else {
            if (mood === "create") {
                let countValue = parseInt(Count.value);
                if (countValue > 1) {
                    for (let i = 0; i < countValue; i++) {
                        dadta.push(newPro);
                    }
                } else {
                    dadta.push(newPro);
                }
            }
            //save product to localstorage
            localStorage.setItem("products", JSON.stringify(dadta));
            clearData();
            read();
        };
    }
    else {
        dadta[tmp] = newPro;
        
        localStorage.products = JSON.stringify(dadta);
        sumb.innerHTML = "Create";
        Count.style.display = "block";
        clearData();
        read();
        mood = "create";

    }




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
            <td><button id="update" onclick="update(${i})">Update</button></td>
            <td><button  id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("t-body").innerHTML = table;



    //delete all
    if (dadta.length > 0) {
        let deleteAllBtn = document.getElementById("deleteAll");
        deleteAllBtn.innerHTML = `<button class="da" onclick="deleteAll()">Delete All </button>`;
        
    } else {
        let deleteAllBtn = document.getElementById("deleteAll");
        deleteAllBtn.style.display = "none";
    }
    updateDeleteAllButton();


}
read();

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
    read();
};


//delete
function deleteData(i) {
    dadta.splice(i, 1);
    localStorage.products = JSON.stringify(dadta);
    read();
}



//update product
function update(i) {
    Title.value = dadta[i].title;
    Price.value = dadta[i].price;
    Taxes.value = dadta[i].taxes;
    ads.value = dadta[i].ads;
    discount.value = dadta[i].discount;
    Count.value = dadta[i].count;
    Category.value = dadta[i].category;
    getTotal();
    tmp = i;
    Count.style.display = "none";
    sumb.innerHTML = "Update";
    mood = "update";
}
// count
read();
function updateDeleteAllButton() {
    let deleteAllBtn = document.getElementById("deleteAll");
    if (dadta.length > 0) {
        deleteAllBtn.innerHTML = `<button class="da" onclick="deleteAll()">Delete All (${dadta.length})</button>`;
        deleteAllBtn.style.display = "block";
    } else {
        deleteAllBtn.style.display = "none";
    }
}
updateDeleteAllButton();


// search
let srhbtn = document.getElementById("srhbtn");
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "search-title") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    read();
}

function searchData(value) {
    if (value === "") {
        read();
        return;
    }

    let table = "";
    for (let i = 0; i < dadta.length; i++) {
        if (searchMood == "title") {
            if (dadta[i].title.includes(value)) {
                table += rowHTML(i);
            }
        } else {
            if (dadta[i].category.includes(value)) {
                table += rowHTML(i);
            }
        }

    }
    document.getElementById("t-body").innerHTML = table;
}

function rowHTML(i) {
    return `   <tr>
                 <td>${i + 1}</td>
                   <td>${dadta[i].title}</td>
                   <td>${dadta[i].price}</td>
                   <td>${dadta[i].taxes}</td>
                   <td>${dadta[i].ads}</td>
                   <td>${dadta[i].discount}</td>
                   <td>${dadta[i].total}</td>
                   <td>${dadta[i].category}</td>
                   <td><button id="update" onclick="update(${i})">Update</button></td>
                   <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
    `;

}




//delete all
function deleteAll() {
    localStorage.clear();
    dadta.splice(0);
    read();
}

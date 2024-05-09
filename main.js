let title = document.getElementById("title");
let price = document.getElementById("price");
let textes = document.getElementById("textes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;


function getTotal()
{
if(price.value !=''){
    let result =(+price.value + +textes.value + +ads.value)
    - +discount.value;
    total.innerHTML=result;
    total.style.background='#040'
}else{
    total.innerHTML='';
    total.style.background='#a00d02'
}
}




let dataPro;
if(localStorage.product!=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}



submit.onclick = function(){
    let newpro ={
        title:title.value,
        price:price.value,
        textes:textes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
        
    if(title.value !='' && price.value !=''&& category.value !='' &&newpro.count<100){
           if(mood==='create'){
           if(newpro.count>1){
        for(let i =0 ;i < newpro.count;i++){
            dataPro.push(newpro);
        }
    }else{
        dataPro.push(newpro);
    } 
    }else{
        dataPro[ tmp  ]=newpro;
        mood = 'create';
        submit.innerHTML='create';
        count.style.display='block';
    } 
    clearData()
    }



    localStorage.setItem('product',JSON.stringify(dataPro))


    
    showData()
}


function clearData(){
title.value = '';
price.value='';
textes.value='';
ads.value = '';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}



function showData()
{
    getTotal()
    let table = '';
    for(let i=0; i <dataPro.length;i++){
        table +=`
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].textes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr> 
        `;
        
    }
    document.getElementById('tbody').innerHTML= table;
    let  btnDelete = document.getElementById('deleteAll');
    if(dataPro.length >0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()





function deleteData(i){

    dataPro.splice(i,1)
    localStorage.product=JSON.stringify(dataPro)
    showData()
}

function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}







function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    textes.value = dataPro[i].textes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display='none';
    category.value = dataPro[i].category;
    submit.innerHTML='Update';
    mood='Update';
    tmp =i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}








let searchMood = 'title';


function getSearchMood(id)
{

    let search =document.getElementById('search');
 if(id=='searchTitle'){
    searchMood = 'title';
 }else{
    searchMood = 'category';
 }
    search.placeholder='search By '+ searchMood;
    search.focus()
    search.value='';
 showData()
}


function searchData(value)
{
    let table='';
    for(let i = 0 ; i < dataPro.length ; i++){
 if(searchMood == 'title')
    {
   
    
        if(dataPro[i].title.includes(value)){
            table +=`
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].textes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr> 
        `;
        }
    
 }
 else{
    
        if(dataPro[i].category.includes(value )){
            table +=`
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].textes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr> 
        `;
        }
    
 }

    }
 document.getElementById('tbody').innerHTML= table;



}



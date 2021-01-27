const cafeList = document.querySelector('#cafe-list');
const form =document.querySelector('#add-cafe-form');
//create list element and render data
function renderCafe(doc){
  let li = document.createElement('li');
  let name=document.createElement('span');
  let city=document.createElement('span');
 
  li.setAttribute('data-id', doc.id);  //id is not save in database, it is not the part of data
  name.textContent=doc.data().name;
  city.textContent=doc.data().city;

  //assign value to li tag
  li.appendChild(name);
  li.appendChild(city);
  //assign the child to ul.
  cafeList.appendChild(li);
}
//getting Data from DB
db.collection('cafes').get().then((snapshot)=>{
  snapshot.docs.forEach(doc=> {
    renderCafe(doc);    
  })
})
//saving Data
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  db.collection('cafes').add({
    name:form.name.value,
    city:form.city.value
  });
  form.name.value="";
  form.name.value="";

})

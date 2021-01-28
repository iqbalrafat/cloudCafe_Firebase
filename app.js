const cafeList = document.querySelector('#cafe-list');
const form =document.querySelector('#add-cafe-form');
//create list element and render data
function renderCafe(doc){
    let li = document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');  
    let cross=document.createElement('div');
 
  li.setAttribute('data-id', doc.id);  //id is not save in database, it is not the part of data
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent='X';  // cross is a symbol that we will use to delete it is not in DB

  //assign value to li tag
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

  //assign the child to ul.
    cafeList.appendChild(li);

    //Delete Data
    // To delete data we will add a cross symbol in li tag then add event listener that
    //will take the individual id of the cafe and delete it.
  cross.addEventListener('click',(e)=>{
      e.stopPropagation();
      //do console.log(e).event object has an object that has object parentElement that contain property attributes.
      //get Attribute() method take the value of that property in our case data-id.
      let id=e.target.parentElement.getAttribute('data-id'); 
      db.collection('cafes').doc(id).delete();
  })
}
//getting All Data from DB, no update on front end.

  // db.collection('cafes').get().then((snapshot)=>{
  //   snapshot.docs.forEach(doc=> {
  //   renderCafe(doc);    
  //   })
  // })

// Orderby() method allow to display data in specific order.In firebase upper case come first. Also firebase require indexing that can be done any time.
//orderby() method can be combine with other method like where()

  // db.collection('cafes').orderBy('name').get().then((snapshot)=>{
  //   snapshot.docs.forEach(doc=> {
  //   renderCafe(doc);    
  //   })
  // })

  //getting single data from DB
  //where() method allow to retrieve selected field from DB. It has three parameter, field, condition and field value
  // db.collection('cafes').where('city','==','Edmonton').get().then((snapshot)=>{
  //   snapshot.docs.forEach(doc=>{
  //     renderCafe(doc);
  //   })
  // })
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
  //Real time Listener. onSnapshot() method gives the real-time listener functionality 
  //and docChanges() method check any change in documents and save in type paramter.
  db.collection('cafes').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
      if (change.type=='added'){
          renderCafe(change.doc);
        }
        else if(change.type=='removed'){
          let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
          cafeList.removeChild(li);
        }     
  });
})


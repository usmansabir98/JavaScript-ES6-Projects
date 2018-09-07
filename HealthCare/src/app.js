import {http} from './http';
import {ui} from './ui';

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, "");
  ui.changeState('add');
  getMedicines();
});

document.querySelector('.add-btn').addEventListener('click', submitMedicine);
document.querySelector('.update-btn').addEventListener('click', submitMedicine);
document.querySelector('.delete-btn').addEventListener('click', deleteMedicineClick);
document.querySelector('#medicine-search').addEventListener('keyup', filterMedicines);

document.querySelector('.back-btn').addEventListener('click', function(){
  ui.changeState('add');
});

document.querySelectorAll('.collection').forEach((list) => list.addEventListener('click', editMedicineClick));
document.querySelectorAll('.collection').forEach((list) => list.addEventListener('click', deleteMedicineClick));


function getMedicines(){
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitMedicine(e){
  const name = document.querySelector('#medicine-name').value;
  const purpose = document.querySelector('#medicine-purpose').value;
  const quantity = document.querySelector('#medicine-quantity').value;
  const id = document.querySelector('#id').value;
  
  const data = {
    name, purpose, quantity
  };

  if(name === '' || purpose === '' || quantity === ''){
    // Show Alert
    ui.showAlert('Please fill in all fields', 'red lighten-1 p-3');
  }
  else {
    // submit data
    if(id === ''){
      // add post if id is empty
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Medicine Added', 'green lighten-1 p-3');
        ui.clearFields();
        getMedicines();
      })
      .catch(err => console.log(err));
    }
    else{
      // update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Medicine Updated', 'green lighten-1 p-3');
          // ui.clearFields();
          // ui.clearIdField()
          ui.changeState('add');
          getMedicines();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

function editMedicineClick(e){
  if(e.target.parentElement.classList.contains('edit')){
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const id = e.target.parentElement.dataset.id;
    const quantity = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
    let purpose;
    switch(e.target.parentElement.parentElement.parentElement.id){
      case 'medicine-list-1': purpose = 'anaplylactic shock'; break;
      case 'medicine-list-2': purpose = 'cardiogenic shock'; break;
      case 'medicine-list-3': purpose = 'peripheral circulatory collapse'; break;
      case 'medicine-list-4': purpose = 'status eplipticus'; break;
      case 'medicine-list-5': purpose = 'acute respiratory failure'; break;      
      
    }

    const data = {
      id, name, purpose, quantity
    }

    ui.fillForm(data);
  }

  e.preventDefault();
}

function deleteMedicineClick(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      console.log(id);    
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Medicine Deleted', 'green lighten-1 p-3')
          getMedicines();
        })
        .catch(err => console.log(err));        
    }
  }
  else if(e.target.classList.contains('delete-btn')){
    const id = e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;   
    console.log(id);
    http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.changeState('add');
          ui.showAlert('Medicine Deleted', 'green lighten-1 p-3')
          getMedicines();
        })
        .catch(err => console.log(err));
  }

  e.preventDefault();

}

function filterMedicines(e){
  const input = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(list){
      
    if(list.children[0].textContent.toLowerCase().indexOf(input)!==-1){
      console.log(list.children[0].textContent.toLowerCase(), list.parentElement.style.display, list);    
      // if found
      list.style.display = 'block';
      list.parentElement.style.display = 'block';                  
      list.parentElement.previousElementSibling.style.display = 'block';
      list.style.display = 'block';

      console.log(list.parentElement.style.display, list.parentElement.previousElementSibling.style.display);
    }
    else{
      
      list.style.display = 'none';
      list.parentElement.style.display = 'none';
      list.parentElement.previousElementSibling.style.display = 'none';
    }
  });
  // console.log(input);
}
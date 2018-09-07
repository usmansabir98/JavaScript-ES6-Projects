class UI {
  constructor(){
    this.medicineList1 = document.querySelector('#medicine-list-1');
    this.medicineList2 = document.querySelector('#medicine-list-2');
    this.medicineList3 = document.querySelector('#medicine-list-3');
    this.medicineList4 = document.querySelector('#medicine-list-4');
    this.medicineList5 = document.querySelector('#medicine-list-5');
    
    this.nameInput = document.querySelector('#medicine-name');
    this.purposeInput = document.querySelector('#medicine-purpose');
    this.quantityInput = document.querySelector('#medicine-quantity');    
    this.idInput = document.querySelector('#id');

    this.addBtn = document.querySelector('.add-btn');
    this.updateBtn = document.querySelector('.update-btn');
    this.deleteBtn = document.querySelector('.delete-btn');
    this.backBtn = document.querySelector('.back-btn');    

    this.forState = 'add';
  }

  getTemplateString(med){
    const output = `<li class="collection-item" id="item-${med.id}">
          <strong>${med.name}</strong> 

          <a href="#" class="delete secondary-content" style="margin-left: 10px" data-id="${med.id}">
            <i class="fa fa-remove"></i>
          </a>
          <a href="#" class="edit secondary-content" style="margin-left: 50px" data-id="${med.id}">
            <i class="fa fa-pencil"></i>
          </a>

          <em class="secondary-content">Qty: <span>${med.quantity}</span></em>
        </li>
    `;
    return output;
  }

  showPosts(data){
    let output1 = '', output2 = '', output3 = '', output4 = '', output5 = '';
    

    data.forEach((med)=>{
      switch(med.purpose){
        case 'anaplylactic shock': output1 += this.getTemplateString(med); break;
        case 'cardiogenic shock': output2 += this.getTemplateString(med); break;
        case 'peripheral circulatory collapse': output3 += this.getTemplateString(med); break;
        case 'status eplipticus': output4 += this.getTemplateString(med); break;
        case 'acute respiratory failure': output5 += this.getTemplateString(med); break;
        
      }
    });

    this.medicineList1.innerHTML = output1;
    this.medicineList2.innerHTML = output2;
    this.medicineList3.innerHTML = output3;
    this.medicineList4.innerHTML = output4;
    this.medicineList5.innerHTML = output5;    

    console.log(data);
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.postContainer');
    // Get posts
    const posts = document.querySelector('h3');
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.lighten-1');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields(){
    this.nameInput.value = '';
    this.purposeInput.value = '';
    this.quantityInput.value = '';
  }

  clearIdField(){
    this.idInput.value = '';
  }

  changeState(type){
    if(type === 'add'){
      this.clearFields();
      this.clearIdField();
      this.addBtn.style.display = 'inline';
      this.deleteBtn.style.display = 'none';
      this.updateBtn.style.display = 'none';
      this.backBtn.style.display = 'none';      
    }
    else{
      this.addBtn.style.display = 'none';
      this.deleteBtn.style.display = 'inline';
      this.updateBtn.style.display = 'inline';
      this.backBtn.style.display = 'inline'; 
    }
  }

  fillForm(data){
    this.nameInput.value = data.name;
    this.purposeInput.value = data.purpose;
    this.idInput.value = data.id;
    this.quantityInput.value = data.quantity; 
    this.changeState('edit');   
  }
}

export const ui = new UI();


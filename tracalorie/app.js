// Storage Controller
const StorageCtrl = (function(){

  return{
    storeItem: function(item){
      let items;

      if(localStorage.getItem('items') === null){
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else{

        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        
      }
    },

    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(item.id === updatedItem.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItemStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(item.id === id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearItemStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();
// Item Controller 
const ItemCtrl = (function(){
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure
  const data = {
    // items:[
    //   // {id: 0, name: 'Chinese Rice', calories: 500},
    //   // {id: 1, name: 'Eggs', calories: 600},
    //   // {id: 2, name: 'Chicken', calories: 300}      
    // ],

    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function(){
      return data.items;
    },

    getItemById: function(id){
      let found = null;
      data.items.forEach(item=>{
        if(item.id===id && found===null){
          found = item;
        }
      });
      return found;
    },

    updateItem: function(name, calories){
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories= calories;
          found = item;
        }
      });
      return found;
    },

    getCurrentItem: function(){
      return data.currentItem;
    },

    setCurrentItem: function(item){
      data.currentItem = item;
    },

    addItem: function(name, calories){
      let ID;

      if(data.items.length > 0){
        ID = data.items[data.items.length-1].id + 1;
      }
      else{
        ID=0;
      }

      calories = parseInt(calories);

      const newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },

    deleteItem: function(id){
      const ids = data.items.map(function(item){
        return item.id;
      });

      const index = ids.indexOf(id);

      data.items.splice(index, 1);
    },

    clearAllItems: function(){
      data.items = [];
    },

    getTotalCalories: function(){
      let totalCalories=0;
      
      data.items.forEach(item=>{
        totalCalories += item.calories;
      });

      data.totalCalories = totalCalories;

      return data.totalCalories;
    },

    logData: function(){
      console.log(data);
    }
  }
})();

// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn'    
  };
  return {
    getSelectors: function(){
      return UISelectors;
    },

    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value, 
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: function(item){
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: function(item){
      const li = document.getElementById(`item-${item.id}`);
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
    },

    deleteListItem: function(id){
      document.getElementById(`item-${id}`).remove();
    },

    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    removeItems: function(){
      document.querySelector(UISelectors.itemList).innerHTML = ''; 
    },

    showTotalCalories: function(total){
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },

    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      
    },
    
    showEditState: function(){
      // this.clearInput();
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      
    },

    populateItemList: function(items){
      let html = '';
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li> 
        `;
      });
      document.querySelector('#item-list').innerHTML = html;
    }
  }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable enter key on submit
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        return false;        
      }
    });
    // edit state
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);  
    
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);  
    
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick); 
    
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  };

  const itemAddSubmit = function(e){
    const input = UICtrl.getItemInput();

    if(input.name!=='' && input.calories!==''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      UICtrl.addListItem(newItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total Cal to UI
      UICtrl.showTotalCalories(totalCalories);

      UICtrl.clearInput();

      StorageCtrl.storeItem(newItem);
    }
    e.preventDefault();
  };

  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      const listId = e.target.parentNode.parentNode.id;
      listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      // console.log(itemToEdit);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const itemUpdateSubmit = function(e){

    const input = UICtrl.getItemInput();

    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    UICtrl.updateListItem(updatedItem);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total Cal to UI
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const itemDeleteSubmit = function(e){
    const currentItem = ItemCtrl.getCurrentItem();

    ItemCtrl.deleteItem(currentItem.id);

    UICtrl.deleteListItem(currentItem.id);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total Cal to UI
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.deleteItemStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const clearAllItemsClick = function(){
    ItemCtrl.clearAllItems();
    UICtrl.removeItems();
    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total Cal to UI
    UICtrl.showTotalCalories(totalCalories);

    StorageCtrl.clearItemStorage();    
  };

  return {
    init: function(){
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      console.log(items);
      // Populate item list
      UICtrl.populateItemList(items);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total Cal to UI
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
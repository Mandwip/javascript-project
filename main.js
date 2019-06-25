// Property Class: Represents a Property
class property {
    constructor(name, place, price) {
      this.name = name;
      this.place = place;
      this.price = price;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayProperty() {
      const property = Store.getproperty();
  
      property.forEach((book) => UI.addPropertyToList(property));
    }
  
    static addPropertyToList(property) {
      const list = document.querySelector('#property-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${property.name}</td>
        <td>${property.place}</td>
        <td>${property.price}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteProperty(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#property-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#place').value = '';
      document.querySelector('#price').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getProperty() {
      let property;
      if(localStorage.getItem('property') === null) {
        property = [];
      } else {
        property = JSON.parse(localStorage.getItem('property'));
      }
  
      return property;
    }
  
    static addProperty(book) {
      const Property = Store.getProperty();
      property.push(property);
      localStorage.setItem('property', JSON.stringify(property));
    }
  
    static removeProperty(price) {
      const property = Store.getProperty();
  
      books.forEach((property, index) => {
        if(property.price === price) {
          property.splice(index, 1);
        }
      });
  
      localStorage.setItem('property', JSON.stringify(property));
    }
  }
  
  // Event: Display property
  document.addEventListener('DOMContentLoaded', UI.displayProperty);
  
  // Event: Add a property
  document.querySelector('#property-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const name= document.querySelector('#name').value;
    const place= document.querySelector('#place').value;
    const price = document.querySelector('#price').value;
  
    // Validate
    if(title === '' || place === '' || price === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate property
      const property = new Property(name, place,price);
  
      // Add Property to UI
      UI.addPropertyToList(property);
  
      // Add property to store
      Store.addProperty(property);
  
      // Show success message
      UI.showAlert('Property Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Property
  document.querySelector('#property-list').addEventListener('click', (e) => {
    // Remove property from UI
    UI.deleteProperty(e.target);
  
    // Remove property from store
    Store.removeProperty(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Property Removed', 'success');
  });
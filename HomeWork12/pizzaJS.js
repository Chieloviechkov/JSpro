document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('pizzaForm');
  const sizeSelect = document.getElementById('size');
  const toppings = document.querySelectorAll('input[name="topping"]');
  const quantityInput = document.querySelector('input[name="quantity"]');
  const additionalFieldsDiv = document.getElementById('additionalFields');
  const priceSpan = document.getElementById('price');

  function calculatePrice() {
    let price = 0;

    if (sizeSelect.value === 'small') {
      price += 50;
    } else if (sizeSelect.value === 'medium') {
      price += 70;
    } else if (sizeSelect.value === 'large') {
      price += 90;
    }

    toppings.forEach(function(topping) {
      if (topping.checked) {
        price += 15;
      }
    });

    const quantity = parseInt(quantityInput.value);
    price *= quantity;

    priceSpan.textContent = price;

    // Сохраняем заказ и цену в localStorage
    localStorage.setItem('pizzaOrder', JSON.stringify({
      size: sizeSelect.value,
      selectedToppings: getSelectedToppings(),
      quantity: quantity,
      price: price
    }));
  }

  function getSelectedToppings() {
    const selectedToppings = [];
    toppings.forEach(function(topping) {
      if (topping.checked) {
        selectedToppings.push(topping.value);
      }
    });
    return selectedToppings;
  }

  function showOrderDetails() {
    const size = sizeSelect.value;
    const selectedToppings = getSelectedToppings();
    const quantity = parseInt(quantityInput.value);

    let orderDetailsHtml = `<p>Розмір: ${size}</p>`;
    orderDetailsHtml += `<p>Топінги: ${selectedToppings.join(', ')}</p>`;
    orderDetailsHtml += `<p>Кількість: ${quantity}</p>`;

    if (size === 'large') {
      const address = document.querySelector('input[name="address"]').value;
      orderDetailsHtml += `<p>Адреса доставки: ${address}</p>`;
    }

    const orderDetailsDiv = document.getElementById('orderDetails');
    orderDetailsDiv.innerHTML = orderDetailsHtml;
  }

  form.addEventListener('change', calculatePrice);
  quantityInput.addEventListener('input', calculatePrice);
  sizeSelect.addEventListener('change', function() {
    const selectedSize = sizeSelect.value;
    additionalFieldsDiv.innerHTML = '';
    if (selectedSize === 'large') {
      const addressInput = document.createElement('input');
      addressInput.type = 'text';
      addressInput.name = 'address';
      addressInput.placeholder = 'Адреса доставки';
      additionalFieldsDiv.appendChild(addressInput);
    }
    calculatePrice();
  });

  const savedPizzaOrder = JSON.parse(localStorage.getItem('pizzaOrder'));
  if (savedPizzaOrder) {
    sizeSelect.value = savedPizzaOrder.size;
    savedPizzaOrder.selectedToppings.forEach(function(topping) {
      const toppingInput = document.querySelector(`input[name="topping"][value="${topping}"]`);
      if (toppingInput) {
        toppingInput.checked = true;
      }
    });
    quantityInput.value = savedPizzaOrder.quantity;
    calculatePrice();
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    calculatePrice();
    showOrderDetails();
  });

  function displaySavedOrder() {
    const savedPizzaOrder = JSON.parse(localStorage.getItem('pizzaOrder'));
    if (savedPizzaOrder) {
      const size = savedPizzaOrder.size;
      const selectedToppings = savedPizzaOrder.selectedToppings;
      const quantity = savedPizzaOrder.quantity;
      const price = savedPizzaOrder.price;

      let orderDetailsHtml = `<p>Розмір: ${size}</p>`;
      orderDetailsHtml += `<p>Топінги: ${selectedToppings.join(', ')}</p>`;
      orderDetailsHtml += `<p>Кількість: ${quantity}</p>`;

      if (size === 'large') {
        const address = savedPizzaOrder.address;
        orderDetailsHtml += `<p>Адреса доставки: ${address}</p>`;
      }

      const orderDetailsDiv = document.getElementById('orderDetails');
      orderDetailsDiv.innerHTML = orderDetailsHtml;
    }
  }

  const displaySavedOrderBtn = document.createElement('button');
  displaySavedOrderBtn.textContent = 'Показати збережений заказ';
  const orderDetailsDiv = document.getElementById('orderDetails');
  orderDetailsDiv.appendChild(displaySavedOrderBtn);

  displaySavedOrderBtn.addEventListener('click', displaySavedOrder);

  function resetForm() {
    form.reset();
    additionalFieldsDiv.innerHTML = '';
    priceSpan.textContent = '0';
    const orderDetailsDiv = document.getElementById('orderDetails');
    orderDetailsDiv.innerHTML = '';
    localStorage.removeItem('pizzaOrder');
  }

  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetForm);
});

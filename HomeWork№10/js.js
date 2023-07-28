document.addEventListener("DOMContentLoaded", function() {
    // Task 1   
    function countUppercase(inputString) {
      const uppercaseRegex = /[A-Z]/g;
      const matches = inputString.match(uppercaseRegex);
      return matches ? matches.length : 0;
    }
    
    console.log(countUppercase("abc"));      
    console.log(countUppercase("abcABC123"));
    console.log(countUppercase("abcefgABCDEFG1231111"));
  
    // Task 2
    function clearString(inputString) {
      const cleanedString = inputString.replace(/[^\d]/g, '');
      
      if (cleanedString === '') {
        return NaN; 
      }
      
      return Number(cleanedString);
    }
    
    const result = clearString("hell5o wor6ld");
    console.log(result);
  
    // Task 3
    function validateUsr(username) {
      if (username.length < 4 || username.length > 10) {
        return false;
      }
      const regex = /^[a-zA-Z0-9-_]{4,10}$/;
      return regex.test(username);
    }
  
    const form = document.getElementById('usernameForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const usernameInput = document.getElementById('username');
      const username = usernameInput.value;
      const isValid = validateUsr(username);
  
      const resultElement = document.getElementById('result');
      resultElement.textContent = isValid ? 'Юзернейм валідний!' : 'Юзернейм невалідний!';
    });
  });
  
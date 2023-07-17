// Task 1
class Car{
    constructor(year,model,name,numberPurchased){
        this.year = year;
        this.model = model;
        this.name = name;
        this.numberPurchased = numberPurchased;
    }
    consoleLogMethod(){
        console.log(this.year);
        console.log(this.model);
        console.log(this.name);
        console.log(this.numberPurchased);
    }
};
let Mazda = new Car(2022,"E-100500","Mazda",100500);

let BMW = new Car(2021,"M40000","BMW",100);

let Toyota = new Car(2022,"A-100","Toyota",500);

let Audi = new Car(2023,"R8","Audi",1000000);

let Ukrainian = new Car(2000,"0","ЖИГУЛЬ",1011500);

let arrayCars = [Mazda,BMW,Toyota,Audi,Ukrainian];
// Task 2
for(const {model,numberPurchased} of arrayCars){
    console.log(`Модель: ${model}
     Кількість покупок:${numberPurchased}`);
};
// Task 3 
let autoplay = document.querySelector('[autoplay]');
let divsAndP = document.querySelectorAll('div, p');
let listItems = document.querySelectorAll('ul.nav > li');
let listItem = document.querySelectorAll('li:nth-child(2)');
// Task 4
document.addEventListener('DOMContentLoaded', function(){
    const elements = [];

    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    elements.push(header, nav, footer);

    elements.forEach(element => {
      element.innerHTML = 'Какое-то новое значение)';
    });
});
// Task 5
function getDaysInMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
  
    const currentMonthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const nextMonthDays = new Date(nextYear, nextMonth + 1, 0).getDate();
  
    return `В этом месяце ${currentMonthDays} дней, а в следующем ${nextMonthDays} дней.
    (Как бы это странно не было)`;
  }
  
  console.log(getDaysInMonth());
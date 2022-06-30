//THEME selector

let buttons = document.querySelectorAll('.button');// select all buttons
let toArray = Array.from(buttons);// convert htmlcollection to array
//console.log(buttons);
toArray.forEach(function (element, index) {
    element.addEventListener('click', () => {
        element.style.opacity = "1";

        if (index == 0) {
           document.getElementById('switcher-id').href = '../themes/dark.css';
          
          }else if (index == 1) {
            document.getElementById('switcher-id').href = '../themes/light.css';
          } else {
            document.getElementById('switcher-id').href = '../themes/purple.css';
          }
      
toArray.filter(function (item) {
          return item != element;
        })
        .forEach((item) => {
          item.style.opacity = "0";
        });
    });
});


//Calculator

class Calculator {
  constructor(previousOperandInput, currentOperandInput) {
    this.previousOperandInput = previousOperandInput
    this.currentOperandInput = currentOperandInput
    this.reset()
  }

  reset() {
    this.previousOperand = ''; // set the previous entered number to empty
    this.currentOperand = ''; //set current value to empty
    this.operation = undefined; // no operation value set
  }

  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0 , -1); //removes from the last number to the last one
  }

  compute() {
    let calculation;
    const previous = parseFloat(this.previousOperand); // convert both operands to a number
    const current = parseFloat(this.currentOperand);
    //check if user inputed a number
    if (isNaN(previous) || isNaN(current)) return // if no valid numbers were entered dont go through with operations
    switch(this.operation) {
      case '+':
        calculation = previous + current;
        break;

      case '-': 
        calculation = previous - current;
        break ;

      case 'x': 
        calculation = previous * current;
        break;

      case '/':
        calculation = previous / current;
        break;
      default: 
      return
    }

    /*if(this.operation === '+'){
      calculation = previous + current;
    }
    else if(this.operation === '-') {
      calculation = previous - current;
    }

    else if (this.operation === ' / ') {
      calculation = previous / current;
    }

    else if (this.operation === ' * ') {
      calculation = previous * current;
    }

    else{
      return;
   }; */

    
    this.currentOperand = calculation; // sets cuurent value on display to result of calulation
    this.operation = undefined;
    this.previousOperand = ''; // dont show the previous entered number
  }

  appendDisplay(number) {
    if (number === '.' && this.currentOperand.includes('.')) return // dont add the decimal point twice
    this.currentOperand = this.currentOperand.toString() + number.toString(); // converted to strings so it doesnt execute like math function
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return // when the current operand is epmty because you've entered many two or more operations at once
    if(this.previousOperand !== '') {
      this.compute()// go through with calculation anyways
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand; //done typing, now move to the top
    this.currentOperand = ''; // now enter your next value
  }

  updateDisplay() {
    this.currentOperandInput.innerText = this.currentOperand;
    //when a operator such as '+' is entered, add the operator to the previous operand
    if(this.operation != null) {
      this.previousOperandInput.innerText = `${this.previousOperand} ${this.operation}`;
    }
    else {
      this.previousOperandInput.innerText = '';
    }
  
  }
}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-action]');
const equals = document.querySelector('[data-equals]');
const reset = document.querySelector('[data-clear]');
const deleteNumber = document.querySelector('[data-delete]');
const previousOperandInput = document.querySelector('.previous-operand');
const currentOperandInput = document.querySelector('.current-operand');

/*clear.addEventListener('click', () => {
   clear.style.backgroundColor = 'red';
})*/

const calculator = new Calculator(previousOperandInput, currentOperandInput);

//loop over buttons

numbers.forEach(key => {
  key.addEventListener('click', () => {
    calculator.appendDisplay(key.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach(key => {
  key.addEventListener('click', () => {
    calculator.chooseOperation(key.innerText);
    calculator.updateDisplay();
  })
});

equals.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

reset.addEventListener('click', () => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteNumber.addEventListener('click', () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});
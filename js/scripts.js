// Elementos do DOM
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

// Classe Calculator
class Calculator {
  // Construtor da calculadora
  constructor(previousOperationText, currentOperationText) {
    // Elementos de exibição
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;

    // Operações
    this.currentOperation = "";
    this.pendingOperation = null;
  }

  // Adiciona um dígito à operação atual
  addDigit(digit) {
    if (digit === "." && this.currentOperationText.innerText.includes("."))
      return;
    this.currentOperation += digit;
    this.updateScreen();
  }

  // Processa a operação e atualiza os elementos de exibição
  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      if (this.previousOperationText.innerText !== "") {
        this.pendingOperation = operation;
        return;
      }
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
      case "-":
      case "/":
      case "*":
        this.pendingOperation = operation;
        this.previousOperationText.innerText = `${current} ${operation}`;
        this.currentOperation = "";
        break;
      case "=":
        if (this.pendingOperation) {
          switch (this.pendingOperation) {
            case "+":
              operationValue = previous + current;
              break;
            case "-":
              operationValue = previous - current;
              break;
            case "/":
              operationValue = previous / current;
              break;
            case "*":
              operationValue = previous * current;
              break;
            default:
              break;
          }
          this.updateScreen(operationValue);
          this.pendingOperation = null;
        }
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      default:
        return;
    }
  }

  // Remove o último dígito da operação atual
  processDelOperator() {
    this.currentOperationText.innerText = this.currentOperation =
      this.currentOperation.slice(0, -1);
  }

  // Limpa a operação atual
  processClearCurrentOperation() {
    this.currentOperationText.innerText = this.currentOperation = "";
  }

  // Limpa completamente as operações anteriores e atuais
  processClearOperation() {
    this.currentOperationText.innerText = this.currentOperation = "";
    this.previousOperationText.innerText = "";
  }

  // Atualiza a tela com a operação atual ou um valor fornecido
  updateScreen(operationValue = null) {
    if (operationValue === null && this.currentOperation !== "") {
      this.currentOperationText.innerText = this.currentOperation;
    } else {
      if (operationValue !== null) {
        this.currentOperationText.innerText = operationValue;
      }
    }
  }
}

// Instância da Calculadora
const calc = new Calculator(previousOperationText, currentOperationText);

// Event Listeners
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    // Verifica se é um dígito ou uma operação e chama os métodos apropriados da calculadora
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});

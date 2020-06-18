const kalkulator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = kalkulator.displayNumber;
}

function clearCalculator() {
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (kalkulator.waitingForSecondNumber && kalkulator.firstNumber === kalkulator.displayNumber) {
        kalkulator.displayNumber = digit;
    } else {
        if (kalkulator.displayNumber === '0') {
            kalkulator.displayNumber = digit;
        } else {
            kalkulator.displayNumber += digit;
        }
    }
}

function inverseNumber() {
    if (kalkulator.displayNumber === '0') {
        return;
    }
    kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!kalkulator.waitingForSecondNumber) {
        kalkulator.operator = operator;
        kalkulator.waitingForSecondNumber = true;
        kalkulator.firstNumber = kalkulator.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if (kalkulator.firstNumber == null || kalkulator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (kalkulator.operator === "+") {
        result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    } else {
        result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber)
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: kalkulator.firstNumber,
        secondNumber: kalkulator.displayNumber,
        operator: kalkulator.operator,
        result: result
    }
    putHistory(history);
    kalkulator.displayNumber = result;
    renderHistory();
}


const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}
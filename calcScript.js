function addNumberToEq(num) {
    let res = document.getElementById('res').value;
    if (res == '0') {
        if (num == 0)
            res = '0';
        else {
            res = '';
            res += num;
        }
    } else {
        res += num;
    }
    document.getElementById('res').value = res;
}

function addSymbol(symbol) {
    let eq = document.getElementById('res').value;
    if (findSymbol() != -1)
        alert('You can not add another symbol to the equation');
    else if (eq.charAt(eq.length - 1) == '.')
        eq += '0' + symbol;
    else
        eq += symbol;

    document.getElementById('res').value = eq;
}

function findSymbol() {
    let eq = document.getElementById('res').value;
    for (let i = 0; i < eq.length; i++)
        if (eq.charAt(i) == '×' || eq.charAt(i) == '÷' || eq.charAt(i) == '-' || eq.charAt(i) == '+')
            return i;
    return -1;
}

function addDot() {
    let eq = document.getElementById('res').value;
    let symbolIndex = findSymbol();
    if (symbolIndex != -1) { //Case: 12.3 + 14.3.2
        if (eq.charAt(eq.length - 1) == eq.charAt(symbolIndex)) // Case: 12.3 +.
            eq += '0.';
        else {
            let rightEq = eq.substr(symbolIndex + 1);
            if (rightEq.indexOf('.') != -1)
                alert('You can not add another dot to the number');
            else
                eq += '.';
        }

    } else { // Case: 12.3.2
        if (eq.indexOf('.') != -1)
            alert('You can not add another dot to the number');
        else
            eq += '.';
    }
    document.getElementById('res').value = eq;
}

function compute() {
    let eq = document.getElementById('res').value;
    if (eq.charAt(eq.length - 1) == '.')
        alert('You did not finish writing the equation');
    else {
        document.getElementById('resPrev').value = eq;

        let symbolIndex = findSymbol();
        if (symbolIndex != -1) {
            let result = 0;
            let leftEq = eq.substr(0, symbolIndex);
            let rightEq = eq.substr(symbolIndex + 1);
            switch (eq.charAt(symbolIndex)) {
                case '×':
                    result = (Number(leftEq) * Number(rightEq)).toFixed(1);
                    break;

                case '÷':
                    let checkRightSide = Number(rightEq);
                    if (checkRightSide == 0)
                        result = 'Math Error';
                    else
                        result = (Number(leftEq) / Number(rightEq)).toFixed(1);
                    break;

                case '-':
                    result = (Number(leftEq) - Number(rightEq)).toFixed(1);
                    break;

                case '+':
                    result = (Number(leftEq) + Number(rightEq)).toFixed(1);
                    break;
            }
            document.getElementById('res').value = result;
        }
    }
}

function del() {
    let eq = document.getElementById('res').value;
    if (document.getElementById('resPrev').value == '') {
        if (eq.length == 1)
            document.getElementById('res').value = '0';
        else {
            eq = eq.substr(0, eq.length - 1);
            document.getElementById('res').value = eq;
        }
    }
}

function reset() {
    document.getElementById('res').value = '0';
    document.getElementById('resPrev').value = '';
}
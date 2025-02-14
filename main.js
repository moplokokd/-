const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        console.log(value);
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = CleanInput(input);
        } else if (value == "=") {
            try {
                let result = new Function("return " + PrepareInput(input))();
                console.log(result);
                display_output.innerHTML = CleanOutput(result);
            } catch (e) {
                display_output.innerHTML = "Error";
            }
        } else if (value == "brackets") {
            const openBrackets = (input.match(/\(/g) || []).length;
            const closeBrackets = (input.match(/\)/g) || []).length;

            if (openBrackets > closeBrackets) {
                input += ")";
            } else {
                input += "(";
            }

            display_input.innerHTML = CleanInput(input);
        } else {
            if (ValidateInput(value)) {
                input += value;
                display_input.innerHTML = CleanInput(input);
            }
        }
    });
}

function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span> `;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = ` <span class="brackets">(</span> `;
        } else if (input_array[i] == ")") {
            input_array[i] = ` <span class="brackets">)</span> `;
        } else if (input_array[i] == "%") {
            input_array[i] = ` <span class="percent">%</span> `;
        }
    }

    return input_array.join("");
}

function CleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    // Format with commas
    let output_array = parseInt(output_string).toLocaleString().split("");

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

function ValidateInput(value) {
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    // Prevent multiple decimals in a number
    if (value == "." && last_input == ".") {
        return false;
    }

    // Prevent consecutive operators
    if (operators.includes(last_input) && operators.includes(value)) {
        return false;
    }

    // Allow input if it's valid
    return true;
}

function PrepareInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }

    return input_array.join("");
}

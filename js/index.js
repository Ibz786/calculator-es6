'use strict';

import Calculator from "./calculator.class.js";

(function(){
    const currentOperandEle = document.querySelector("#currentOperand");
    const prevOperandEle = document.querySelector("#prevOperand");
    const btnNumberKeys = document.querySelectorAll("[data-calc-number]");
    const btnOperationKeys = document.querySelectorAll("[data-calc-operation]");
    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 
          operationKeys = ['+', '-', '*', '/'], 
          decimalKey = ['.'], 
          backspaceKey = ['Backspace'], 
          deleteKey = ['Delete'], 
          plusMinusKey = ['±'],
          equalsKeys = ['Enter', '='];
    const allowedKeys = [...numberKeys, ...operationKeys, ...decimalKey, ...backspaceKey, ...deleteKey, ...equalsKeys];
    const calculator = new Calculator(prevOperandEle, currentOperandEle);

    document.querySelector("body").addEventListener("keydown", e => {
        if(!allowedKeys.includes(e.key) || e.ctrlKey) return;

        if(numberKeys.includes(e.key)) {
            document.querySelector(`[data-calc-number='${e.key}']`).classList.add("active");
            calculator.updateNumbers(e.key);
            return;
        }

        if(decimalKey.includes(e.key)) {
            document.querySelector(`[data-calc-number='${e.key}']`).classList.add("active");
            calculator.addDecimal(e.key);
            return;
        }

        if(backspaceKey.includes(e.key)) {
            calculator.delete();
        }

        if(deleteKey.includes(e.key)) {
            calculator.clear();
        }

        if(operationKeys.includes(e.key)) {
            calculator.updateOperation(e.key);
        }

        if(equalsKeys.includes(e.key)) {
            calculator.equals();
        }

        document.querySelector(`[data-calc-operation='${e.key}']`).classList.add("active");
    });

    document.querySelector("body").addEventListener("keyup", e => {
        if(!allowedKeys.includes(e.key) || e.ctrlKey) return;

        if(numberKeys.includes(e.key) || decimalKey.includes(e.key)) {
            document.querySelector(`[data-calc-number='${e.key}']`).classList.remove("active");
        }
        else {
            document.querySelector(`[data-calc-operation='${e.key}']`).classList.remove("active");
        }

    });

    btnNumberKeys.forEach(numberKey => {
        numberKey.addEventListener("click", () => {
            calculator.updateNumbers(numberKey.getAttribute("data-calc-number"));
        });
    });

    btnOperationKeys.forEach(operationKey => {
        operationKey.addEventListener("click", () => {
            const opKeyVal = operationKey.getAttribute("data-calc-operation");

            // Operations +,-,*,/
            if(operationKeys.includes(opKeyVal)) {
                calculator.updateOperation(opKeyVal);
            }

            // Toggle Plus / Minus
            if(plusMinusKey.includes(opKeyVal)) {
                calculator.togglePlusMinus();
            }

            // Equals
            if(equalsKeys.includes(opKeyVal)) {
                calculator.equals();
            }

            // Backspace
            if(backspaceKey.includes(opKeyVal)) {
                calculator.delete();
            }

            // Delete
            if(deleteKey.includes(opKeyVal)) {
                calculator.clear();
            }
        });
    });
})();
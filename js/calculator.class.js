export default class Calculator {
    constructor(prevOperandEle, currentOperandEle) {
        this.prevOperandEle = prevOperandEle;
        this.currentOperandEle = currentOperandEle;
        
        this.init();
    }

    /**
     * Default Values
     * 
     * currentOperand               String  - The Current Operand Value
     * preOperand                   String  - The Previous Operand Value
     * operation                    String  - The Current Operation i.e. '+', '-' etc.
     * isOperatorChaining           Boolean - Flag to indicate whether to execute operator chaining
     * chainOperandHasBeenUpdated   Boolean - Flag to indicate that the operand has been updated when operator chaining
     * valueHasBeenUpdated          Boolean - Flag to indicate that the Current Operand value has been updated
     * resetCurrentOperand          Boolean - Flag to indicate to reset the overrite / reset the Current Operand value
     */
    init() {
        this.currentOperand = '0';
        this.prevOperand = ''; 
        this.operation = null;
        this.isOperatorChaining = false;
        this.chainOperandHasBeenUpdated = false;
        this.valueHasBeenUpdated = false;
        this.resetCurrentOperand = false;
        this.initialLoad = true;
        this.initialChain = true;

        this.clear(true);
    }

    clear(isInitialLoad) {
        this.currentOperand = '0';
        this.prevOperand = '';
        this.operation = null;
        this.isOperatorChaining = false;
        this.chainOperandHasBeenUpdated = false;
        this.valueHasBeenUpdated = false;
        this.resetCurrentOperand = false;

        isInitialLoad ? this.initialLoad = false : this.updateDisplays();
    }

    equals() {
        this.isOperatorChaining = false;
        this.compute(false);
    }

    compute() {
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        const operator = this.operation;
        if(isNaN(prev) || isNaN(current)) return;
        const opMap = {
            '+': prev + current,
            '-': prev - current,
            '*': prev * current,
            '/': prev / current
        };
        
        this.currentOperand = opMap[operator].toString();
        this.prevOperand = this.isOperatorChaining ? this.currentOperand : '';
        this.operation = this.isOperatorChaining ? this.operation : undefined;
        this.chainOperandHasBeenUpdated = false;
        
        this.updateDisplays({prev, current, operator, isComputed: true});
    }

    delete() {  
        this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length -1);
        this.currentOperand = !this.currentOperand ? '0' : this.currentOperand;

        this.updateDisplays();
    }

    togglePlusMinus() {
        if(this._isZero()) return;
        this.currentOperand =  /\-[0-9]/.test(this.currentOperand) ? this.currentOperand.slice(1, this.currentOperand.length) : `-${this.currentOperand}`;

        this.updateDisplays();
    }

    addDecimal(decimal) {
        if(this.currentOperand.includes(decimal)) return;
        this.currentOperand = this.currentOperand + decimal;
        this.updateDisplays();
    }

    updateNumbers(number) {
        this.currentOperand = this._isZero() || this.resetCurrentOperand ? number : this.currentOperand + number;
        this.valueHasBeenUpdated = true;
        this.chainOperandHasBeenUpdated = true;
        this.resetCurrentOperand = false;
        this.updateDisplays();
    }

    updateOperation(operation) {
        this.operation = operation;
        
        if(this.currentOperand && this.prevOperand) {
            this.updateDisplays();
            this._operationChaining();
            return;
        }

        this.prevOperand = !this.prevOperand || !this.valueHasBeenUpdated ? this.currentOperand : this.prevOperand + this.currentOperand;
        this.resetCurrentOperand = true;
        this.updateDisplays();
    }

    updateDisplays(params) {
        this.currentOperandEle.innerText = this.currentOperand;
        if(this.isOperatorChaining) {
            this.prevOperandEle.innerText = `${this.prevOperand} ${this.operation ? this.operation : ``}`;
        }
        else {
            this.prevOperandEle.innerText = `${params?.isComputed ? `${params.prev} ${params.operator} ${params.current} =` : `${this.prevOperand} ${this.operation ? this.operation : ``}`}`;
        }

        this.valueHasBeenUpdated = false;
    }

    _operationChaining() {
        this.isOperatorChaining = true;
        this.resetCurrentOperand = true;
        if(this.chainOperandHasBeenUpdated && !this.initialChain) this.compute();
        this.initialChain = false;
    }

    _isZero() {
        return this.currentOperand === "0";
    }
}



var calculator = document.getElementById("calculator");
var screen = document.getElementById("screen");
var screenHistory = document.getElementById("history");

var op = null;
var lastOp = false;
var val1 = null;
var val2 = null;
var point = false;


function calculate(val1, op, val2) {
	switch(op) {
		case "plus":
		return +val1 + +val2;
		break;
		case "minus":
		return +val1 - +val2;
		break;
		case "mult":
		return +val1 * +val2;
		break;
		case "div":
		return +val1 / +val2;
		break;
	}
}

function numberPressed(number) {

	if (val2) {
		/*if (number === '.') {
			if (!point) {
				val2 += number;
				screen.value += number;
				screenHistory.value += number;
				point = true;
			}
		}
		else {
			val2 += number;
			screen.value += number;
			screenHistory.value += number;
		}*/

		if (number !== '.' || !point) {
			val2 += number;
			screen.value += number;
			screenHistory.value += number;
		}
		if (number === '.' && !point) point = true;
	}
	else if (op) {
		if (number === '.') point = true;
		val2 = number;
		screen.value = number;
		screenHistory.value += number;
	}
	else if (val1) {

		if (number !== '.' || !point) {
			val1 += number;
			screen.value += number;
			screenHistory.value += number;
		}
		if (number === '.' && !point) point = true;
	}
	else {
		if (number === '.') point = true;
		val1 = number;
		screen.value = number;
		screenHistory.value = number;
	}
}

function opPressed(opval, element) {
	point = false;

	if (opval === "del") {
		if (val2) {

			var val2Str = val2 + '';
			if (val2Str.length > 1) {
				val2 = val2Str.substr(0, val2Str.length - 1);
				screenHistory.value = screenHistory.value.substr(0, screenHistory.value.length - 1);
				screen.value = screen.value.substr(0, screen.value.length - 1);
			}
			else {
				val2 = null;
				screen.value = '0';
				screenHistory.value = screenHistory.value.substr(0, screenHistory.value.length - 1);
			}
		}
		else if (op) {
			op = null;
			screenHistory.value = screenHistory.value.substr(0, screenHistory.value.length - 3);
		}
		else if (val1) {
			var val1Str = val1 + '';

			if (val1Str.length > 1) {
				val1 = val1Str.substr(0, val1Str.length - 1);
				screenHistory.value = screenHistory.value.substr(0, screenHistory.value.length - 1);
				screen.value = screen.value.substr(0, screen.value.length - 1);
			}
			else {
				val1 = null;
				screenHistory.value = '0';
				screen.value = '0';
			}
		}
	}

	else if (opval === "clear") {
		val1 = null;
		op = null;
		val2 = null;
		screen.value = 0;
		screenHistory.value = 0;
	}
	else if (opval === "equal") {
		if (val2 && val2 !== '.') {
			val1 = calculate(val1, op, val2);
			if (val1+''.indexOf('.') > -1) point = true;
			val2 = null;
			op = null;
			screen.value = val1;
			screenHistory.value = val1;
		}
	}
	else if (val2) {
		val1 = calculate(val1, op, val2);
		val2 = null;
		op = opval;
		screen.value = val1;
		screenHistory.value += " " + element.innerHTML + " ";
	}
	else if (op) {
		if (op !== opval) {
			op = opval;
			screenHistory.value = screenHistory.value.substr(0, screenHistory.value.length - 3) + " " + element.innerHTML + " ";
		}

	}
	else if (val1) {
		if (val1 !== '.') {
			op = opval;
			screenHistory.value = screenHistory.value + " " + element.innerHTML + " ";
		}	
	}
}

calculator.addEventListener('click', function(e) {

	var element = e.target;

	if (element.classList.contains('calc-btn')) {

		if (element.classList.contains('num')) {
			numberPressed(element.innerHTML);
		}
		else {
			opPressed(element.id, element);
		}
	}
});
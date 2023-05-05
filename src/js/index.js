const d = document;
const html = d.body;

//css --> accedo a los valores css
const style = getComputedStyle(html);
const errorStyle = style.getPropertyValue("--color-primary-light-red");
const defaultStyle = style.getPropertyValue("--color-neutral-smokey-grey");

//variables globales
const $contInput = d.querySelectorAll(".error");

const todayDay = new Date().getDate();
const todayMonth = new Date().getMonth() + 1;
const todaYear = new Date().getFullYear();

let form = d.getElementById("form");
let btn = d.getElementById("btn");
let inputs = d.querySelectorAll("input");

let valor1;
let valor2;
let valor3;

function validMonths() {
  text = "must be a valid date";
  index = 0;

  let d;
  let m = Number(inputs[1].value);

  if (m == 1 || m == 3 || m == 12 || m == 5 || m == 7 || m == 8 || m == 10) {
    d = 31;
    if (Number(inputs[0].value) > d) {
      campError(index, text);
      return false;
    } else {
      campValid(index);
      return true;
    }
  }

  if (m == 2) {
    d = 28 || 29;
    if (Number(inputs[0].value) > d) {
      campError(index, text);
      return false;
    } else {
      campValid(index);
      return true;
    }
  }

  if (m == 9 || m == 11 || m == 4 || m == 6) {
    d = 30;
    if (Number(inputs[0].value) > d) {
      campError(index, text);
      return false;
    } else {
      campValid(index);
      return true;
    }
  }
}

/*--  functions --*/

//verifica todos los campos vacios
function verification() {
  let required = "this field is required";
  inputs.forEach((e, index) => {
    if (!e.value) {
      inputs[
        index
      ].parentElement.firstElementChild.style.color = `${errorStyle}`;
      inputs[index].style.outline = `1px solid ${errorStyle}`;
      $contInput[index].textContent = `${required}`;
    }
    // validDate(e);
  });
}

//aplica los estilos de error segun cada campo
function campError(index, text) {
  $contInput[
    index
  ].parentElement.firstElementChild.style.color = `${errorStyle}`;
  inputs[index].style.outline = ` 1px solid ${errorStyle}`;
  $contInput[index].textContent = `${text}`;
}
//cambia los estilos de error
function campValid(index) {
  $contInput[
    index
  ].parentElement.firstElementChild.style.color = `${defaultStyle}`;

  inputs[index].style.outline = `none`;
  $contInput[index].textContent = undefined;
}

//validacion de las fechas
function validDate(e) {
  let index = 0;
  let text = "must be a valid date";

  if (e.target.name == "day") {
    index = 0;
    text = "must be a valid date";

    if (
      e.target.value > 31 ||
      e.target.value <= 0 ||
      inputs[index].type !== "number"
    ) {
      valor3 = false;
      campError(index, text);
    } else {
      campValid(index);
      valor3 = true;
    }
  }

  if (e.target.name == "month") {
    index = 1;
    text = "must be a valid month";

    if (
      e.target.value > 12 ||
      e.target.value <= 0 ||
      inputs[index].type !== "number"
    ) {
      valor2 = false;
      campError(index, text);
    } else {
      campValid(index);
      valor2 = true;
    }
  }

  if (e.target.name == "years") {
    index = 2;
    text = "must be in the past";

    if (
      e.target.value > new Date().getFullYear() ||
      e.target.value <= 0 ||
      inputs[index].type !== "number"
    ) {
      valor1 = false;
      campError(index, text);
    } else {
      campValid(index);
      valor1 = true;
    }
  }
}

function longInput(e) {
  if (e.target.name === "day" || e.target.name === "month") {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 2);
    }
  }

  if (e.target.name === "years") {
    let numMax = new Date().getFullYear().toString();

    if (e.target.value.length > numMax.length) {
      e.target.value = e.target.value.slice(0, numMax.length);
    }
  }
}

/**--- Events---**/

//verifica si el campo es valido

form.addEventListener("keyup", (e) => {
  longInput(e), validMonths(), validDate(e);
});

//boton calcular
btn.addEventListener("click", function () {
  verification();
  validMonths();

  let year = d.getElementById("old-year");
  let month = d.getElementById("months");
  let day = d.getElementById("days");

  if (valor1 && valor2 && valor3 && validMonths()) {
    const numbers = Array.from(inputs).map((num) => num.value);
    let [numDay, numMonth, numYear] = numbers.map(Number);
    let resultDay = Math.abs(numDay - todayDay);
    let resultMonth =
      todayMonth > numMonth
        ? todayMonth - numMonth
        : numMonth > todayMonth
        ? 12 - numMonth + todayMonth
        : 0;
    let resultYear = Math.abs(todaYear - numYear);

    year.innerText = resultYear;
    month.innerText = Math.abs(resultMonth);
    day.innerText = resultDay;
  }
});

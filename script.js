//Heron's Formula

function heronsFormula(a, b, c) {
  return (
    (1 / 4) * Math.sqrt(4 * a ** 2 * b ** 2 - (a ** 2 + b ** 2 - c ** 2) ** 2)
  );
}

//Add event listener to calculateHeron ID
document
  .getElementById("calculateHeron")
  .addEventListener("click", function () {
    //Get values from inputs
    const a = parseFloat(document.getElementById("sideAH").value);
    const b = parseFloat(document.getElementById("sideBH").value);
    const c = parseFloat(document.getElementById("sideCH").value);

    // Check if inputs are valid
    if (a < 0 || b < 0 || c < 0 || a + b < c || a + c < b || c + b < a) {
      alert("Please enter valid numbers for all sides.");
      return;
    }

    // Calculate area using Heron's Formula
    const area = heronsFormula(a, b, c);

    // Display the result
    document.getElementById("heronsResult").value = area.toFixed(2);
  });

//Ambiguous Case

function ambiguousCase(angleA, a, b) {
  //Math.sin is expecting angle in radians, so convert the angle too
  var angleRadians = angleA * (Math.PI / 180);
  var h = b * Math.sin(angleRadians);

  if (angleA <= 90) {
    console.log("a: " + a + " h: " + h);
    if (a < h) {
      return "No triangle.";
    } else if (a == h) {
      // a === h for type as well
      return "Right triangle.";
    } else if (a > h) {
      return "One triangle.";
    } else if (a > h && a < b) {
      return "Two triangles (ambiguous case).";
    } else {
      return "No solution.";
    }
  } else if (angleA <= 180) {
    if (a < h || a == h) {
      return "No triangle.";
    }
    return "One triangle.";
  } else {
    return "No solution.";
  }
}

//Add event listener to ambiguous case ID
document
  .getElementById("calculateAmbiguous")
  .addEventListener("click", function () {
    //Get values
    const angleA = document.getElementById("angleA").value;
    const a = document.getElementById("sideAA").value;
    const b = document.getElementById("sideBA").value;

    //FROM CHATGPT: NaN "not a number", this function returns true
    //when any input is NaN.., checks valid numbers before calculating
    if (angleA < 0 || angleA > 180 || b < 0 || a < 0) {
      alert("Please enter valid numbers for angle and sides.");
      return;
    }

    document.getElementById("ambiguousResult").value = ambiguousCase(
      angleA,
      a,
      b
    );
  });

//Newton's Method

const newtonsMethod = (g) => {
  function f(x) {
    return 6 * x ** 4 - 13 * x ** 3 - 18 * x ** 2 + 7 * x + 6;
  }

  function fDeriv(x) {
    return 24 * x ** 3 - 39 * x ** 2 - 36 * x;
  }

  //const rootApprox = (x) => {
  //  const x1 = x - f(x)/fDeriv(x); //this is the new root
  //  return x1;
  //}

  var previousGuess = g;
  var newRoot = null;
  var rootGuess = false;

  do {
    const rootApprox = (x) => {
      newRoot = x - f(x) / fDeriv(x);
      return newRoot;
    };

    if (
      previousGuess - rootApprox(previousGuess) > 0.0001 ||
      previousGuess - rootApprox(previousGuess) < -0.0001
    ) {
      previousGuess = rootApprox(newRoot);
    } else {
      rootGuess = true;
      return rootApprox(previousGuess);
    }
  } while (rootGuess == false);
  //  while (differenceTracker > 0.01) {
  //    rootApprox(g)
  //  }
};

document
  .getElementById("calculateNewtons")
  .addEventListener("click", function () {
    const root = document.getElementById("root").value;

    document.getElementById("newtonsResult").value = newtonsMethod(root);
  });

//Polynomial Function

const polynomialFunction = (coeff, exp) => {

  const coeffArray = coeff.split(" ");
  const expArray = exp.split(" ");
  
  const expMap = expArray.map((exp) => {
    return "x^" + exp;
  });

  const coeffMap = coeffArray.map((coeff) => {
    if (coeff == coeffArray[0]) {
      return coeff;
    } else {
      if (coeff > 0) {
        return "+" + coeff;
      } else if (coeff <0) {
        return "-" + coeff;
      } else {
        return "0";
      }
    }

  });

  console.log(coeffArray, expArray, expMap, coeffMap);

};

document.getElementById("calculatePolynomial").addEventListener("click", function() {
  const coefficients = document.getElementById("coefficients").value;
  const exponents = document.getElementById("exponents").value;
  const x = document.getElementById("xValue").value;

  document.getElementById("polynomialFuncResult").value = polynomialFunction(coefficients, exponents, x);//
  document.getElementById("polynomialEvalResult").value = null;//
});
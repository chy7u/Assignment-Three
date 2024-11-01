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

  if (angleA < 180) {
    if (angleA < 90) {
      if (a < h) {
        return "No triangle.";
      } else if (a > b) {
        return "One triangle.";
      } else if (h < a && a < b) {
        return "Two triangles (ambiguous case).";
      } else {
        return "No triangle.";
      }
    } else if (angleA == 90) {
      return "Right triangle.";
    } else {
      if (a < b || a === h) {
        return "No triangle.";
      } else if (a > b) {
        return "One triangle.";
      } 
    } 
  } else {
    return "Invalid angle.";
  }
}
  /*if (angleA <= 90) {
    console.log("a: " + a + " h: " + h);
    if (a < h) {
      return "No triangle.";
    } else if (a == h) {
      // a === h for type as well
      return "Right triangle.";
    } else if (a > h && a != h) {
      return "One triangle.";
    } else if (a > h && a < b) {
      return "Two triangles (ambiguous case).";
    } else {
      return "No solution.";
    }
  } else if (angleA <= 180 && angleA > 90) {
    if (a < h || a == b) {
      return "No triangle.";
    }
  } else {
    return "No solution.";
  }*/

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
    if (angleA <= 0 || angleA >= 180 || b <= 0 || a <= 0) {
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
    return 24 * x ** 3 - 39 * x ** 2 - 36 * x + 7;
  }

  do {
    g = g - f(g) / fDeriv(g);
  } while (Math.abs(f(g) > 0.00001));
  return g;

  //old code, less efficient!
  do {
    const rootApprox = (x) => {
      newRoot = x - f(x) / fDeriv(x);
      return newRoot;
    };

    if (Math.abs(previousGuess - rootApprox(previousGuess) > 0.0000001)) {
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

  //mapping function that goes through the array
  //and adds the + or - sign in front of the coefficient as necessary,
  //also ignores the sign if it is the leading coefficient
  const coeffMap = coeffArray.map((coeff) => {
    if (coeff == coeffArray[0] || coeff < 0) {
      return coeff;
    } else {
      if (coeff > 0) {
        return "+" + coeff;
      } else {
        return "+0";
      }
    }
  });

  let answer = "";

  for (let i = 0; i < coeffArray.length; i++) {
    answer += coeffMap[i] + expMap[i];
  }

  return answer;

  //return coeffMap[0] + expMap[0] + coeffMap[1] + expMap[1] + coeffMap[2] + expMap[2];
};

const polynomialEvaluation = (coeff, exp, x) => {
  const coeffArray = coeff.split(" ");
  const expArray = exp.split(" ");

  const coeffMap = coeffArray.map((coeff) => {
    return Number(coeff);
  });

  const expMap = expArray.map((exp) => {
    return Number(exp);
  });

  let answer = 0;

  for (let i = 0; i < coeffArray.length; i++) {
    answer += Number(coeffArray[i]) * (x ** Number(expArray[i]));
  }

  //old code, less efficient
  //const answer =
  //  coeffMap[0] * x ** expMap[0] +
  //  coeffMap[1] * x ** expMap[1] +
  //  coeffMap[2] * x ** expMap[2];

  return answer;
  console.log(coeffMap, expMap);
};

document
  .getElementById("calculatePolynomial")
  .addEventListener("click", function () {
    const coefficients = document.getElementById("coefficients").value;
    const exponents = document.getElementById("exponents").value;
    const x = document.getElementById("xValue").value;

    document.getElementById("polynomialFuncResult").value = polynomialFunction(
      coefficients,
      exponents,
      x
    ); //
    document.getElementById("polynomialEvalResult").value =
      polynomialEvaluation(coefficients, exponents, x); //
  });

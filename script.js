//Heron's Formula

function heronsFormula(a,b,c) {
    return (1/4)*Math.sqrt(4*(a**2)*(b**2)-(a**2 + b**2 - c**2)**2);
}

//Add even listeners
document.getElementById("calculateHeron").addEventListener("click", function() {

    //Get values from inputs
    const a = parseFloat(document.getElementById("sideA").value);
    const b = parseFloat(document.getElementById("sideB").value);
    const c = parseFloat(document.getElementById("sideC").value);

    // Check if inputs are valid
    if (a<0 || b<0 || c<0 || a+b < c || a+c < b || c+b < a) {
        alert("Please enter valid numbers for all sides.");
        return;
    }

    // Calculate area using Heron's Formula
    const area = heronsFormula(a, b, c);

    // Display the result
    document.getElementById("heronsResult").value = area.toFixed(2);
});
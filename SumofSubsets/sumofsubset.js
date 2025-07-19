var set;
var sum;
var setlength;
var result = 0;

function input() {
    var inputSet = document.getElementById("set").value;
    var inputSum = document.getElementById("sum").value;

    if (inputSet == "" || inputSum == "") {
        alert("Input fields cannot be empty");
        return;
    }

    inputSet = inputSet.toString();
    inputSet = inputSet.split(",").map(item => parseInt(item.trim()));
    set = inputSet;
    setlength = inputSet.length;
    sum = parseInt(inputSum);

    document.getElementById("result").innerHTML = "";
    result = 0;

    var subset = [];
    subsetfind(subset, 0, 0, 0);
    nosolutionCheck();
}

function resetValues() {
    document.getElementById("set").value = "";
    document.getElementById("sum").value = "";
    document.getElementById("result").innerHTML = "";
    result = 0;
}

function subsetfind(subset, subsetSize, subTotal, subCount) {
    if (subTotal == sum) {
        result = result + 1;
        display(subset, subsetSize);
        subsetfind(subset, subsetSize - 1, subTotal - set[subCount], subCount + 1);
        return;
    } else {
        for (var i = subCount; i < setlength; i++) {
            subset[subsetSize] = set[i];
            subsetfind(subset, subsetSize + 1, subTotal + set[i], i + 1);
        }
    }
}

function display(subset, subsetSize) {
    subset = subset.slice(0, subsetSize);
    var resultDiv = document.getElementById("result");
    var solutionDiv = document.createElement("div");
    solutionDiv.className = "result-item";
    solutionDiv.textContent = "{" + subset.join(", ") + "}";
    resultDiv.appendChild(solutionDiv);
}

function nosolutionCheck() {
    if (result == 0) {
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = '<div class="alert alert-danger">No solution exists for the given input</div>';
    }
}

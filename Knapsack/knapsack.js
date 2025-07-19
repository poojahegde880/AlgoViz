$(document).ready(function () {
    var index = 0;
    var comparisonCount = 0;
    var startTime = 0;

    function Node(name, profit, weight) {
        this.name = name;
        this.profit = profit;
        this.weight = weight;
        this.ratio = profit / weight;
    }

    $("#addbutton").click(function () {
        var tbody = $("#item-table tbody");
        tbody.append(`
            <tr>
                <td><input type="text" id="Name${index}" class="form-control" placeholder="Item name"></td>
                <td><input type="text" id="Profit${index}" class="form-control" placeholder="Value"></td>
                <td><input type="text" id="Weight${index}" class="form-control" placeholder="Weight"></td>
            </tr>
        `);
        index++;
    });

    var arr = [];
    var finalknapsack = [];
    var finalweight = 0;

    $("#gobutton").click(function () {
        comparisonCount = 0;
        finalknapsack = [];
        finalweight = 0;
        arr = [];
        startTime = performance.now();

        var capacity = Number($('#capacity').val());
        if (isNaN(capacity) || capacity <= 0) {
            alert("Please enter a valid knapsack capacity");
            return;
        }

        for (var i = 0; i < index; i++) {
            var name = $('#Name' + i).val();
            var profit = Number($('#Profit' + i).val());
            var weight = Number($('#Weight' + i).val());

            if (name && !isNaN(profit) && !isNaN(weight) && weight > 0) {
                arr.push(new Node(name, profit, weight));
            }
        }

        if (arr.length === 0) {
            alert("Please add at least one valid item");
            return;
        }

        arr = quickSort(arr, 0, arr.length - 1);
        addItem(arr.slice(), capacity);

        $("#comparison-count").text(comparisonCount);
        const elapsed = (performance.now() - startTime) / 1000;
        $("#time-elapsed").text(elapsed.toFixed(4) + "s");
        $("#final_knapsack").text(finalknapsack.join(", "));
        $("#final_profit").text(finalweight.toFixed(2));
    });

    function quickSort(arr, left, right) {
        if (left < right) {
            comparisonCount++;
            var pivot = partition(arr, left, right);
            quickSort(arr, left, pivot - 1);
            quickSort(arr, pivot + 1, right);
        }
        return arr;
    }

    function partition(arr, left, right) {
        var pivotValue = arr[right].ratio;
        var partitionIndex = left;
        var pivotWeight = arr[right].weight;

        for (var i = left; i < right; i++) {
            comparisonCount++;
            if (arr[i].ratio > pivotValue || (arr[i].ratio === pivotValue && arr[i].weight < pivotWeight)) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function addItem(array, capacity) {
        if (capacity <= 0 || array.length === 0) return;

        var node = array.shift();

        if (capacity - node.weight < 0) {
            var ratio = capacity / node.weight;
            finalknapsack.push(`${(ratio * 100).toFixed(2)}% of ${node.name}`);
            finalweight += ratio * node.profit;
            return;
        } else {
            capacity -= node.weight;
            finalknapsack.push(node.name);
            finalweight += node.profit;
        }

        if (capacity > 0 && array.length > 0) {
            addItem(array, capacity);
        }
    }
});

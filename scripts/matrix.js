class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result = null;

        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            // implement matrix multiplication here!
            var value_arr = [];
            // Outter loop the number of rows in the left matrix
            // This is to go across each row of the left matrix in order
            for(var i = 0; i < this.rows; i++){
                // loop across each column of the rhs matrix to apply the current row of the left matrix to each
                // Column of the right matrix
                for(var k = 0; k <rhs.columns; k++){
                    console.log("spot: " + i + k);
                    var current_val = 0;
                    // loop across the number of columns of the left matrix (could be the number of rows of right matrix)
                    // to multiply the elements from the left and right matrix and add them together
                    for(var j = 0; j < this.columns; j++){
                        console.log(this.data[i][j]);
                        console.log(rhs.data[j][k]);
                        // Multiply cortisponding elements and add them to the new current_value
                        current_val += (this.data[i][j]) * (rhs.data[j][k]);
                        console.log("");
                    }
                    // Push current value onto array of values
                    value_arr.push(current_val);
                    console.log("current_val: " + current_val);
                    console.log("");
                }
            }
            console.log("value_arr: " + value_arr);

            // Create new matrix for result
            result = new Matrix(this.rows, rhs.columns);

            // Build empty data matrix
            var new_data = [];
            for (i = 0; i < rhs.columns; i++) {
                new_data.push([]);
            }

            // fill data matrix with the values from our 1d calculated matrix
            var count = 0;
            for (i = 0; i < this.rows; i++) {
                for (j = rhs.columns-1; j >= 0 ; j--) {
                    new_data[i].push(value_arr[count]);
                    count += 1;
                }
            }
            console.log("new_data: " + new_data);
            // set the values of our result matrix to the new data matrix
            result.values = new_data;
        }

        else {
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}

// Formula Approach: using math formula for arithmetic series
var sum_to_n_a = function (n) {
  // your code here
  return n * (n + 1) / 2;
};

// Iterative Approach: using a loop
var sum_to_n_b = function (n) {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};


// Recursive Approach: summing recursively
var sum_to_n_c = function (n) {
  // your code here
  function sumRange(low, high) {
    if (low === high) return low;
    const mid = Math.floor((low + high) / 2);
    return sumRange(low, mid) + sumRange(mid + 1, high);
  }
  return n > 0 ? sumRange(1, n) : 0;
};

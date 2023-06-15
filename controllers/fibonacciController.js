class FibonacciController {
  static fibonacciPage(req, res) {
    const { fib, rows, columns } = req.query;

    let fibonacci = null;
    if (fib && rows && columns) {
      fibonacci = JSON.parse(fib);
    }

    res.render("home", { title: "Fibonacci", rows, columns, fibonacci });
  }

  static generateFibonacci(req, res) {
    const { rows, columns } = req.body;
  
    let n1 = 0,
      n2 = 1,
      next_num,
      i;
    let fib = [];
  
    for (i = 1; i <= Number(rows) * Number(columns); i++) {
      fib.push(n1);
      next_num = n1 + n2;
      n1 = n2;
      n2 = next_num;
    }
  
    res.redirect(`/?rows=${rows}&columns=${columns}&fib=${JSON.stringify(fib)}`);
  }
}

module.exports = FibonacciController;

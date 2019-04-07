function createF (qx, qy, len) {
  return function (a) {
    var b = qy / qx - a * qx

    var sum = 0
    var interval = qx / 20
    for (var x = 0; x < qx - interval / 2; x += interval) {
      var x2 = x + interval
      sum += Math.hypot(
        x2 - x,
        (x2 * x2 * a + x2 * b) - (x * x * a + x * b)
      )
    }

    return sum - len
  }
}

function derivative (f) {
  var h = 0.001
  return function (x) { return (f(x + h) - f(x - h)) / (2 * h) }
}

function solve (f) {
  var precision = 0.0001
  var prevGuess = 0
  var df = derivative(f)

  function newtonsMethod (guess) {
    if (guess === null || guess === undefined) {
      guess = 0
    }

    if (Math.abs(prevGuess - guess) > precision) {
      prevGuess = guess
      var approx = guess - (f(guess) / df(guess))

      return newtonsMethod(approx)
    } else {
      return guess
    }
  }

  return newtonsMethod(-10)
}

function approximateCurve (x1, y1, x2, y2, len) {
  var px, py, qx, qy

  if (x1 > x2) {
    px = x2
    py = y2

    qx = x1 - x2
    qy = y1 - y2
  } else {
    px = x1
    py = y1

    qx = x2 - x1
    qy = y2 - y1
  }

  var a, b
  if (qx < 1 || qx * qx + qy * qy >= len * len) {
    a = 0
    b = (qy / qx) - a * qx
  } else {
    a = solve(createF(qx, qy, len))
    b = (qy / qx) - a * qx
  }

  return {
    x1: px,
    y1: py,
    x2: qx,
    y2: qy,
    a: a,
    b: b
  }
}

window.approximateCurve = approximateCurve

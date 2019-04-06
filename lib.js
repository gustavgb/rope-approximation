function createF (qx, qy, len) {
  return function (a) {
    var r = qy / qx
    var b = r - a * qx

    var tx = -b / (2 * a)
    var ty = -(b * b) / (4 * a)
    var dx = tx - qx
    var dy = ty - qy

    var tryLength = Math.hypot(tx, ty) + Math.hypot(dx, dy)

    return tryLength - len
  }
}

function derivative (f) {
  var h = 0.001
  return function (x) { return (f(x + h) - f(x - h)) / (2 * h) }
}

function solve (f) {
  var precision = 0.001
  var prevGuess = 0

  function newtonsMethod (guess) {
    if (guess === null || guess === undefined) {
      guess = 0
    }

    if (Math.abs(prevGuess - guess) > precision) {
      prevGuess = guess
      var approx = guess - (f(guess) / derivative(f)(guess))

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

  if (qx < 5) {
    return null
  } else {
    var a = solve(createF(qx, qy, len))
    var b = (qy / qx) - a * qx

    return {
      x1: px,
      y1: py,
      x2: qx,
      y2: qy,
      a: a,
      b: b
    }
  }
}

window.approximateCurve = approximateCurve

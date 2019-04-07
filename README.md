# rope-approximation
Prototype of a rope approximation using parabolas

## Background

<p><i><a href="https://commons.wikimedia.org/wiki/File:Kette_Kettenkurve_Catenary_2008_PD.JPG#/media/File:Kette_Kettenkurve_Catenary_2008_PD.JPG"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Kette_Kettenkurve_Catenary_2008_PD.JPG" alt="Kette Kettenkurve Catenary 2008 PD.JPG" height="145" width="193"></a><br>By <a href="//commons.wikimedia.org/w/index.php?title=User:Kamel15&amp;action=edit&amp;redlink=1" class="new" title="User:Kamel15 (page does not exist)">Kamel15</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5609313">Link</a></i></p>

A rope or chain is usually modelled using a type of curve called a *catenary*. This graph is similar to a parabola, yet slightly different.
For a long time, the parabola was thought to be the most accurate curve for a hanging chain, but in the late 17th century it was proven that the parabola was in fact *not* the most accurate curve, and that it was indeed the catenary curve.

When you want to model a rope between two points, you're essentially trying to solve the problem of a catenary curve between two points with a specific length.

However, the catenary curve is a type of hyperbolic cosine function:

![Catenary formula](https://latex.codecogs.com/gif.latex?y%3Da%5Ccosh%20%5Cleft%20%28%20%5Cfrac%20%7Bx%7D%7Ba%7D%20%5Cright%20%29)

which makes it difficult to solve the problem. Instead I have resorted to (less correct but good enough) parabolas, which makes it a lot easier.

## How it works

The parabola is the curve for a quadratic function, which has the following formula:

![Quadratic formula](https://latex.codecogs.com/gif.latex?y%3Dax%5E2%20&plus;%20bx%20&plus;%20c)

It is possible to find the parabola formula, when you know two points on the curve and *curvature*, which is described by `a`.

<i><p><a href="https://commons.wikimedia.org/wiki/File:Parabeln-var-s.svg#/media/File:Parabeln-var-s.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Parabeln-var-s.svg" alt="Parabeln-var-s.svg" height="307" width="226"></a><br>By <a href="//commons.wikimedia.org/wiki/User:Ag2gaeh" title="User:Ag2gaeh">Ag2gaeh</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=44984417">Link</a></p></i>

First we name the two points, so `Ax < Bx`. We then translate the coordinate system to A, so `A = (0, 0)`. Let `B = (x, y)`. This means that the `c` component becomes `0`, because the curve intersects the X-axis at `y = 0`.

We can calculate `b` by using the quadratic formula:

![the b component](https://latex.codecogs.com/gif.latex?y%3Dax%5E2&plus;bx%20%5CLeftrightarrow%20b%3D%5Cfrac%20%7By%7D%7Bx%7D-ax)

This means we now can derive the quadratic formula by guessing the value of `a`. But what is the criteria for success?

We want a parabola that is a specific length. The most accurate way of doing this is by using the [arc length formula](http://calculuscourse.maa.org/sample/Chapter8/Projects/Length%20of%20a%20curve/length1.html), but since we don't want to solve any more equations, we will instead approximate the length of the curve by using a [Riemann Sum](http://mathworld.wolfram.com/RiemannSum.html). Effectively we iterate over *N* values of `x` from *Ax* to *Bx* and calculate the length from *xN* to *xN+1*. The sum of all these section lengths is an approximation of the actual length of the curve.

This means we can write a function that takes a value `a` and returns the the margin of error. Using Newtons Method we can solve `f(x) ≈ 0` numerically. Our initial guess is well below zero in order to search for a negative value of `a`.

Note: If the horizontal distance from `A` to `B` is very little, or if the distance from `A` to `B` is equal to the length of the cable, we can be sure that the correct value for `a` is *0*.

## Algorithm

When recieving two points and a length.

1. Name `A` and `B` accordingly
2. Translate to `A`
4. Otherwise calculate `b`
5. Solve `f(x) ≈ 0` and calculate `a`
6. Return `a` and `b`

## Demo [here](https://gustavgb.github.io/rope-approximation)

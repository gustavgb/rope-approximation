# rope-approximation
Prototype of a rope approximation using parabolas

## Background

<p><i><a href="https://commons.wikimedia.org/wiki/File:Kette_Kettenkurve_Catenary_2008_PD.JPG#/media/File:Kette_Kettenkurve_Catenary_2008_PD.JPG"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Kette_Kettenkurve_Catenary_2008_PD.JPG" alt="Kette Kettenkurve Catenary 2008 PD.JPG" height="145" width="193"></a><br>By <a href="//commons.wikimedia.org/w/index.php?title=User:Kamel15&amp;action=edit&amp;redlink=1" class="new" title="User:Kamel15 (page does not exist)">Kamel15</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=5609313">Link</a></i></p>

A rope or chain is usually modelled using a type of curve called a *catenary*. This graph is similar to a parabola, yet slightly different.
For a long time, the parabola was thought to be the most accurate curve for a hanging chain, but in the late 16 hundreds it was proven that the parabola was in fact *not* the most accurate curve, and that it was indeed the catenary curve.

When you want to model a rope between two points, you're essentially trying to solve the problem of a catenary curve between two points with a specific length.

However, the catenary curve is a type of hyperbolic cosine function:

![Catenary formula](https://wikimedia.org/api/rest_v1/media/math/render/svg/1e2d387d79e500a90035448068febb17e69d8e5c)

which makes it difficult to solve the problem. Instead I have resorted to (less correct but good enough) parabolas, which makes it a lot easier.

## How it works

The parabola is the curve for a quadratic function, which has the following formula:

![Quadratic formula](https://latex.codecogs.com/gif.latex?y%3Dax%5E2%20&plus;%20bx%20&plus;%20c)

It is possible to find the parabola formula, when you know three points on the curve. We have those three points: the two ends of the rope (A and B) and the vertex (T).

First we name the two points, so `Ax < Bx`. We then translate the coordinate system to A, so `A = (0, 0)`. Let `B = (x, y)`. This means that the `c` component becomes `0`, because the curve intersects the X-axis at `y = 0`.

We know that the parabola has a single vertex which is described by this formula:

![Vertex formula](https://latex.codecogs.com/gif.latex?T%3D%5Cleft%20%28%20%5Cfrac%7B-b%7D%7B2a%7D%2C%20%5Cfrac%20%7B-b%5E2&plus;4ac%7D%7B4a%7D%20%5Cright%20%29%20%3D%5Cleft%20%28%20%5Cfrac%20%7B-b%7D%7B2a%7D%2C%20%5Cfrac%20%7B-b%5E2%7D%7B4a%7D%20%5Cright%20%29)

We can calculate `b` by using the quadratic formula:

![the b component](https://latex.codecogs.com/gif.latex?y%3Dax%5E2&plus;bx%20%5CLeftrightarrow%20b%3D%5Cfrac%20%7By%7D%7Bx%7D-ax)

This means we now can describe the vertex point by guessing the value of `a`. But what is the criteria for success?

We want a parabola that is a specific length. While it is possible to calculate the arc length of a parabola between two points (in this case from `0` to `Tx` and `Tx` to `x`), it is much easier to just calculate the distance from A to B through T.

This means we can write a function that takes a value `a` and returns the the margin of error. Using Newtons Method we can solve `f(x) ≈ 0` numerically. Our initial guess is well below zero in order to search for a negative value of `a`.

Note: When `Ax ≈ Bx` we cannot find a parabola, as the formula cannot provide two different values for one point on the X-axis.

## Algorithm

When recieving two points and a length.

1. Name `A` and `B` accordingly
2. Translate to `A`
3. Is `x ≈ 0`. If yes draw line instead. End algorithm
4. Otherwise calculate `b`
5. Solve `f(x) ≈ 0` and calculate `a`. End algorithm

## Demo [here](https://gustavgb.github.io/rope-approximation)

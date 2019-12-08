# My Immutable

This is my incantation of immutable data structures, inspired by
Phil Bagwell, Rick Hickey, David Nolen, and J.C.R. Licklider. The
purpose of this project are:

1. to learn how these data structures work.
2. to implement a version that allows for
serialization that takes advantage of structural sharing to
reduce file size.

## Plan

The plan is to implement:

* Rich Hickey's Bitmap-based Persistent Vector as [explained by Polymatheia](https://hypirion.com/musings/understanding-persistent-vector-pt-1)
* Haskell's Tree-Map implementation, a.k.a [Data.Map](https://hackage.haskell.org/package/containers-0.4.2.0/docs/Data-Map.html), as explained by [Stephen Adams](http://groups.csail.mit.edu/mac/users/adams/BB/)
* Phil Bagwell's Ideal Hash Trees, as implement in [clojure's Persistent Hash Map](https://github.com/clojure/clojure/blob/master/src/jvm/clojure/lang/PersistentHashMap.java) and as [explained by Phil Bagwell himself](https://lampwww.epfl.ch/papers/idealhashtrees.pdf)

## Performance

Performance will be compared to mori.js, Immutable.js and the native JavaScript arrays and
objects.

## Progress

These are rough estimates

* Bitmap-based Persistent Vector: 60% ([my-persistent-vector.js](my-persistent-vector.js))
* Tree-Map: 65% ([my-tree-map.js](my-tree-map.js))
* Ideal Hash Trees: 0%

## Todo

* Bitmap-based Persistent Vector
  * try rewriting get in a non-recursive way
    * bit op optimization
  * delete
  * fast initialization
  * tail optimization (not what you are thinking)
	* each (x)
  * map (x)
  * filter (x)
  * reduce (x)
* Tree-Map
    * map
    * filter
    * benchmark
	* each (x)
    * reduce (x)

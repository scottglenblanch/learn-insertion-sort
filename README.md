# Learn Insertion Sort

Visualization of Insertion Sort

## Use Cases

- User can add in numbers, spaced with whitespace
  - will check on these valid numbers on every keystroke
  - If not valid numbers 
    - then will show an error
  - If valid numbers, an array will show

- User can click on the sort button
  - each step of the sort algorithm
  ```
    i ← 1
    while i < length(A)
        j ← i
        while j > 0 and A[j-1] > A[j]
            swap A[j] and A[j-1]
            j ← j - 1
        end while
        i ← i + 1
    end while
  ``` 
  -- cite [Wikipedia - Insertion Sort](https://en.wikipedia.org/wiki/Insertion_sort#Algorithm)

  - when the sort button is clicked it will show an arrow to click through each part of the algorithm
    - This can be done using a js generator function
  - will show the current number for comparator
    - this will be green
  - will highlight the number to be compared
    - this will be blue
    - if needs to swap will swap
    - will have the number that was swapped have a yellow background
  - will also have a counter to number of steps taken
  - will show the big O time and space complexity
-take a random movie to display
-for this I'm using Math.floor(Math.random() * data.results.length)]

-Remove some letter 
  how many letter should I remove - 50% of the length maybe?
  example movie: "given"
    1- convert into an array of index [0, 1, 2, 3, 4]
    2- disorder the index [3, 1, 2, 4, 0]
    3- remove the 50% of the length [3, 1]
    4- replace these index by "_" in the word
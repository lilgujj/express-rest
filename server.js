const express = require("express");
const server = express();
const port = 3000;
let movieLibrary = [
    {
        title: "Deadpool",
        description: "man in tight red leggings tell jokes and killing people",
        id: 1,
        price: 49
    },
    {
        title: "Batman",
        description: "man inte dark leather suite fight people",
        id: 2,
        price: 39
    },
];

server.use(express.json());

// endpoints

// GET's all movies
server.get("/movies/", (req,res) => {
    res.json(movieLibrary);
})

// Add movie
server.post("/movies/", (req,res) => {
    movieLibrary.push(req.body)
})

// Delete movie
server.delete("/movies/", (req,res) => {
    const index = movieLibrary.findIndex(movie => movie.title === "Batman");
    const removedMovie = movieLibrary.splice(index,1);
    res.json(removedMovie)

    // movieLibrary.map(item => {
    //     // change string to title of the movie u wish to remove
    //     if(item.title === "Batman"){
    //         console.log(item)
    //         const removedMovie = movieLibrary.splice(item, 1)
    //         res.json(removedMovie)
    //         return
    //     } if(item.title === null | undefined) {
    //         res.status(404).json("No movie found with that name")
    //     }
    // })
})

// change movie
server.put("/movies/:id", (req,res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const updatedMovie = movieLibrary.find((movie) => movie.id == id);

    if(title) updatedMovie.title = title
    if(description) updatedMovie.description = description
    if(price) updatedMovie.price = price

    res.json(updatedMovie)

})


//  starts the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

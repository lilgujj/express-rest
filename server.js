const { response } = require("express");
const express = require("express");
const server = express();
const port = 3000;
let movieLibrary = [
    {
        title: "Batman",
        description: "man inte dark leather suite fight people",
        id: 20,
        price: 39,
    },
    {
        title: "Deadpool",
        description: "man in tight red leggings tell jokes and killing people",
        id: 10,
        price: 49,
    }
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
    res.json(movieLibrary)
})

// Delete movie
server.delete("/movies/:id", (req,res) => {
    const { id } = req.params;
    const deletedMovie = movieLibrary.findIndex(item => item.id == id);
    const movie = movieLibrary.find(item => item.id == id);
    if (movie) {
        const deleted = movieLibrary.splice(deletedMovie, 1)
        return res.json(deleted)
    } if(!movie) {
        res.json("selected movie does not exist")
    }
})

// change movie
server.put("/movies/:id", (req,res) => {
    const id = req.params.id;
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

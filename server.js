const express = require("express");
const server = express();
const port = 3000;
let movieLibrary = [
    {
        title: "Deadpool",
        description: "red man in tight leggings tell jokes",
        id: 1,
        price: 49
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
})

// Delete movie
server.delete("/movies/", (req,res) => {
    movieLibrary.map(item => {
        // change string to title of the movie u wish to remove
        if(item.title === "hej"){
            const removedMovie = movieLibrary.splice(item, 1)
            res.json(removedMovie)
        } if(item.title === null | undefined) {
            res.status(404).json("No movie found with that name")
        }
    })
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

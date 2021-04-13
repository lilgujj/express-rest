
const express = require("express");
const server = express();
const fs = require("fs");

const jsonData = ("movies.json")
const port = 3000;

server.use(express.json());

// endpoints

// GET's all movies
server.get("/movies/", (req,res) => {
    fs.readFile(jsonData, (err, data) => {
        if(err) {
            res.status(404).json("No movies found, 404")
        } else {
            const movies = JSON.parse(data.toString())
            res.status(200).json(movies)
        }
    }) 
})

// Add movie
server.post("/movies/", (req,res) => {
    jsonData.push(req.body)
    res.json(jsonData)
})

// Delete movie
server.delete("/movies/:id", (req,res) => {
    const { id } = req.params;
    const deletedMovie = jsonData.findIndex(item => item.id == id);
    const movie = jsonData.find(item => item.id == id);
    if (movie) {
        const deleted = jsonData.splice(deletedMovie, 1)
        return res.json(deleted)
    } if(!movie) {
        res.json("selected movie does not exist")
    }
})

// change movie
server.put("/movies/:id", (req,res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const updatedMovie = jsonData.find(movie => movie.id == id);

    if(title) updatedMovie.title = title
    if(description) updatedMovie.description = description
    if(price) updatedMovie.price = price

    res.json(updatedMovie)
})


//  starts the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

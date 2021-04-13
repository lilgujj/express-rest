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
            res.status(500).json("No movies found, 404")
        } else {
            const movies = JSON.parse(data.toString())
            res.status(200).json(movies)
        }
    }) 
})

// Add movie
server.post("/movies/", (req,res) => {
    fs.readFile(jsonData, (err,data) => {
        if(err) {
            res.status(500).json("ERROR, could not add movie")
        }
        const movies = JSON.parse(data.toString())
        const movie = req.body
        
        movies.push(movie)

        fs.writeFile(jsonData, JSON.stringify(movies, null, 2), () => {
            res.status(200).send(movies)
        })
    })
})

// Delete movie
server.delete("/movies/:id", (req,res) => {

    const { id } = req.params;

    fs.readFile(jsonData, (err,data) => {
        if(err) {
            res.status(500).json("ERROR, no movie to delete")
        }
        const movies = JSON.parse(data.toString());
        const deletedMovie = movies.findIndex(item => item.id == id);
        const movie = movies.find(item => item.id == id);
        if (movie) {
           movies.splice(deletedMovie, 1)
        } if(!movie) {
            res.json("selected movie does not exist")
        }

        fs.writeFile(jsonData, JSON.stringify(movies, null, 2), () => {
            res.status(200).send(movies)
        })

    })
})

// change movie
server.put("/movies/:id", (req,res) => {

    const {id} = req.params;

    fs.readFile(jsonData, (err,data) => {
        if(err) {
            res.status(500).json("ERROR, no movie to be edited")
        }
        const movies = JSON.parse(data.toString())
        const { title, description, price } = req.body;

        const updatedMovie = movies.find(movie => movie.id == id);

        if(title) updatedMovie.title = title
        if(description) updatedMovie.description = description
        if(price) updatedMovie.price = price

        fs.writeFile(jsonData, JSON.stringify(movies, null, 2), () => {
            res.status(200).send(movies)
        })
    })
})


//  starts the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

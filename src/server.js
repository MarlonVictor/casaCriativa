// Usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")


// Configurei express (CSS, Scripts, IMG)
server.use(express.static("public"))

//Habilitei o req.body
server.use(express.urlencoded({ extended: true }))

// Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true, 
})

// Criei uma Rota 
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            const msg = "Erro no Banco de Dados!"
            return res.send(msg)
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })   
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            const msg = "Erro no Banco de Dados!"
            return res.send(msg)
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("pag_ideas.html", { ideas: reversedIdeas})
   })   
})

server.post("/", function(req, res) {

    // Inserir Dados
    const query =`
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
   
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            const msg = "Erro no Banco de Dados!"
            return res.send(msg)
        }

       return res.redirect("/ideias")
    })
})

// Liguei meu servidor na porta 3000
server.listen(3000)
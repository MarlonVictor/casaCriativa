const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../ws.db')

db.serialize(function () {

    // Criar Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // Inserir Dados
    const query = `
       INSERT INTO ideas(
           image,
           title,
           category,
           description,
           link
       ) VALUES (?,?,?,?,?);
    `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    //     "Exercícios",
    //     "Saúde",
    //     "A prática de exercícios físicos envolve muito mais que estética, uma vez que são inúmeros os benefícios proporcionados a quem pratica algum tipo de atividade.",
    //     "https://github.com/MarlonVictor/learnJS/tree/master/getKcal"
    // ]

    // db.run(query, values, function (err) {
    //    if (err) return console.log(err)

    //    console.log(this)
    // })

    // Deletar um Dado
    // db.run(`DELETE FROM ideas WHERE id = ?`, [14], function(err) {
    // if (err) return console.log(err)

    // console.log("DELETEI", this)
    // })

    //Consultar Dados
    db.all(`SELECT * FROM ideas`, function(err, rows) {
       if (err) return console.log(err)

       console.log(rows)
    })

})

module.exports = db
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'android'
});

//Etablir la connexion
connection.connect((err) =>{
    if (err) {
        console.error('Erreur de la connection a la base de donnees :'+ err.stack);
        return;
    }    
});

/*teste
    connection.query('SELECT * FROM etudiant',(err, rows)=> {
        if (err)throw err;

        console.log('teste connection:');
        console.log(rows);
    });
    connection.end((err) => {
        if (err) {
            console.error('erreur lors de la fermeture de la conex'+ err.stack);
            return;
        }
        console.log('connexion fermee');
    });
*/

const express = require('express');
const app = express();

//route
app.get('/list',(req,res)=>{
    connection.query('SELECT * FROM etudiant',(err,result)=>{
        if (err) {
            console.error('Erreur d`execution requete: ', err);
            return res.send(`erreur de l'affichage: ${err.sqlMessage}`);
        }
        res.send(result)
    })
});

app.post('/addEtudiant', (req,res)=>{
    const {nom, moyenne} = req.body;

    connection.query('INSERT INTO etudiant (nom,moyenne) VALUE (?,?)', [nom,moyenne],(err,result)=>{
        if (err) {
            console.error('Erreur d`execution requete: ', err);
            return res.send(`erreur lors de l'ajout de l'etudiant: ${err.sqlMessage}`);
        }
        res.send("Enregistrement réussie");
    });
});

app.post('/updEtudiant',(req,res)=>{
    const {numEt, nom, moyenne} = req.body;
    
    connection.query('UPDATE etudiant SET nom = ?, moyenne = ?',[nom,moyenne],(err,result)=>{
        if (err) {
            console.error('Erreur d`execution requete: ', err);
            return res.send(`erreur lors de l'ajout de l'etudiant: ${err.sqlMessage}`);
        }
        res.send("Enregistrement réussie");
    })
})


//demarage du serveur
const port = 3000;
app.listen(port, ()=>{
    console.log(`serveur demarre sur http://localhost:${port}`);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


//mysql
const mysql = require("mysql");

let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    port: 3306,
    database : 'TriviaSano'
});

connection.connect(function(err:any) {
    if (err) {
      console.error('error conectando a la BD: ' + err.stack);
      return;
    }
   
    console.log('coneccion establecida ' + connection.threadId);
  });

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const configuracion ={
    hostname: "127.0.0.1",
    port: 3000,
}    

app.use(cors());


//CRUD: CREATE (post), READ (get), UPDATE (put, path), DELETE (delete)
/*
//CUANDO ENTRA A "USUARIOS" RETORNA UNA RESPUESTA. EJ: "error 404"
app.get('/Usuarios', (req:any, res:any) => {
    connection.query("select * from usuarios", function(error:any, results:any, field:any){
        res.send(JSON.stringify(results));
    });

    /*let Usuarios ={
        "id": 1,
        "nombre": "pepito",
        "apellidos": "perez"
    }

    res.send(JSON.stringify(Usuarios));
})
*/



app.get('/usuarios/correo/:correo', (req:any, res:any) => {
    let correo = req.params.correo;

    connection.query("select correo from usuarios where correo=?", [correo], function(error:any, results:any, field:any){
        res.send(JSON.stringify(results));

        /*
        console.log(`results: ${JSON.stringify(results)}`);
        console.log(`correoooo: ${JSON.stringify(correo)}`);*/

        let aux = "[{\"correo\":\"" +correo+"\"}]";
        console.log(`aux: ${aux}`);

        if (aux == JSON.stringify(results) ) {
            console.log(`SI EXISTE EL CORREO: ${correo}`);
            return 1;
        }
        else {
            console.log(`NO EXISTE EL CORREO AWEONAO`);
            return 0;
        }
    });
})



app.get('/usuarios/login', (req:any, res:any) => {
    let correo = req.params.correo;
    let contrasenna = req.params.contrasenna;
    
    connection.query("select contrasenna from usuarios where correo=?", [correo], function(error:any, results:any, field:any){
        res.send(JSON.stringify(results));

        console.log(`results: ${JSON.stringify(results)}`);
        console.log(`contrasenna: ${JSON.stringify(contrasenna)}`);

        let aux = "[{\"contrasenna\":\"" +contrasenna+"\"}]";
        console.log(`aux: ${aux}`);

        /*
        if (aux == JSON.stringify(results) ) {
            console.log(`LA CONTRASEÑA ES CORRECTA: ${contrasenna}`);
            return 1;
        }
        else {
            console.log(`CONTRASEÑA INCORRECTA`);
            return 0;
        }
        */
    });
})



app.post('/usuarios/CrearUsuario', jsonParser, async(req:any, res:any) => {
    const { correo, contrasenna, nombre, edad, fechaNacimiento, sexo, estatura, peso, enfermedadCardiaca, enfermedadRespiratoria, cirugia, alergia, enfermedadDegenerativa, futbol, baloncesto, voleyball, salsa, zumba } = req.body;
        
    const nuevoUsuario = {
        correo,
        contrasenna,
        nombre,
        edad,
        fechaNacimiento,
        sexo,
        estatura,
        peso,
        enfermedadCardiaca,
        enfermedadRespiratoria,
        cirugia,
        alergia,
        enfermedadDegenerativa,
        futbol,
        baloncesto,
        voleyball,
        salsa,
        zumba
    }

    await connection.query("insert into usuarios set ?",[nuevoUsuario]);
    res.send('received');

})

app.delete('/usuarios/EliminarUsuario/:correo', jsonParser, async(req:any, res:any) => {
    let correo = req.params.correo;
    console.log("correo: ${correo}", correo);
    await connection.query( "delete from usuarios where correo = ?", [correo] );
    //res.redirect('/usuarios')
    res.send('ejalee');
})

/*
app.update('/usuarios/ActualizarUsuario', jsonParser, async(req:any, res:any) => {
    const { correo, contrasenna, nombre, edad, fechaNacimiento, sexo, estatura, peso, enfermedadCardiaca, enfermedadRespiratoria, cirugia, alergia, enfermedadDegenerativa, futbol, baloncesto, voleyball, salsa, zumba } = req.body;
        
    const actualizarUsuario = {
        correo,
        contrasenna,
        nombre,
        edad,
        fechaNacimiento,
        sexo,
        estatura,
        peso,
        enfermedadCardiaca,
        enfermedadRespiratoria,
        cirugia,
        alergia,
        enfermedadDegenerativa,
        futbol,
        baloncesto,
        voleyball,
        salsa,
        zumba
    }

    await connection.query("update usuarios set ?",[actualizarUsuario]);
    res.send('received');

})
*/

app.listen(configuracion, () => {
    console.log(`Conectandome al servidor http://localhost:${configuracion.port}`)
})
/*
app.put('/Actualizar/:id',jsonParser, (req:any, res:any) => {
    let id = req.params.id;
    let usuario = req.body.usuario;
    let clave = req.body.clave;
    let correo = req.body.correo;

        
    console.log(`Usuario ${usuario} con la clave ${clave}, correo ${correo} y id ${id} no han sido modificados`);
        
    res.send("datos modificados");
    
})

*/


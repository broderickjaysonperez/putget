const express = require('express');
var router = express.Router();

// JSON -> Javascript Object Notation

// json.org
var thingsCollection = [];

var thingsStruct = {
  "id" : 0,
  "clase":'',
  
  "cupos":0,
  "campos":'',
  "docente": ''

};


thingsCollection.push(
  Object.assign({},
      thingsStruct,
      { "id":1,
      "clase":'matematicas',
      
      "cupos":0,
      "campos":'corazon',
      "docente": 'vetancur'
       // "fecha": new Date().getTime(),
        //"by":"Orlando"
      }
  )
);



router.get('/', (req, res, next)=>{
  res.status(200).json(thingsCollection);
});

// CRUD Crear, Leer (Read), Actualizar (Update) ,Eliminar (Delete)
// REST
// GET  consultas  Read, lectura
// POST Crear  - Insert C
// PUT  Update - Actualizar
// DELETE  Delete - ELiminar

router.post('/', (req, res, next)=>{
  var newElement = Object.assign({},
    thingsStruct,
    req.body,
    {
      "fecha": new Date().getTime(),
      "id": new Date().getTime()
    }
  );
  thingsCollection.push(newElement);
  res.status(200).json(newElement);
}); // post /
//http://localhost: 3000/api/things/1  

router.put('/:idelemento ', (req, res, next) => {
  var id =parseInt( req.params.idelemento);
  var update = req.body;
  var modifiedObject ={};
var originalObject ={};

  thingsCollection = thingsCollection.map((e,i)=>{
  
    if(e.id === id){
      originalObject = Object.assigne({},e);
        return Object.assign({}, e, req.body);
    }

    return e;
  });//map

  res.status(200).json({"o":originalObject, "m" :modifiedObject});
});// put /

router.delete('/:id', (req, res, next) => {
var id = parseInt (req.params.id);

thingsCollection = thingsCollection.filter((e,i)=>
{

  return (e.id !== id);
});//devuelve elementos de una condicion 
//bora el q sea igual

  res.status(200).json({ 'msg': 'Elemento' + id + 'fue eliminado' });
});// put /

module.exports = router;

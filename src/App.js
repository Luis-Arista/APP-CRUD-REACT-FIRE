import React , { useState , useEffect } from 'react'
import env from "react-dotenv";

import { oneSnapshot , query , collection , orderBy, onSnapshot, addDoc , doc , setDoc , deleteDoc } from 'firebase/firestore'
import { db } from './firebase.js'
import './App.css';
import { async } from '@firebase/util';

const App = () => {

  const [ tareas , setTareas ] = useState([])
  const [ form , setForm ] = useState()


  const getData = () => {
    const tareasArr = []

    onSnapshot( collection( db, 'tareas' ) , ( snapshot ) => {
      snapshot.docs.forEach( ( doc ) => {
        tareasArr.push({
          
          ...doc.data(), 
          id:doc.id 

        })
        setTareas( tareasArr ) 
       })
    })
  }

  useEffect(() => {
    getData()
    console.log(env.HOLA)
  }, [])

  const manejarClick = async() => {

    await addDoc(collection( db, 'tareas' ), form)
    setForm()
    getData()

  }

  const manejarCambio = ( ev ) => {
    const date = new Date( Date.now() )
     setForm({
       ...form,
       [ ev.name ]: ev.name === 'check' ? ev.checked : ev.value ,
        date: date
     })
   }

   const borrar = async ( id ) => {
      await deleteDoc(doc( db , 'tareas' , id))
      getData()
   }

   const editar = async ( id , data ) => {
     await setDoc(doc( db , 'tareas' , id) , data )
     getData()
   }

  return (
    <div className="App">
      <div className="App-header">
          <h1>
            Firebase App
          </h1>
          <div>
            <input type='text' placeholder='Escribe titulo' name='titulo' onChange={(e) => {manejarCambio(e.target)}}/> 
            <input type='text' placeholder='Escribe descripcion' name='descripcion' onChange={(e) => {manejarCambio(e.target)}}/> 
            <input type='checkbox' name='check' onChange={(e) => {manejarCambio(e.target)}}/> 
            <button onClick={() => manejarClick()} >Guardar</button>
          </div>
          <div>
            {
              tareas.map( (tarea , i ) => {
                return(
                  <div key={i}>
                     <h3>{tarea.titulo}</h3>
                     <p>{tarea.descripcion}</p>
                     <button onClick={ () => borrar( tarea.id )}>borrar</button>
                     <button onClick={ () => {editar( tarea.id , { ...tarea, check: !tarea.check })}}>
                        {tarea.check ? 'desmarcar' : 'marcar'}
                     </button>
                  </div>
                 )
              } )
            }
          </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import '../App.css';





const imagenesMujeres = [
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795378/creserpagina/mujer8_uw3pzy.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795378/creserpagina/mujer7_dt9oj0.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795378/creserpagina/mujer5_pagyjk.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795378/creserpagina/mujer6_ruqfna.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795377/creserpagina/mujer4_w4a1zn.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795368/creserpagina/mujer2_lxzjm3.png',
];

const imagenesHombres = [
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795381/creserpagina/hombre2_lo15ha.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795381/creserpagina/hombre3_e0mpbq.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795368/creserpagina/hombre5_n5lekw.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795368/creserpagina/hombre6_pjhfwi.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795367/creserpagina/hombre4_vwblf8.png',
  'https://res.cloudinary.com/dcwt59fom/image/upload/v1701795361/creserpagina/hombre1_nln7wg.png',
];
const App = () => {
    const [parejasSeleccionadas, setParejasSeleccionadas] = useState([]);
    const navigate = useNavigate(); // Inicializa useNavigate


    useEffect(() => {
      // Cambiar el título de la página cuando el componente se monta
      document.title = 'Juego Sicklemia - juego de azar de la vida';
    
      // Asegúrate de restablecer el título cuando el componente se desmonta
      return () => {
        document.title = 'Juego Sicklemia - juego de azar de la vida';
      };
    }, []);


    const handleImageClick = (sexo, index) => {
        const parejaSeleccionada = { sexo, imagen: index };
        setParejasSeleccionadas((prevParejas) => {
          const nuevasParejas = [...prevParejas, parejaSeleccionada].slice(-4);
          localStorage.setItem('parejasSeleccionadas', JSON.stringify(nuevasParejas));
    
          // Guardar las URLs de las últimas 4 imágenes clickeadas en localStorage
          const imagenesClickeadas = nuevasParejas.map((pareja) =>
            pareja.sexo === 'hombres' ? imagenesHombres[pareja.imagen] : imagenesMujeres[pareja.imagen]
          );
          localStorage.setItem('ultimasImagenesClickeadas', JSON.stringify(imagenesClickeadas));
    
          return nuevasParejas;
        });
      };
  
    const renderParejas = (sexo) => {
      const parejaImages = [];
  
      for (let index = 0; index < parejasSeleccionadas.length; index++) {
        const pareja = parejasSeleccionadas[index];
  
        if (pareja.sexo === sexo) {
          const altText = `${sexo === 'hombres' ? 'Hombre' : 'Mujer'} ${pareja.imagen + 1}`;
          const src = sexo === 'hombres' ? imagenesHombres[pareja.imagen] : imagenesMujeres[pareja.imagen];
  
          parejaImages.push(
            <img
              key={index}
              src={src}
              alt={altText}
              style={{ width: '15%', marginBottom: '10px', borderRadius: '8px', transition: 'box-shadow 0.3s' }}
            />
          );
        }
      }
  
      return parejaImages;
    };
  
    const handleSiguienteClick = () => {
      // Realiza alguna acción adicional al hacer clic en "Siguiente"
      navigate('/juego'); // Reemplaza '/ruta-del-componente-juego' con la ruta correcta
  
    };
  
    return (
      <div style={{ display: 'flex', height: '100vh' }}>

        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', background: '#f0f0f0', padding: '70px' }}>
        <h3>Escoge la primera pareja (Hombre/Mujer)</h3>
          Pareja 1:
          <br />
  
          {renderParejas('hombres')}
  
          <h2>Hombres</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {imagenesHombres.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Hombre ${index + 1}`}
                style={{ width: '15%', marginBottom: '10px', borderRadius: '8px', transition: 'box-shadow 0.3s' }}
                className="imagen-hover"
                onClick={() => handleImageClick('hombres', index)}
              />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', background: '#e0e0e0', padding: '70px' }}>
        <h3>Escoge la segunda pareja (Hombre/Mujer)</h3>
          Pareja 2:
          <br />
          {renderParejas('mujeres')}
  
          <h2>Mujeres</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {imagenesMujeres.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Mujer ${index + 1}`}
                style={{ width: '15%', marginBottom: '10px', borderRadius: '8px', transition: 'box-shadow 0.3s' }}
                className="imagen-hover"
                onClick={() => handleImageClick('mujeres', index)}
              />
            ))}
          </div>
        </div>
        <div className="floating-button-container">
            <button className="floating-button" onClick={handleSiguienteClick}>
            Siguiente
            </button>
        </div>
      </div>
    );
  };
  
  export default App;
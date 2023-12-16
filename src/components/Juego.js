import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Juego = () => {
  const ultimasImagenesClickeadas = JSON.parse(localStorage.getItem('ultimasImagenesClickeadas')) || [];

  const [resultadosPareja1, setResultadosPareja1] = useState(['', '', '', '']);
  let [pareja1Texto, setPareja1Texto] = useState('')

  const [resultadosPareja2, setResultadosPareja2] = useState(['', '', '', '']);
  let [pareja2Texto, setPareja2Texto] = useState('')

  const [scorePareja1, setScorePareja1]= useState(0);
  const [scorePareja2, setScorePareja2]= useState(0);


  const [imagenDecidirGanadorPareja1, setImagenDecidirGanadorPareja1] = useState('');
  const [imagenDecidirGanadorPareja2, setImagenDecidirGanadorPareja2] = useState('');


  const [fotoResultantePareja1, setFotoResultantePareja1] = useState('')
 const [fotoResultantePareja2, setFotoResultantePareja2] = useState('')

 const calculateScore = (resultados) => {
  let score = 0;

  // Modify this logic based on how you want to calculate the scores
  resultados.forEach((resultado) => {
    if (resultado === 'Sano AA 25%') {
      score += 1;
    } else if (resultado === 'Portador AS 25%') {
      score += 0.5; // Adjust the score as needed
    } else if (resultado === 'Afectado SS 25%') {
      score += 0; // Adjust the score as needed
    }
  });

  return score;
  };


  const decideMensaje = () => {
    const randomNum = Math.random();
    return randomNum < 0.5 ? 'Pareja con un portador' : 'Pareja con ambas portadoras';
  };

  const navigate = useNavigate(); 

  let mensajePareja1 =  decideMensaje(); 
  const mensajePareja2 = decideMensaje(); 


  useEffect(() => {
    // Cambiar el título de la página cuando el componente se monta
    document.title = 'Juego Sicklemia - juego de azar de la vida';

    // Asegúrate de restablecer el título cuando el componente se desmonta
    return () => {
      document.title = 'Juego Sicklemia - juego de azar de la vida';
    };
  }, []);

  
  const decideResultadoAmbasPortadoras = () => {
    const resultadosAmbasPortadoras = ['Afectado SS 25%', 'Portador AS 25%', 'Sano AA 25%'];
    const randomNum = Math.random();
    if (randomNum < 0.25) {
      return resultadosAmbasPortadoras[0];
    } else if (randomNum < 0.75) {
      return resultadosAmbasPortadoras[1];
    } else {
      return resultadosAmbasPortadoras[2];
    }
  };

  const decideResultadoUnPortador = () => {
    const randomNum = Math.random();
    return randomNum < 0.5 ? 'Sano AA 25%' : 'Portador AS 25%';
  };

  const renderImagenes = () => {
    const imagenes = [];

    for (let index = 0; index < ultimasImagenesClickeadas.length - 2; index++) {
      const url = ultimasImagenesClickeadas[index];

      imagenes.push(
        <img
          key={index}
          src={url}
          alt={`Imagen ${index + 1}`}
          style={{  width: '10%', marginBottom: '2px', borderRadius: '8px', transition: 'box-shadow 0.3s' }}
        />
      );
    }
    return imagenes;
  };

  const renderImagenesUltimas = () => {
    const imagenes = [];

    for (let index = 2; index < ultimasImagenesClickeadas.length; index++) {
      const url = ultimasImagenesClickeadas[index];

      imagenes.push(
        <img
          key={index}
          src={url}
          alt={`Imagen ${index + 1}`}
          style={{top:'0%', width: '10%', marginBottom: '2px', borderRadius: '8px', transition: 'box-shadow 0.3s' }}
        />
      );
    }
    return imagenes;
  };

  const handleAlAzarClick = (e) => {


     if(pareja1Texto === ''){
     setPareja1Texto(decideMensaje());
    //  alert('hila', mensajePareja1, pareja1Texto )
     }else{
    //  alert(pareja1Texto, mensajePareja1)
     }

    let nuevoResultado = '';
    if (pareja1Texto === 'Pareja con ambas portadoras') {
      setFotoResultantePareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702398799/creserpagina/parejaportadores_kwig5u.png');
      nuevoResultado = decideResultadoAmbasPortadoras();
    } else if (pareja1Texto === 'Pareja con un portador') {
      setFotoResultantePareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702399254/creserpagina/unportador_vlnnp5.png');
      nuevoResultado = decideResultadoUnPortador();
    }

    // setPareja1Texto(pareja1Texto);
    const nuevosResultados = [...resultadosPareja1];
    nuevosResultados.push(nuevoResultado);
    setScorePareja1(calculateScore(nuevosResultados));
    setResultadosPareja1(nuevosResultados);

    if (nuevosResultados.length === 4) {
      // Si ya se generaron los 4 hijos, mostrar la imagen de decisión ganadora
      if (scorePareja1 > scorePareja2) {
        setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407066/creserpagina/ganador_qsv3lo.png');
        setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407145/creserpagina/perdedor_cs8cmz.png');
      } else if (scorePareja1 < scorePareja2) {
        setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407066/creserpagina/ganador_qsv3lo.png');
        setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407145/creserpagina/perdedor_cs8cmz.png');
      } else {
        setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702411537/creserpagina/empate_t2tfdh.jpg');
        setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702411537/creserpagina/empate_t2tfdh.jpg');
      }
    }
  };
 const handlePareja2 = (e) => {


  if(pareja2Texto === ''){
    setPareja2Texto(decideMensaje());
   //  alert('hila', mensajePareja1, pareja1Texto )
    }else{
   //  alert(pareja1Texto, mensajePareja1)
    }

   let nuevoResultado = '';
   if (pareja2Texto === 'Pareja con ambas portadoras') {
     setFotoResultantePareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702398799/creserpagina/parejaportadores_kwig5u.png');
     nuevoResultado = decideResultadoAmbasPortadoras();
   } else if (pareja2Texto === 'Pareja con un portador') {
     setFotoResultantePareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702399254/creserpagina/unportador_vlnnp5.png');
     nuevoResultado = decideResultadoUnPortador();
   }

   // setPareja1Texto(pareja1Texto);
   const nuevosResultados = [...resultadosPareja2];
   nuevosResultados.push(nuevoResultado);
   setScorePareja2(calculateScore(nuevosResultados));
   setResultadosPareja2(nuevosResultados);

   if (nuevosResultados.length === 4) {
     // Si ya se generaron los 4 hijos, mostrar la imagen de decisión ganadora
     if (scorePareja1 > scorePareja2) {
       setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407066/creserpagina/ganador_qsv3lo.png');
       setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407145/creserpagina/perdedor_cs8cmz.png');
     } else if (scorePareja1 < scorePareja2) {
       setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407066/creserpagina/ganador_qsv3lo.png');
       setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702407145/creserpagina/perdedor_cs8cmz.png');
     } else {
       setImagenDecidirGanadorPareja1('https://res.cloudinary.com/dcwt59fom/image/upload/v1702411537/creserpagina/empate_t2tfdh.jpg');
       setImagenDecidirGanadorPareja2('https://res.cloudinary.com/dcwt59fom/image/upload/v1702411537/creserpagina/empate_t2tfdh.jpg');
     }
   }
 }


 const imagenSanooEnfermo = (resultado) => {
  if(resultado == 'Sano AA 25%'){
    return <img src='https://res.cloudinary.com/dcwt59fom/image/upload/v1702091415/creserpagina/caraA_zlkoiw.png'></img>
  }else{
    return <img src='https://res.cloudinary.com/dcwt59fom/image/upload/v1702091425/creserpagina/caraS_bfaog7.png'></img>
  }
 }
 
 
 const handleClick = () => {

  if (scorePareja1 > scorePareja2) {
    alert('Pareja 1 ganó');
  } else if (scorePareja1 < scorePareja2) {
    alert('Pareja 2 ganó');

  } else {
    alert('Empate');
   
  }


  localStorage.clear()
  navigate('/juegoslicklemia/build/')
}
  return (
    <div>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f0f0',
            padding: '30px',
          }}
        >
          <h3>{pareja1Texto}</h3>

          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              background: '#f0f0f0',
              padding: '20px',
            }}
          >
            {renderImagenes()}
    
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
            <button
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
                onClick={handleAlAzarClick}
                type="button"
            >
            Juego de la vida (cuáles de tus hijos saldrá con x enfermedad) Perinola
            </button>
          </div>

     
          <div style={{display:'flex'}}>

          <div style={{ margin: '20px'}}>
          {resultadosPareja1.map((resultado, index) => (
  resultado && (
    <div style={{ display: 'flex' }} key={index}>
      <p>{'Tu hijo ' + (index + 1) + ' va a tener la probabilidad de ' + resultado}</p>
      {resultado === "Sano AA 25%" ? (
        <img width={40} height={70} src="https://res.cloudinary.com/dcwt59fom/image/upload/v1702091415/creserpagina/caraA_zlkoiw.png" alt="Cara A" />
      ) : (
        resultado !== '' ? (
          <img width={40} height={70} src="https://res.cloudinary.com/dcwt59fom/image/upload/v1702091425/creserpagina/caraS_bfaog7.png" alt="Cara S" />
        ) : null
      )}
    </div>
  )
))}

          </div>
          <img style={{width:'250px', height:'250px', margin:'10px'}}
       src={fotoResultantePareja1} alt='La foto aparecerá al presionar el botón'
       ></img>
          </div>
 
 
  
        </div>

     
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            background: '#e0e0e0',
            padding: '30px',
          }}
        >
         <h3>
         {pareja2Texto}
         </h3>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              background: '#e0e0e0',
              padding: '20px',
            }}
          >
            {renderImagenesUltimas()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
            <button
              style={{
                backgroundColor: 'green',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
               onClick={handlePareja2}
            >
              Averigua si tus hijos serán portador Perinola
            </button>
          </div>
          <div style={{
             display:'flex'
           } }>
       <div  style={{ margin: '20px'}}>

       {resultadosPareja2.map((resultado, index) => (
  resultado && (
    <div style={{ display: 'flex' }} key={index}>
      <p>{'Tu hijo ' + (index + 1) + ' va a tener la probabilidad de ' + resultado}</p>
      {resultado === "Sano AA 25%" ? (
        <img width={40} height={70} src="https://res.cloudinary.com/dcwt59fom/image/upload/v1702091415/creserpagina/caraA_zlkoiw.png" alt="Cara A" />
      ) : (
        resultado !== '' ? (
          <img width={40} height={70} src="https://res.cloudinary.com/dcwt59fom/image/upload/v1702091425/creserpagina/caraS_bfaog7.png" alt="Cara S" />
        ) : null
      )}
    </div>
  )
))}






       </div>
       <img style={{width:'250px', height:'250px', margin:'10px'}}
           src={fotoResultantePareja2} alt='La foto aparecerá al presionar el botón'>

           </img>
          </div>

     
  
           <div style={{ display: 'flex', justifyContent: 'right'}}>
            <button
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
               onClick={handleClick}
            >
              Limpiar y regresar
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Juego;

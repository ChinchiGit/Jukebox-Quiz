let preguntas = [];
let page = 0;

async function questionsGenerator() {
  let response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple"
  );
  let data = await response.json();
  preguntas = data.results;
  console.log(preguntas)
  
  }


function pintarQuiz() {    
    let title = preguntas[page].question;
    let correct = preguntas[page].correct_answer;
    let incorrect = preguntas[page].incorrect_answers;


    //template string para generar formulario, dentro de la función porque cuando haga el fetch es cuando se pintan

    let form = document.getElementById("formulario");
    form.innerHTML = `<section id="container">
                    <h1>${title}</h1>
                    <input class = "radio" type="radio" name="answer" id="ans1">
                    <label for="ans1" id="opt1" class="answers"><img class="iconLabel" src="./assets/images/icon09.png" alt="">${correct}</label>
                    
                    <input class = "radio" type="radio" name="answer" id="ans2">
                    <label for="ans2" id="opt2" class="answers"><img class="iconLabel" src="./assets/images/icon05.png" alt="">${incorrect[0]}</label>
                    

                    <input class = "radio" type="radio" name="answer" id="ans3">
                    <label for="ans3" id="opt3" class="answers"><img class="iconLabel" src="./assets/images/icon04.png" alt="">${incorrect[1]}</label>
                    
                    <input class = "radio" type="radio" name="answer" id="ans4">
                    <label for="ans4" id="opt4" class="answers"><input type="radio" name="answer" id="ans4"><img class="iconLabel" src="./assets/images/icon11.png" alt="">${incorrect[2]}</label>
                    
                    <input type="submit" value="Checked results!" class="quizbutton" id="resultado"></input>
                    </section>`

  
}


// funcionalidad botones 

// botón log in

if(document.title === 'Jukebox Quiz - Home'){
  document
    .getElementById("userGame")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let recoveredData = JSON.parse(localStorage.getItem("players"));
      let nombre = event.target.nombre.value;
      let player = [{ name: nombre }];
      
      if (recoveredData === null) {
        localStorage.setItem("players", JSON.stringify(player));
      } else {
          let newPlayer = { name: nombre };
        
        recoveredData.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(recoveredData));
      }

      window.location.href = './question.html';
      

      
    });

} 
if(document.title === 'Quiz'){
   questionsGenerator().then(()=>{
    pintarQuiz();
   })
  
 
}

// FUNCIONALIDAD BOTON MUTE
let audio = document.getElementsByClassName("audio");
let mute = document.getElementsByClassName("muteButton");
mute[0].addEventListener("click", function() {
    if (audio[0].muted == true) {
        audio[0].muted = false;
    } else {
        audio[0].muted = true;
    };}); 

//boton next

document.getElementById('next').addEventListener('click',function(){
  page++
  pintarQuiz();
})

// botón atrás
document.getElementById('back').addEventListener('click',function(){
  page--
  pintarQuiz();
})



//botón resultados
// if(page === 9){
  //borro botón siguiente, atrás
  //pinta botñon resultados 
  //al clicar el botón se hace submit, salta la alerta con las acertadas y las soluciones si queremos
  //nos vamos a results 
  //aprezca la tabla de resultados y gráfica de usuario
// }

//TEMPLATE TABLA
// Obtenemos las puntuaciones de los 5 mejores jugadores sea de local store o de Firenoseque
//De momento estas para llenar la tabla y maquetar.
// let puntuaciones = [
//   { name: "Juan", date: "2023-10-20", result: 100 },
//   { name: "Pedro", date: "2023-10-19", result: 90 },
//   { name: "María", date: "2023-10-18", result: 80 },
//   { name: "José", date: "2023-10-17", result: 70 },
//   { name: "Ana", sate: "2023-10-16", result: 60 },
// ];

// // Creamos la plantilla template string para la tabla
// const bestPlayers = `
//   <table>
//     <thead>
//       <tr>
//         <th>Player</th>
//         <th>Date</th>
//         <th>Result</th>
//       </tr>
//     </thead>
//     <tbody>
//       ${puntuaciones.map((puntuacion) => `
//         <tr>
//           <td>${puntuacion.name}</td>
//           <td>${puntuacion.date}</td>
//           <td>${puntuacion.result}</td>
//         </tr>
//       `).join("")}
//     </tbody>
//   </table>
// `;

// // Agregamos la tabla al DOM
// let sectionResults = document.getElementById("sectionResults")
// let contTable = document.getElementById("contTable")
// contTable.innerHTML = bestPlayers;
// sectionResults.appendChild(contTable);





// /* <input type="button" value="Checked results!" class="quizbutton" id="resultado"></input> */



//<button class="boton" type="submit"><a href="./question.html">Start Quiz!</a></button>
//validacionesks
//let form = document.getElementById("formulario");
//let score = 0; //se irá sumando si la pregunta es correcta. luego este score se pinta en la tabla

//cómo validar? if input checked === ans1 {score++} else if input checked === ans 2,3,4 {score + 0}



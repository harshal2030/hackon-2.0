const questions=[
  {qno:'1',correct:"Selena Gomez",options:['Rihanna','Selena Gomez','Ariana Grande','Taylor Swift'],imageURL:'../source/Picture1.png'},
  {qno:'2',correct:"Daniel Radcliff",options:['Daniel Radcliff','Rupert Grint','Richard Harris','Michael Jordan'],imageURL:'../source/Picture2.png'},
  {qno:'3',correct:"Michael Jordan",options:['Christiano Ronaldo','Harrison Ford ','Michael Jordan','Tom Hanks'],imageURL:'../source/Picture3.png'},
  {qno:'4',correct:"Dwayne Johnson",options:['Vin Diesel','Dwayne Johnson','Kevin Hart','Jack Black'],imageURL:'../source/Picture4.png'},
  {qno:'5',correct:"Selena Gomez",options:['Sergio Ramos','Lionel Messi','Diego Armando Maradona Franco','Neymar da Silva Santos Júnior'],imageURL:'../source/Picture5.jpg'},
]
const op1 = document.getElementById('option1');
const op2 = document.getElementById('option2');
const op3 = document.getElementById('option3');
const op4 = document.getElementById('option4');

const op1l = document.getElementById('option1l');
const op2l = document.getElementById('option2l');
const op3l = document.getElementById('option3l');
const op4l = document.getElementById('option4l');

const image = document.getElementById('celeb');

document.getElementById('user').innerHTML = localStorage.getItem('name');

let n = 0

const ticked = [];

const onClick = () => {
  ticked.push(document.querySelector('input[type="radio"]:checked').value);
  console.log(ticked)

  n += 1;

  op1.checked = false;
  op2.checked = false;
  op3.checked = false;
  op4.checked = false;

  op1.value = questions[n].options[0];
  op2.value = questions[n].options[1];
  op3.value = questions[n].options[2];
  op4.value = questions[n].options[3];

  op1l.innerHTML = questions[n].options[0];
  op2l.innerHTML = questions[n].options[1];
  op3l.innerHTML = questions[n].options[2];
  op4l.innerHTML = questions[n].options[3];

  image.src = questions[n].imageURL;
};

window.onload = function() {
  op1.checked = false;
  op2.checked = false;
  op3.checked = false;
  op4.checked = false;

  op1.value = questions[n].options[0];
  op2.value = questions[n].options[1];
  op3.value = questions[n].options[2];
  op4.value = questions[n].options[3];

  op1l.innerHTML = questions[n].options[0];
  op2l.innerHTML = questions[n].options[1];
  op3l.innerHTML = questions[n].options[2];
  op4l.innerHTML = questions[n].options[3];

  image.src = questions[n].imageURL;
}

let score = 0;

document.getElementById('submit').addEventListener('click', async () => {
  questions.forEach((q) => {
    if (ticked.includes(q.correct)) {
      score += 1;
    }
  })

  text = '';

  if (score >= 4) {
    text = `Your score is ${score}. You're alright`;
  } else if (score >= 2) {
    text = `Your score is ${score}. You may have dementia`
  } else {
    text = `Your score is ${score}. High chance of You may have dementia`
  }

  alert(text);

  const email = localStorage.getItem('email');

  const query = `
  mutation {
    registerScore(options: { email: "${email}", score: ${score} }) {
      error
      score {
        score
        email
        updateAt
      }
    }
  }`;

  await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
})

document.getElementById('next').addEventListener('click', () => {
  onClick();
})

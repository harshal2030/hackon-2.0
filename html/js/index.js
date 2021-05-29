const onFormSubmit = async () => {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value;

  const query = `
  mutation {
    register(user: { name: "${name}", email: "${email}" }) {
      error
      user {
        name
        email
        id
      }
    }
  }
  `

  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  console.log(res.status);
  const data = await res.json();

  if (data.data.register.error) {
    alert('Unable to start quiz');
    return;
  }

  window.location.href = '/quiz.html'

  return false;
}

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  onFormSubmit();
})

var Questions=[
  {qno:'1',correct:"Selena Gomez",options:['Rihanna','Selena Gomez','Ariana Grande','Taylor Swift'],imageURL:'source/Picture1.png'},
  {qno:'2',correct:"Daniel Radcliff",options:['Daniel Radcliff','Rupert Grint','Richard Harris','Michael Jordan'],imageURL:'source/Picture2.png'},
  {qno:'3',correct:"Michael Jordan",options:['Christiano Ronaldo','Harrison Ford ','Michael Jordan','Tom Hanks'],imageURL:'source/Picture3.png'},
  {qno:'4',correct:"Dwayne Johnson",options:['Vin Diesel','Dwayne Johnson','Kevin Hart','Jack Black'],imageURL:'source/Picture4.png'},
  {qno:'5',correct:"Selena Gomez",options:['Sergio Ramos','Lionel Messi','Diego Armando Maradona Franco','Neymar da Silva Santos Júnior'],imageURL:'source/Picture5.png'},

]

      
      
      
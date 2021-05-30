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

  const res = await fetch('/graphql', {
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

  localStorage.setItem('email', email);
  localStorage.setItem('name', name);
  window.location.href = `/quiz.html`

  return false;
}

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();

  onFormSubmit();
});

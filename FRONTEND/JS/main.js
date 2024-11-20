document.addEventListener('DOMContentLoaded', () => {
    fetch('https://<127.0.0.1:3000>.githubpreview.dev/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos obtenidos:', data);
        const dataContainer = document.getElementById('data-container');
        data.forEach(item => {
          const div = document.createElement('div');
          div.textContent = JSON.stringify(item);
          dataContainer.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud Fetch:', error);
      });
  });
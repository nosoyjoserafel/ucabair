document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/data')
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
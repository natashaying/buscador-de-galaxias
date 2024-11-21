// Código JavaScript para consumir la API y mostrar las imágenes

document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
      fetchImages(query);
    }
  });
  
  function fetchImages(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.collection.items.length > 0) {
          displayImages(data.collection.items);
        } else {
          alert("No se encontraron imágenes para esa búsqueda.");
          document.getElementById('contenedor').innerHTML = ''; // Limpiar contenedor si no hay resultados
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        alert("Hubo un error al obtener las imágenes.");
      });
  }
  
  function displayImages(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';  // Limpiar resultados anteriores
  
    items.forEach(item => {
      const { href: imageUrl, data } = item;
      const title = data[0]?.title || 'Sin título';
      const description = data[0]?.description || 'No disponible';
      const date = data[0]?.date_created || 'Fecha no disponible';
  
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');
      
      card.innerHTML = `
        <div class="card">
          <img src="${imageUrl}" class="card-img-top" alt="${title}" onerror="this.onerror=null;this.src='path_to_default_image.jpg';">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <p class="card-text"><small class="text-muted">${date}</small></p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }
  
  
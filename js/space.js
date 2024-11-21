const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const imageContainer = document.getElementById('imageContainer');

// Función para realizar la solicitud a la API
searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim(); // Obtener el texto ingresado
  if (!query) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filtrar los resultados que tienen imágenes
    const items = data.collection.items.filter(item => item.links);

    // Mostrar las imágenes
    displayImages(items);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    alert('Hubo un error al realizar la búsqueda. Inténtalo más tarde.');
  }
});

// Función para mostrar las imágenes en formato tarjeta
function displayImages(items) {
  imageContainer.innerHTML = ''; // Limpiar resultados anteriores

  if (items.length === 0) {
    imageContainer.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
    return;
  }

  items.forEach(item => {
    const imageUrl = item.links?.[0]?.href || 'placeholder.jpg'; // URL de la imagen
    const title = item.data?.[0]?.title || 'Sin título';
    const description = item.data?.[0]?.description || 'Sin descripción';
    const date = item.data?.[0]?.date_created || 'Fecha no disponible';

    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
      <div class="card">
        <img src="${imageUrl}" class="card-img-top" alt="${title}" onerror="this.onerror=null;this.src='placeholder.jpg';">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-muted">${new Date(date).toLocaleDateString()}</small></p>
        </div>
      </div>
    `;
    imageContainer.appendChild(card);
  });
}

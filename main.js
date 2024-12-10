import './style.css'

// URL da API
const apiURL = 'http://localhost:8080/produto';

// Função para buscar as fotos da API
export // Função para buscar as fotos da API
async function fetchPhotos() {
  try {
    // Obtém o critério de ordenação da combo box
    const sortOrder = document.getElementById('sort-options').value;

    // Captura o valor do campo de busca
    const searchQuery = document.getElementById('search-bar').value;

    // Monta a URL com os parâmetros de ordenação e filtro
    let apiUrl = `${apiURL}?order=${sortOrder}`;

    // Adiciona o parâmetro 'filter' se o campo de busca não estiver vazio
    if (searchQuery) {
      apiUrl += `&filter=${encodeURIComponent(searchQuery)}`;
    }

    // Faz a requisição à API com os parâmetros
    const response = await fetch(apiUrl);
    const photos = await response.json();

    // Exibe as fotos na tela
    displayPhotos(photos.slice(0, 100)); 
  } catch (error) {
    console.error('Erro ao carregar os produtos:', error);
  }
}


// Função para exibir as fotos na galeria
function displayPhotos(photos) {
  const gallery = document.getElementById('gallery');
  const totalPhotosElement = document.getElementById('total-photos');
  gallery.innerHTML = '';  // Limpa a galeria antes de adicionar novas fotos

  // Atualiza o total de fotos no rodapé
  totalPhotosElement.textContent = photos.length;

  // Exibe cada foto na galeria com título e preço
  photos.forEach(produto => {
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-item');

    // Criar a imagem
    const imgElement = document.createElement('img');
    imgElement.src = produto.imgURL;
    imgElement.alt = produto.descricao;

    // Criar o título
    const titleElement = document.createElement('h3');
    titleElement.textContent = produto.nome;

    // Criar o preço
    const priceElement = document.createElement('p');
    priceElement.textContent = 'R$ '+ produto.preco;

    // Adicionar imagem, título e preço ao container da foto
    photoContainer.appendChild(imgElement);
    photoContainer.appendChild(titleElement);
    photoContainer.appendChild(priceElement);

    // Adicionar o container da foto na galeria
    gallery.appendChild(photoContainer);
  });
}

document.getElementById('search-bar').addEventListener('input', fetchPhotos);

// Chama a função ao carregar a página
fetchPhotos();
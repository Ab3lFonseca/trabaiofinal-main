import './style.css'

// URL da API
const apiURL = 'http://localhost:8080/produto';

// Função para buscar as fotos da API
export async function fetchPhotos() {
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

  // Exibe cada foto na galeria com título, descrição e preço
  photos.forEach(produto => {
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-item');  // Adiciona uma classe para o estilo

    // Criar a imagem
    const imgElement = document.createElement('img');
    imgElement.src = produto.imgURL;
    imgElement.alt = produto.descricao;

    // Criar o título
    const titleElement = document.createElement('h3');
    titleElement.textContent = produto.nome;

    // Criar a descrição
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = produto.descricao;

    // Criar o preço
    const priceElement = document.createElement('p');
    priceElement.textContent = 'R$ ' + produto.preco.toFixed(2);  // Formatação de preço

    // Adicionar imagem, título, descrição e preço ao container da foto
    photoContainer.appendChild(imgElement);
    photoContainer.appendChild(titleElement);
    photoContainer.appendChild(descriptionElement); // Adiciona a descrição
    photoContainer.appendChild(priceElement);

    // Adicionar o container da foto na galeria
    gallery.appendChild(photoContainer);
  });
}

document.getElementById('search-bar').addEventListener('input', fetchPhotos);

// Chama a função ao carregar a página
fetchPhotos();

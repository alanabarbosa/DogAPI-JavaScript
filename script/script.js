"use strict";

// LOADING
const showLoading = () => {
    document.querySelector('.lds-circle').style.display = 'flex'
}

const hideLoading = () => {
    document.querySelector('.lds-circle').style.display = 'none'
}

// AVISOS
const alert = (msg) => {
  document.querySelector('.aviso').innerHTML = `<p>${msg}<p>`
}

// PESQUISA DA IMAGEM DO DOGS
const carregarImagens = async(event) => {
    event.preventDefault();
    const container = document.getElementById("imagem-container");
    const raca = document.getElementById("raca").value;
    const imagens = await pesquisarImagem(raca);
    const imagem = imagens.message.map(criarImagem);
    container.replaceChildren(...imagem);
}

// faca a pesquisa da imagem com o value do input
const pesquisarImagem = async (raca) => {
    showLoading()
    const url = `https://dog.ceo/api/breed/${raca}/images`;
    const response = await fetch(url);
    const data = await response.json(); 
    if(data.status === 'success') {
        alert('')
        return data;
    } else {
        hideLoading()
        alert('Raça não encontrada')
    }

};
// cria as imagens dinamicamente que foram percorridas na primeira funcao
const criarImagem = (imagem) => {
    hideLoading()
    const img = document.createElement("img");
    img.src = imagem;
    img.classList.add("imagem");
    return img;
  };
  
// LISTAGENS DO NOME DOS DOGS
const pesquisarRacas = async () => {
    const url = `https://dog.ceo/api/breeds/list/all`;
    const response = await fetch(url);
    const data = await response.json();    
    return Object.keys(data.message)    

  };
  
// Adiciona as racas retornadas no option da selecao
const carregarRacas = async() => {
    const racas = await pesquisarRacas()
    const lista = document.getElementById("lista-racas")
    lista.innerHTML = `<option> ${racas.join("</option><option>")} </option>`;  
}
carregarRacas();

const pesquisar = document.getElementById("search");
pesquisar.addEventListener("click", carregarImagens);





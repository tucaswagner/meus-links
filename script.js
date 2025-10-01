const linkList = document.getElementById('linkList');
const modal = document.getElementById('modal');
const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');

// Carregar links salvos
document.addEventListener("DOMContentLoaded", loadLinks);

function openModal() {
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}
function clearModal() {
  linkNameInput.value = "";
  linkUrlInput.value = "";
}
function saveLink() {
  const name = linkNameInput.value.trim();
  const url = linkUrlInput.value.trim();
  if (name && url) {
    const link = { name, url };
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.push(link);
    localStorage.setItem('links', JSON.stringify(links));
    renderLink(link);
    clearModal();
    closeModal();
  }
}
function renderLink(link) {
  const li = document.createElement('li');
  li.innerHTML = \`<a href="\${link.url}" target="_blank">\${link.name}</a>
                  <button class="delete" onclick="deleteLink('\${link.url}')">✖</button>\`;
  linkList.appendChild(li);
}
function loadLinks() {
  const links = JSON.parse(localStorage.getItem('links')) || [];
  linkList.innerHTML = "";
  links.forEach(renderLink);
}
function deleteLink(url) {
  let links = JSON.parse(localStorage.getItem('links')) || [];
  links = links.filter(link => link.url !== url);
  localStorage.setItem('links', JSON.stringify(links));
  loadLinks();
}
function clearLinks() {
  if (confirm("Tem certeza que deseja apagar todos os links?")) {
    localStorage.removeItem('links');
    loadLinks();
  }
}

const API_URL = 'http://localhost:3333/videos';

async function loadVideos() {
  const search = document.getElementById('search').value;
  const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`);
  const videos = await res.json();

  const container = document.getElementById('videos');
  container.innerHTML = '';

  videos.forEach(v => {
    const card = document.createElement('div');
    card.classList.add('video-card');
    card.innerHTML = `
      <h3>${v.title}</h3>
      <p>${v.description}</p>
      <small>Duração: ${v.duration}s</small>
      <div class="actions">
        <a href="edit.html?id=${v.id}">Editar</a>
        <button onclick="deleteVideo('${v.id}')">Excluir</button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function deleteVideo(id) {
  if (!confirm('Deseja realmente excluir este vídeo?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadVideos();
}

window.onload = loadVideos;

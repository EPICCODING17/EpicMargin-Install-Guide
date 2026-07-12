const body = document.body;
const themeButton = document.getElementById('themeButton');
const savedTheme = localStorage.getItem('em-guide-theme');
if (savedTheme === 'dark') body.classList.add('dark');

function syncThemeButton() {
  themeButton.textContent = body.classList.contains('dark') ? '☀' : '☾';
}
syncThemeButton();

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('em-guide-theme', body.classList.contains('dark') ? 'dark' : 'light');
  syncThemeButton();
});

document.querySelectorAll('.copy').forEach(button => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-card').querySelector('code').innerText;
    await navigator.clipboard.writeText(code);
    button.textContent = 'คัดลอกแล้ว';
    button.classList.add('done');
    setTimeout(() => {
      button.textContent = 'คัดลอก';
      button.classList.remove('done');
    }, 1400);
  });
});

const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
}
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const links = [...document.querySelectorAll('#toc a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!current) return;
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.target.id}`));
}, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .2, .5] });
sections.forEach(section => observer.observe(section));

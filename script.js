/* Mobile menu: synchronize visual visibility with its accessible state. */
const menuButton = document.querySelector('.menu-toggle');
const navigationLinks = document.querySelector('#nav-links');
function closeMenu() {
  navigationLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navigationLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
/* Close after selecting a section or pressing Escape. */
navigationLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 641px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
/* Theme selection persists when browser storage is available. */
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
try {
  applyTheme(localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light');
} catch {
  applyTheme('light');
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* The theme still works without storage. */ }
});
/* Details describe known project work without implying live demos exist. */
const projects = {
  votesecure: {
    title: 'BulSU VoteSecure',
    description: 'A PHP and MySQL student government voting system for BulSU. Work included election browsing, voting history, live results with Chart.js, and checks for voters who have already voted.',
    learning: ['PHP sessions and prepared database statements.', 'Election search, filters, and pagination.', 'AJAX requests and database-driven results.', 'Consistent navigation with a maroon-and-gold visual theme.']
  },
  tuition: {
    title: 'Tuition Fee Assessment',
    description: 'A Java console application for assessing tuition under scholarship and installment options. It applies discounts or interest and presents formatted totals.',
    learning: ['Separating logic into reusable methods.', 'Validating user input with loops and conditionals.', 'Calculating discounts and installment interest.', 'Formatting monetary output with DecimalFormat.']
  },
  flutter: {
    title: 'Student Contacts App',
    description: 'A Flutter student app exercise with an orange header and beige background, navigation drawer, bottom navigation, and an information page.',
    learning: ['Building interfaces with Material widgets.', 'Managing interactions with StatefulWidget.', 'Using Scaffold, navigation, and floating action buttons.', 'Organizing app information and visual hierarchy.']
  }
};
const projectDialog = document.querySelector('#project-dialog');
/* Populate the shared dialog using textContent to keep project text safe. */
function openProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  const learningList = document.querySelector('#dialog-learning');
  learningList.replaceChildren(...project.learning.map(text => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
  projectDialog.showModal();
}
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});
document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
/* Clicking the backdrop closes the dialog; clicks inside retain it. */
projectDialog.addEventListener('click', event => {
  const bounds = projectDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) projectDialog.close();
});
/* Keep the copyright year current without a manual edit. */
document.querySelector('#year').textContent = new Date().getFullYear();

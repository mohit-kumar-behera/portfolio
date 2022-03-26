import { wait } from './controller.js';
import { setProjectHighlighter, state } from './db-model.js ';

const projectWrapper = document.querySelector('.project--wrapper');

const loadSpinner = el =>
  (el.innerHTML = `<i class="spinner-border spinner-border-sm text-warning"></i>`);

const resetSpinner = el =>
  (el.innerHTML = `<i class="fa fa-trophy trophy-icon"></i>`);

const updateUI = (el, state) => {
  el.setAttribute('data-status', state.highlight);
  state.highlight ? el.classList.add('active') : el.classList.remove('active');
};

const freezeUI = el => {
  el.style.pointerEvents = 'none';
  el.style.cursor = 'progress';
};

const unfreezeUI = el => {
  el.style.pointerEvents = 'visible';
  el.style.cursor = 'pointer';
};

const controlHighlightProject = async el => {
  const statusMapper = {
    true: true,
    false: false,
  };
  // Extract project ID
  const projectId = el.dataset.setId;
  let currProjStatus = el.dataset.status.toLowerCase();
  currProjStatus = statusMapper[currProjStatus];

  const formData = { setProjectHighlight: !currProjStatus };

  try {
    // Loading Animation
    loadSpinner(el);
    freezeUI(el);

    // Fetch Data
    await setProjectHighlighter(projectId, formData);

    // Render
    updateUI(el, state.project.projectHighlight);
  } catch (err) {
    // Do nothing
  } finally {
    await wait(0.3);
    resetSpinner(el);
    unfreezeUI(el);
  }
};

projectWrapper.addEventListener('click', e => {
  const setHighlighterEl = e.target.closest('.set-highlight-star');

  if (!setHighlighterEl) return;

  controlHighlightProject(setHighlighterEl);
});

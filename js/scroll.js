const projectsContainer = document.querySelector('.real-grid');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let projectIndex = 0;

prevBtn.addEventListener('click', () => {
    projectIndex = Math.max(projectIndex - 3, 0);
    updateProjects();
});

nextBtn.addEventListener('click', () => {
    projectIndex = Math.min(projectIndex + 3, projectsContainer.children.length - 3);
    updateProjects();
});

function updateProjects() {
    for (let i = 0; i < projectsContainer.children.length; i++) {
        projectsContainer.children[i].style.display = 'none';
    }

    for (let i = projectIndex; i < projectIndex + 3; i++) {
        if (projectsContainer.children[i]) {
            projectsContainer.children[i].style.display = 'block';
        }
    }
}

updateProjects();

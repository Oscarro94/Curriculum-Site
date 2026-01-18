 document.addEventListener('DOMContentLoaded', () => {
            // Menú Hamburguesa
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });

                // Cerrar menú al hacer click en un link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                    });
                });
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Sistema de Idiomas
            const langData = {
                es: {
                    about: "Sobre mí",
                    skills: "Habilidades",
                    projects: "Proyectos",
                    social: "Redes",
                    download_cv_es: "Descargar CV (ES)",
                    download_cv_en: "Descargar CV (EN)",
                    hi_there: "Oscar Romero 🧑🏽‍💻",
                    junior_programmer: "Ingeniero de Sistemas || Programador Junior",
                    know_more_button: "Conoce más",
                    about_me_title: "Sobre Mí",
                    about_me_text_p1: "Ingeniero de Sistemas con una profunda pasión por la programación y un compromiso constante con el aprendizaje. Capaz de trabajar bajo presión mientras manejo altas cargas de trabajo, así como de ser independiente con poca supervisión. Actualmente, estoy explorando nuevas tecnologías como JavaScript y Java, con el objetivo de expandir mis habilidades y mantenerme a la vanguardia de este campo dinámico.",
                    skills_title: "Habilidades Técnicas",
                    skill_js: "Desarrollo web moderno con ES6+",
                    skill_java: "Programación orientada a objetos",
                    skill_html: "Diseño web responsivo",
                    skill_db: "SQL y gestión de datos",
                    projects_title: "Proyectos",
                    project_ida_menu: "Creations by Ida - Menú",
                    project_monster_game: "Juego de Monstruos",
                    project_dog_page: "Página de Perros",
                    project_rps_game: "Juego Piedra Papel Tijera",
                    project_blog: "Blog",
                    social_media_title: "Redes Sociales",
                    find_me_on: "Puedes encontrarme en",
                    footer_text: "Hecho por Oscar Romero - 2026",
                    no_projects_title: "🚧 Proyectos en Desarrollo",
                    no_projects_text: "Actualmente trabajando en nuevos proyectos con esta tecnología. ¡Pronto estarán disponibles!",
                    project_hello_world: "Hello World - Gestor de Archivos"
                },
                en: {
                    about: "About",
                    skills: "Skills",
                    projects: "Projects",
                    social: "Social",
                    download_cv_es: "Download CV (ES)",
                    download_cv_en: "Download CV (EN)",
                    hi_there: "Oscar Romero 🧑🏽‍💻",
                    junior_programmer: "Systems Engineer || Junior Programmer",
                    know_more_button: "Learn more",
                    about_me_title: "About Me",
                    about_me_text_p1: "Systems Engineer with a deep passion for programming and a constant commitment to learning. Capable of working under pressure while managing high workloads, as well as being independent with little supervision. Currently, I am exploring new technologies such as JavaScript and Java, with the aim of expanding my skills and staying at the forefront of this dynamic field.",
                    skills_title: "Technical Skills",
                    skill_js: "Modern web development with ES6+",
                    skill_java: "Object-oriented programming",
                    skill_html: "Responsive web design",
                    skill_db: "SQL and data management",
                    projects_title: "Projects",
                    project_ida_menu: "Creations by Ida - Menu",
                    project_monster_game: "Monster Game",
                    project_dog_page: "Dog Page",
                    project_rps_game: "RockPaperScissor Game",
                    project_blog: "Blog",
                    social_media_title: "Social Media",
                    find_me_on: "You can find me on",
                    footer_text: "Made by Oscar Romero - 2026 ",
                    no_projects_title: "🚧 Projects in Development",
                    no_projects_text: "Currently working on new projects with this technology. They will be available soon!",
                    project_hello_world: "Hello World File Manager"
                }
            };

            function setLanguage(lang) {
                document.querySelectorAll('[data-lang-key]').forEach(element => {
                    const key = element.getAttribute('data-lang-key');
                    if (langData[lang] && langData[lang][key]) {
                        if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                            element.placeholder = langData[lang][key];
                        } else {
                            element.textContent = langData[lang][key];
                        }
                    }
                });

                document.querySelectorAll('.lang-selector button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.getElementById(`lang-${lang}`)?.classList.add('active');
            }

            // Eventos de botones de idioma
            const langEsBtn = document.getElementById('lang-es');
            const langEnBtn = document.getElementById('lang-en');

            if (langEsBtn && langEnBtn) {
                langEsBtn.addEventListener('click', () => setLanguage('es'));
                langEnBtn.addEventListener('click', () => setLanguage('en'));
            }

            // Cargar idioma por defecto
            setLanguage('en');

            // Sistema de filtrado de proyectos
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    button.classList.add('active');
                    
                    const filter = button.dataset.filter;
                    filterProjects(filter);
                });
            });

            function filterProjects(filter) {
                const projects = document.querySelectorAll('.project-tile');
                const noProjectsMessage = document.getElementById('noProjectsMessage');
                let visibleCount = 0;
                
                projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        project.classList.add('hidden');
                    }
                });

                // Mostrar mensaje si no hay proyectos visibles
                if (visibleCount === 0) {
                    noProjectsMessage.classList.add('show');
                } else {
                    noProjectsMessage.classList.remove('show');
                }
            }

            // Inicializar mostrando todos los proyectos
            filterProjects('all');

            // Animación de scroll suave para los iconos de redes sociales
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.skill-card, .project-tile').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });
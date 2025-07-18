document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul a');

    function showSection(id) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        const newActiveSection = document.getElementById(id);
        if (newActiveSection) {
            newActiveSection.classList.add('active');
        }
    }

    function updateActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            updateActiveLink(targetId);
        });
    });

    // Show the first section by default
    if (sections.length > 0) {
        const firstSectionId = sections[0].id;
        showSection(firstSectionId);
        updateActiveLink(firstSectionId);
    }

    const contactBtn = document.getElementById('contact-btn');
    const contactDetails = document.getElementById('contact-details');

    contactBtn.addEventListener('click', () => {
        if (contactDetails.classList.contains('show')) {
            contactDetails.classList.remove('show');
        } else {
            contactDetails.style.display = 'block';
            setTimeout(() => {
                contactDetails.classList.add('show');
            }, 10);
        }
    });

    contactDetails.addEventListener('transitionend', () => {
        if (!contactDetails.classList.contains('show')) {
            contactDetails.style.display = 'none';
        }
    });

    const projects = {
        "UDM Clinic Cares System": {
            description: "A web-based platform to streamline clinic operations and patient records for the Universidad de Manila. Features include appointment scheduling, patient information management, and medical records tracking.",
            images: [
                "images/projects/UDM_Clinic_Cares/1LandingPage.png",
                "images/projects/UDM_Clinic_Cares/2LoginPage.png",
                "images/projects/UDM_Clinic_Cares/3DashboardPage.png",
                "images/projects/UDM_Clinic_Cares/4AddPatientPage.png",
                "images/projects/UDM_Clinic_Cares/5ViewPatientsPage.png",
                "images/projects/UDM_Clinic_Cares/6PatientDetailsPage.png",
                "images/projects/UDM_Clinic_Cares/7ConsulatationsPage.png",
                "images/projects/UDM_Clinic_Cares/8PatientRecordsPage.png",
                "images/projects/UDM_Clinic_Cares/9GenerateQRPage.png",
                "images/projects/UDM_Clinic_Cares/10MedinventoryPage.png",
                "images/projects/UDM_Clinic_Cares/11MediLogPage.png",
                "images/projects/UDM_Clinic_Cares/12StaffAccountPage.png",
                "images/projects/UDM_Clinic_Cares/13DBPage.png"
            ],
            descriptions: [
                "The main landing page of the UDM Clinic Cares System, providing an overview of its features and services.",
                "The secure login page for clinic staff and administrators to access the system.",
                "The central dashboard, offering a comprehensive overview of clinic activities, patient statistics, and system notifications.",
                "The interface for adding new patients to the system, capturing essential personal and medical information.",
                "A list view of all registered patients, allowing for easy searching and access to their records.",
                "A detailed view of a single patient's information, including their medical history and consultation records.",
                "The consultation management page, where clinic staff can record new patient consultations and view past visit details.",
                "A complete history of a patient's medical records, including diagnoses, treatments, and prescriptions.",
                "A feature to generate a unique QR code for each patient, enabling quick and secure access to their records.",
                "The medicine inventory management page, allowing staff to track stock levels and manage supplies.",
                "A log of all medicine dispensed from the inventory, ensuring accurate tracking and accountability.",
                "The staff account management page, where administrators can create and manage user accounts for clinic personnel.",
                "A view of the system's database structure, showcasing the relationships between different data tables."
            ]
        },
        "UDM IntelliGrade System": {
            description: "An automated grading system designed for faculty use at Universidad de Manila. It simplifies the process of grade computation, reduces manual errors, and provides analytics on student performance.",
            images: [
                "images/projects/UDM_IntelliGrade/1FrontPage.png",
                "images/projects/UDM_IntelliGrade/2SigninPage.png",
                "images/projects/UDM_IntelliGrade/3RegisterPage.png",
                "images/projects/UDM_IntelliGrade/4DashboardPage.png",
                "images/projects/UDM_IntelliGrade/5CreatePage.png",
                "images/projects/UDM_IntelliGrade/6ClassesPage.png",
                "images/projects/UDM_IntelliGrade/7Enroll.png",
                "images/projects/UDM_IntelliGrade/8Components.png",
                "images/projects/UDM_IntelliGrade/9DBbackup.png",
                "images/projects/UDM_IntelliGrade/10Grading.png"
            ],
            descriptions: [
                "The landing page of the UDM IntelliGrade System, providing an overview of the system's features.",
                "The secure sign-in page for faculty members to access their accounts.",
                "The registration page for new faculty members to create an account.",
                "The main dashboard, offering a centralized view of classes, students, and grading tasks.",
                "The interface for creating new class entries and defining grading criteria.",
                "A view of all active classes managed by the faculty member.",
                "The student enrollment page, allowing faculty to add students to their classes.",
                "A showcase of the various UI components used throughout the application.",
                "A confirmation screen for database backup operations, ensuring data integrity.",
                "The core grading interface where faculty can input and calculate student grades."
            ]
        },
        "UDM Study Plan System": {
            description: "A dynamic study plan generator for students. It helps students to plan their academic journey, select courses, and ensure they meet all curriculum requirements for graduation.",
            images: ["images/projects/udm-study-plan.jpg"],
            descriptions: ["A dynamic study plan generator for students. It helps students to plan their academic journey, select courses, and ensure they meet all curriculum requirements for graduation."]
        },
        "HelloFW": {
            description: "HelloFW is a social platform that connects OFWs from different countries to share cultures, ideas, experiences and conversations in real time. ",
            images: ["images/projects/hellofw.jpg"],
            descriptions: ["HelloFW is a social platform that connects OFWs from different countries to share cultures, ideas, experiences and conversations in real time. "]
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalImg = modal.querySelector('.modal-image-container img');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = modal.querySelector('.close-button');
    const prevButton = modal.querySelector('.prev-button');
    const nextButton = modal.querySelector('.next-button');
    const imageCounter = modal.querySelector('.image-counter');

    let currentImageIndex = 0;
    let currentProject;

    function openModal(project) {
        currentProject = project;
        currentImageIndex = 0;
        modalTitle.textContent = Object.keys(projects).find(key => projects[key] === project);
        updateModalContent();
        modal.style.display = 'block';

        if (currentProject.images.length > 1) {
            modal.querySelector('.modal-controls').style.display = 'flex';
        } else {
            modal.querySelector('.modal-controls').style.display = 'none';
        }
    }

    function updateModalContent() {
        modalImg.src = currentProject.images[currentImageIndex];
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;
        
        if (currentProject.descriptions && currentProject.descriptions[currentImageIndex]) {
            modalText.textContent = currentProject.descriptions[currentImageIndex];
        } else {
            modalText.textContent = currentProject.description;
        }
    }

    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateModalContent();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateModalContent();
    }

    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const project = projects[title];
            if (project) {
                openModal(project);
            }
        });
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});

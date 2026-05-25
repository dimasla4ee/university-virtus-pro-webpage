function scrollToPlayer(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}

const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => link.classList.remove("active"));

                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (activeLink) {
                    activeLink.classList.add("active");
                }

                history.replaceState(null, null, `#${id}`);
            }
        });
    },
    {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach(section => observer.observe(section));

document.querySelectorAll(".team-header").forEach(header => {
    header.addEventListener("click", () => {
        const card = header.closest(".team-card");
        const isOpen = card.classList.toggle("active");

        header.setAttribute("aria-expanded", isOpen);
    });
});

document.querySelectorAll(".team-card").forEach(card => {
    if (!card.classList.contains("active")) {
        const body = card.querySelector(".team-body");

        if (body) {
            body.hidden = true;
        }
    }
});
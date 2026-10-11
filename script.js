/**
 * Список всех элементов с заданным классом `nav-link`.
 * @type {NodeListOf<Element>}
 */
const links = document.querySelectorAll(".nav-link");

/**
 * Список всех секций `section` с заданным `id`.
 * @type {NodeListOf<Element>}
 */
const sections = document.querySelectorAll("section[id]");

/**
 * Наблюдатель, реализующий механизм подсветки элементов навигации
 * в зависимости от просматриваемой части страницы (scroll-spy).
 *
 * Когда секция попадает в определённую зону видимости:
 * - у всех ссылок `nav-link` удаляется класс `active`;
 * - определяется ссылка, ведущая на эту секцию, и обновляется на `active`;
 * - адресная строка обновляется без перезагрузки и добавления новой записи в историю.
 * @type {IntersectionObserver}
 */
const scrollSpyObserver = new IntersectionObserver(
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
        // Смещение области пересечения в центр зоны видимости
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
    }
);
sections.forEach(section => scrollSpyObserver.observe(section));

document.querySelectorAll('.expandable-card').forEach(details => {
    const summary = details.querySelector('summary');
    const body = details.querySelector('.body');
    let isClosing = false;

    summary.addEventListener('click', e => {
        if (!details.open || isClosing) return;

        e.preventDefault();
        isClosing = true;
        body.style.gridTemplateRows = '0fr';

        body.addEventListener('transitionend', () => {
            details.open = false;
            body.style.gridTemplateRows = '';
            isClosing = false;
        }, {once: true});
    });
});

/**
 * Находит элемент по `id` и плавно прокручивает страницу так,
 * чтобы выбранный элемент оказался вверху области просмотра.
 */
function scrollToElement(id) {
    document.getElementById(id).scrollIntoView(
        {behavior: 'smooth'}
    );
}

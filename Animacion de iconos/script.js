window.addEventListener("DOMContentLoaded",() => {
	const app = new App(".app");
});

class App {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.page = 1;

		this.el?.addEventListener("click",this.viewPage.bind(this));
	}
	setPage(number) {
		const nav = document.querySelector("[data-nav]");

		nav?.classList.remove(`nav--tilt${this.page}`);
		this.page = number;
		nav?.classList.add(`nav--tilt${this.page}`);
	}
	viewPage(e) {
		e.preventDefault();
		// Buuuubbbb hacia arriba
		let parent = e.target;

		while (parent && !parent.hasAttribute("data-nav-item"))
			parent = parent.parentElement;

		if (parent) {
			// set the page number
			const pageNumber = +parent.getAttribute("data-nav-item");

			if (pageNumber !== this.page) {
				this.setPage(pageNumber);

				// move the active state to the clicked item
				const items = document.querySelectorAll("[data-nav-item]");

				Array.from(items).forEach(item => {
					item.removeAttribute("aria-describedby");
				});	

				parent.setAttribute("aria-describedby","current");

				// Bubbbllll movidas 
				this.spawnCards();
			}
		}
	}
	spawnCards() {
		const arriba = "card--fly-out";
		const tarjeta = document.querySelectorAll("[data-card]");

		Array.from(tarjeta).forEach(card => {
			card.classList.remove(arriba);
			void card.offsetWidth;
			card.classList.add(arriba);
		});
	}
}
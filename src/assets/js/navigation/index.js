const navLinks = document.querySelectorAll('#nav ul.list li a');
const homeSection = document.querySelector('#home');
const header = document.querySelector('#header');

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
const ScrollControl = class {
	constructor({ links = [] }) {
		this.hash = window.location.pathname;

		this.links = [...links].map(link => ({
			node: link,
			hash: link.getAttribute('href').replace('#', '/'),
			selector: link.getAttribute('href').replace('/', '#'),
			title: link.getAttribute('title')
		}));

		this.nodeList = [
			...this.links.map(link => ({
				node: document.querySelector(link.selector),
				hash: link.hash
			}))
		];

		window.addEventListener('scroll', _ => this.sectionHandler());
		this.linksHandler();
        this._updateNavigation = debounce(this.updateNavigation, 30);
		if (this.hash && this.hash !== '/') this.updateSections()
		this.sectionHandler()
	}

	sectionHandler() {
		if (window.innerWidth < 991) {
			console.log(window.scrollY > homeSection.offsetHeight, window.scrollY, homeSection)
			if (window.scrollY > homeSection.offsetHeight && !header.classList.contains('scrolled')) {
				header.classList.add('scrolled')
			} else if (window.scrollY < homeSection.offsetHeight && header.classList.contains('scrolled')) {
				header.classList.remove('scrolled')
			}
		}
		for (let node of this.nodeList) {
			const coords = node.node.getBoundingClientRect();
			const isCurrent = coords.top >= 0 || coords.bottom - 40 > 0;
			if (isCurrent) {
				this.hash = node.hash;
				this._updateNavigation();
				break;
			}
		}
	}

	linksHandler() {
		this.links.forEach(link => {
			link.node.addEventListener('click', event => {
				event.preventDefault();
				this.hash = link.hash;
				this.updateSections();
			});
		});
	}

	updateNavigation() {
		this.links.forEach(link => {
			if (link.hash === this.hash) {
				link.node.classList.add('btn-primary');
				const title = `J.L. - ${link.title}`;
				window.history.replaceState(null, null, link.hash);
				window.document.title = title;
			} else {
				link.node.classList.remove('btn-primary');
			}
		});
	}

	updateSections() {
		const node = this.nodeList.find(node => node.hash === this.hash).node;
		window.scrollTo({
			top: node.offsetTop - 30,
			behavior: 'smooth'
		});
	}
};

new ScrollControl({
	links: navLinks
});

const MobileControl = class {
	constructor() {
		this.isActive = false;
		this.button = document.querySelector('#nav-toggle_menu');
		this.header = document.querySelector('#header');
		this.nav = document.querySelector('#nav');
		this.button.addEventListener('click', () => this.toggle());
		this.main = document.querySelector('.main');
	}

	toggle() {
		this.isActive = !this.isActive;
		// this.isActive ? this.main.classList.add('blur') : this.main.classList.remove('blur')
		this.render();
	}

	render() {
		if (this.isActive) {
			this.button.classList.add('active');
			this.nav.classList.add('active');
		} else {
			this.button.classList.remove('active');
			this.nav.classList.remove('active');
		}
	}
};

new MobileControl();

const loadImages = document.querySelectorAll('.lazy-load') || [];
const images = {
	gw_list: require('../../img/examples/goodWorker/gw_list.png'),

	ng_desktop: require('../../img/examples/normalgame/ng_desktop.png'),
	ng_mobile: require('../../img/examples/normalgame/ng_mobile.png'),

	cam_list: require('../../img/examples/cryptarena-mobile/cam_mobile_list.png'),
	cam_coin: require('../../img/examples/cryptarena-mobile/cam_mobile_coin.png'),
	cam_news: require('../../img/examples/cryptarena-mobile/cam_mobile_news.png'),

	jm_main: require('../../img/examples/jm/jm-main.png'),
	jm_qr: require('../../img/examples/jm/jm-qr.jpg'),
	jm_map: require('../../img/examples/jm/jm-map.png'),

	jlm_desktop: require('../../img/examples/jlm/jlm_desktop.png'),
	jlm_mobile: require('../../img/examples/jlm/jlm_mobile.png'),
	jlme_desktop: require('../../img/examples/jlm/jlme_desktop.jpg'),

	rwrd_desktop: require('../../img/examples/rwrd/rwrd-desktop.png'),

	nomis_desktop: require('../../img/examples/nomis/nomis_desktop.png'),
	nomis_mobile: require('../../img/examples/nomis/nomis_mobile.png'),
	responsive: require('../../img/icon/responsive.png'),
	checklist: require('../../img/icon/checklist.png')
};
const LazyLoad = class {
	constructor({ images }) {
		this.images = images;
		window.addEventListener('scroll', () => this.checkPosition());
	}

	checkPosition() {
		this.images.length &&
			this.images.forEach(image =>
				this.isVisible(image) ? this.showImage(image) : undefined
			);
	}

	isVisible(elem) {
		const coords = elem.getBoundingClientRect();

		const windowHeight = document.documentElement.clientHeight;

		const topVisible =
			coords.top + windowHeight / 2 > 0 && coords.top < windowHeight;
		const bottomVisible =
			coords.bottom < windowHeight + windowHeight / 2 && coords.bottom > 0;

		return topVisible || bottomVisible;
	}

	showImage(elem) {
		const _src = elem.getAttribute('realsrc');
		const _bg = elem.getAttribute('realbg');
		if (_src) {
			elem.src = images[_src] || _src;
			this.images = Array.prototype.slice
				.call(this.images)
				.filter(image => image !== elem);
		} else if (_bg) {
			elem.style.backgroundImage = `url(${images[_bg]}`;
			this.images = Array.prototype.slice
				.call(this.images)
				.filter(image => image !== elem);
		}
	}
};

const lazy = new LazyLoad({
	images: loadImages
});

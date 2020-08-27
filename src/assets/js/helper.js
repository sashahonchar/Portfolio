import config from './config';
const { secret, domain } = config;
const create = tagname => document.createElement(tagname);

const div = create('div');
const span = create('span');
const nav = create('nav');
const ul = create('ul');
const li = create('li');
const strong = create('strong');
const a = create('a');
const h3 = create('h3');
const h4 = create('h4');
const h5 = create('h5');
const p = create('p');
const img = create('img');
const button = create('button');

const setStyle = (selector, styles = {}) => {
	for (let [key, value] of Object.entries(styles)) {
		selector.style[key] = value;
	}
};

const Http = class {
	constructor({ secret, domain }) {
		this.secret = secret;
		this.domain = domain;
	}

	post({ data, success, error, url, myDomain = true }) {
		const _url = myDomain ? `${this.domain}/${url}` : url;

		const xhr = new XMLHttpRequest();

		if (myDomain) data._secret = this.secret;

		const json = JSON.stringify(data);

		xhr.onreadystatechange = () => {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
				success(xhr.response);
			}
		};

		// Отсылаем объект в формате JSON и с Content-Type application/json
		// Сервер должен уметь такой Content-Type принимать и раскодировать
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send(json);
	}
};
const http = new Http({ secret, domain });

export { div, span, nav, ul, li, strong, a, h3, h4, h5, p, img, button, setStyle, http };

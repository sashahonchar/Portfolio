import {
	div,
	span,
	nav,
	ul,
	li,
	strong,
	a,
	h3,
	p,
	img,
	button,
	setStyle
} from '../helper';

const delay = (ms = 0) => new Promise(res => setTimeout(() => res(), ms))
const letterDelay = 100

const TextBracket = class {
	constructor({ selector }) {
		if (!selector) return;
		this.selector = selector;
		const { keywords = [], duration = 4000 } = this.selector.dataset;
		this.duration = duration;
        this.words = keywords.split(',');
        
		this.wordContainer = strong.cloneNode();
        this.current = 0;
        this.createNode()
    }
    
	createNode() {
        const before = h3.cloneNode();
		const after = h3.cloneNode();

        before.className = 'color-primary bold mr-10';
		after.className = 'color-primary bold ml-10';

		before.innerHTML = '[';
		after.innerHTML = ']';

        this.selector.append(before, this.wordContainer, after);

        this.update()
    }
    
	async update() {
        const word = this.words[this.current]
        if (this.current >= this.words.length - 1) {
            this.current = 0
        } else {
            ++this.current
        }

        await this.writeWord(word)
        await  delay(2000)

        await this.deleteWord(word)

        this.update()
    }
    
    async writeWord(word) {
        let letters = word.split('')
        let count = 0
        while (letters.length !== count) {
            this.wordContainer.innerHTML += letters[count]
            ++count
            await delay(letterDelay)
        }

    }
    async deleteWord(word) {
        let letters = word.split('')
        while (letters.length) {
            letters.length = letters.length - 1
            this.wordContainer.innerHTML = letters.join('')
            await delay(letterDelay)
        }

    }
};
const textBrackets = document.querySelectorAll('.text-bracket');
textBrackets.forEach(
	textBracket =>
		new TextBracket({
			selector: textBracket
		})
);

// import { http } from '../helper'
// import { _notification } from '../notification'
const form = document.getElementById("contact_form");
// console.log(process.env.NODE_ENV)
const serializeForm = form => {
	let formData = {};
	const inputs = form.querySelectorAll("input");
	const textarea = form.querySelectorAll("textarea");

	[...inputs, ...textarea].map(node => {
		formData[node.name] = node.value;
	});
	return formData;
};

// Info modal
const infoModal = document.querySelector("#info-modal");
const closeInfoModalButton = infoModal.querySelector("#close-info-button");
const infoModalBackdrop = infoModal.querySelector(".modal-backdrop");
const infoTitle = infoModal.querySelector("#info-title");
const infoSubTitle = infoModal.querySelector("#info-subtitle");

const closeInfoModal = () => {
	infoModal.classList.remove("active");
	setTimeout(() => {
		infoTitle.innerHTML = "";
		infoSubTitle.innerHTML = "";
	}, 400);
};

const openInfoModal = ({ title = "", subtitle = "" }) => {
	infoTitle.innerHTML = title;
	infoSubTitle.innerHTML = subtitle;

	infoModal.classList.add("active");
};

infoModalBackdrop.addEventListener("click", closeInfoModal);
closeInfoModalButton.addEventListener("click", closeInfoModal);
// Info modal
const delay = ms => new Promise(res => setTimeout(res, ms));

const submitForm = async (event, count = 0) => {
	event.preventDefault();

	const formNode = event.target;

	const form = serializeForm(formNode);

	try {
		const response = await fetch(`${process.env.NODE_ENV === "development" ? "http://localhost:5000/" : ""}message`, {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data = await response.json()
		// if (data.error) {
			Object.keys(form).forEach(key => {
				const node = formNode.querySelector(`[name=${key}] + .form-error`);
				if (node) node.innerHTML = data.error && data.error[key] ? data.error[key] : "";
			});
		// }

		if (!data.error) {
			// modal.classList.remove("active");
			// pageWrapper.classList.remove("blur");

			openInfoModal({
				title: "Cool. Got your message!",
				subtitle: "Thank you! We will contact you as soon as possible"
			});
		}
	} catch (error) {
		if (count >= 3) {
			openInfoModal({
				title: "Oops! Wake up your connection!",
				subtitle: "Your internet seems too slow to reach our server <br/> Please try againg in few minutes"
			});
			return;
		}
		await delay(500);
		submitForm(event, ++count);
	}
};

form.addEventListener("submit", submitForm);

/* eslint-disable no-undef */

const chooseSelects = document.querySelectorAll(`form.zoekopdracht select`);
const geenVoorkeurInputs = document.querySelectorAll(`form.zoekopdracht>div:not(:last-of-type) input[type="checkbox"]`);

const imageInputs = document.querySelectorAll(`form.fotos input`);
const imageLabels = document.querySelectorAll(`form.fotos label`);

const continenten = document.querySelectorAll(`form.reizen>div:first-of-type label`);
const landenContinenten = document.querySelectorAll(`form.reizen>div:nth-of-type(2) div`);

chooseSelects.forEach(function (chooseSelect) {
	chooseSelect.addEventListener(`change`, function () {
		chooseSelect.classList.toggle(`checked`);
	});
});

imageInputs.forEach(function (imageInput) {
	imageInput.addEventListener(`change`, function (e) {
		displayImage(e);
		displayLabel();
	});
});

function displayImage(e) {
	const labelElement = document.querySelector(`[for = "${e.target.id}"]`);

	const fileReader = new FileReader();
	fileReader.readAsDataURL(e.target.files[0]);
	fileReader.addEventListener(`load`, function () {
		labelElement.innerHTML = `<img src="${this.result}" />`;
	});

	e.target.addEventListener(`click`, function (e) {
		e.preventDefault();
	});
}

function displayLabel() {
	let found = false;

	imageLabels.forEach(function (imageLabel, index) {
		imageLabel.childNodes.forEach(function (childNode) {
			if (childNode.tagName !== `IMG` && !found) {
				found = true;
				imageLabels[index + 1].style.display = `block`;
			}
		});
	});
}

for (let i = 0; i < landenContinenten.length; i++) {
	continenten[0].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[0].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[0].style.display = `flex`;
	});

	continenten[1].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[1].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[1].style.display = `flex`;
	});

	continenten[2].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[2].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[2].style.display = `flex`;
	});

	continenten[3].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[3].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[3].style.display = `flex`;
	});

	continenten[4].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[4].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[4].style.display = `flex`;
	});

	continenten[5].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[5].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[5].style.display = `flex`;
	});

	continenten[6].addEventListener(`click`, function () {
		continenten[i].classList.remove(`checked`);
		continenten[6].classList.add(`checked`);
		landenContinenten[i].style.display = `none`;
		landenContinenten[6].style.display = `flex`;
	});
}

if (geenVoorkeurInputs[0]) {
	geenVoorkeurInputs[0].addEventListener(`click`, function () {
		chooseSelects[0].toggleAttribute(`disabled`);
	});
}
if (geenVoorkeurInputs[1]) {
	geenVoorkeurInputs[1].addEventListener(`click`, function () {
		chooseSelects[1].toggleAttribute(`disabled`);
	});
}
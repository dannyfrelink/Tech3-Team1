/* eslint-disable no-undef */

const inputFile = document.querySelector('input[type="file"]');
const imgPreview = document.querySelector('form div:first-of-type label:first-of-type');

inputFile.addEventListener('change', function () {
	previewImage();
});

function previewImage() {
	const files = inputFile.files[0];
	if (files) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(files);
		fileReader.addEventListener('load', function () {
			// imgPreview.style.display = 'block';
			imgPreview.innerHTML = `<img src="${this.result}" />`;
		});   

		imgPreview.addEventListener('click', function (e) {
			e.preventDefault();
		});
	}
}

const inputFileAdded = document.querySelector('.profileAdded input[type="file"]');
const changePhoto = document.querySelector('form.profileAdded div:first-of-type label:last-of-type');

changePhoto.addEventListener('click', function () {
	inputFileAdded.style.display = 'block';
});
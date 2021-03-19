/* eslint-disable no-undef */

// const imageInput = document.querySelector('input[type="file"]');

// imageInput.addEventListener('change', function (e) {
// 	displayImage(e);
// });

// function displayImage(e) {
// 	const labelElement = document.querySelector(`[for = "${e.target.id}"]`);

// 	const fileReader = new FileReader();
// 	fileReader.readAsDataURL(files);
// 	fileReader.addEventListener('load', function () {
// 		labelElement.innerHTML = `<img src="${this.result}" />`;
// 	});

	// e.target.addEventListener('click', function (e) {
	// 	e.preventDefault();
	// });
// }





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
			imgPreview.style.display = 'block';
			imgPreview.innerHTML = `<img src="${this.result}" />`;
		});   

		imgPreview.addEventListener('click', function (e) {
			e.preventDefault();
		});
	}
}
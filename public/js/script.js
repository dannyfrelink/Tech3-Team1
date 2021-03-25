
// filter page show

const filterButton = document.querySelector('.filter-button');

if (filterButton){
	filterButton.addEventListener('click', filterSlide);
}

function filterSlide () {
  const filter = document.querySelector('.filters-hidden');
  filter.classList.add('filters-show');
};

// filter page hide

const closeFilterButton = document.querySelector('.close-filter');

if (closeFilterButton){
	closeFilterButton.addEventListener('click', closeFilterScreen);
}
function closeFilterScreen () {
  const filter = document.querySelector('.filters-hidden');
  filter.classList.remove('filters-show');
};


/* eslint-disable no-undef */

const inputFile = document.querySelector('input[type="file"]');
const imgPreview = document.querySelector('form div:first-of-type label:first-of-type');


if (inputFile){
	inputFile.addEventListener('change', function () {
		previewImage();
	});
}

function previewImage() {
	const files = inputFile.files[0];
	if (files) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(files);
		fileReader.addEventListener('load', function () {
			imgPreview.innerHTML = `<img src="${this.result}" />`;
		});   

		imgPreview.addEventListener('click', function (e) {
			e.preventDefault();
		});
	}
}


// filter page show

const filterButton = document.querySelector('.filter-button')

filterButton.addEventListener('click', filterSlide)

function filterSlide () {
  const filter = document.querySelector('.filters-hidden')
  filter.classList.add('filters-show')
}

// filter page hide

const closeFilterButton = document.querySelector('.close-filter')

closeFilterButton.addEventListener('click', closeFilterScreen)

function closeFilterScreen () {
  const filter = document.querySelector('.filters-hidden')
  filter.classList.remove('filters-show')
}

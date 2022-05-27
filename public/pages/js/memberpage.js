const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const Index_url = BASE_URL + '/api/v1/users/'

const peopleInfo = []
let filteredPeople = []
const peopleCards = document.querySelector('.people-cards')
const favorite = document.querySelector('.favorite')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const list = JSON.parse(localStorage.getItem('favoritePeople')) || []
const PER_PAGE = 30

function renderPeopleCards(data) {
  let rawHtml = ''

  data.forEach(item => {
    rawHtml += `
      <div class="people-card m-2 mx-3 border border-dark rounded-lg p-3">
        <a class="avatar" style="cursor: pointer" data-toggle="modal"  data-target="#personInfoModal" data-id="${item.id}">
          <img class="border border-primary rounded-circle img-thumbnail " src="${item.avatar}" />
        </a>
        <div class="name text-center m-2">
            <small class="card-title font-weight-bolder ">${item.name}</small>
            <i class="far fa-heart text-danger favorite float-right mt-1" style="cursor: pointer" data-id="${item.id}"></i>
        </div>
      </div>
    `
  })
  peopleCards.innerHTML = rawHtml
  favoriteButton()
}

axios.get(Index_url).then(response => {
  peopleInfo.push(...response.data.results)
  renderPaginator(peopleInfo.length)
  renderPeopleCards(getPeopleByPage(1))
})
  .catch(error => console.log('error'))

// show info
function showInfoModal(id) {
  axios.get(Index_url + id).then(response => {
    const data = response.data

    const modalInfoList = document.querySelector('.modal-info-list')
    modalInfoList.innerHTML = `
      <li>Id: ${data.id}</li>
      <li>Name: ${data.name} ${data.surname}</li>
      <li>Email: ${data.email}</li>
      <li>Gender: ${data.gender}</li>
      <li>Age: ${data.age}</li>
      <li>Region: ${data.region}</li>
    `
  })
}

// favorite save in local storage
function addToFavorite(id) {
  const people = peopleInfo.find((people) => people.id === id)

  if (list.some((people) => people.id === id )) {
    return;
  }
  list.push(people)
  localStorage.setItem('favoritePeople',JSON.stringify(list))
}

//function remove form favorite
function removeFavorite(id) {
  const people = list.findIndex((people) => people.id === id)
  list.splice(people, 1)
  localStorage.setItem('favoritePeople',JSON.stringify(list))
}

//function check in favorite
function checkFavorite(id,target) {
  const people = peopleInfo.find((people) => people.id === id)
  if (list.some((people) => people.id === id )) {
    removeFavorite(id)
    alert ('取消收藏')
  } else {
    addToFavorite(id);
    alert ('成功收藏')
  }
}

// function favorite button active
function favoriteButton() {
  const favoriteBtn = document.querySelectorAll(".far")
  
  favoriteBtn.forEach(btn => {
    if (list.some(people => people.id == btn.dataset.id)) {
    btn.classList.add("fa")
   } else {
    btn.classList.remove("fa")
   }
  })
}


// page
function getPeopleByPage(page) {
  const data = filteredPeople.length ? filteredPeople : peopleInfo
  const startIndex = (page - 1) * PER_PAGE
  return data.slice(startIndex, startIndex + PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / PER_PAGE)

  let rawHTML = ''

  for (let page = 1; page <= numberOfPages; page++)
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  
    paginator.innerHTML = rawHTML
    paginator.firstElementChild.classList.add('active')

}

// paginator button
paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return

  const page = Number(event.target.dataset.page)
  renderPeopleCards(getPeopleByPage(page))
  
  for (let li of paginator.children) { 
  li.classList.remove('active') }
  event.target.parentElement.classList.add('active')
})


// favorite & info button
peopleCards.addEventListener('click', function avatarClick(event) {
  if (event.target.tagName === 'IMG') {
    const id = event.target.parentElement.dataset.id
    showInfoModal(id)
  } 
  if (event.target.tagName === 'I') {
    const id = Number(event.target.dataset.id)
    const target = event.target;
    checkFavorite(id,target)
    favoriteButton()
  } 
})


// search button
searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  
  const keyword = searchInput.value.trim().toLowerCase()

  filteredPeople = peopleInfo.filter((people) => people.name.toLowerCase().includes(keyword))

  if (filteredPeople.length === 0 || keyword.length === 0) {
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件`)
  }

  renderPaginator(filteredPeople.length)
  renderPeopleCards(getPeopleByPage(1))
})



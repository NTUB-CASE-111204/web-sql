const BASE_URL = 'httpslighthouse-user-api.herokuapp.com'
const Index_url = BASE_URL + 'apiv1users'
const peopleInfo = JSON.parse(localStorage.getItem('favoritePeople'))  []
const peopleCards = document.querySelector('.people-cards')
const favorite = document.querySelector('.favorite')


function renderPeopleCards(data) {
  let rawHtml = ''

  data.forEach(item = {
    rawHtml += `
      div class=people-card m-2 mx-3 border border-dark rounded-lg p-3
        a class=avatar style=cursor pointer data-toggle=modal  data-target=#personInfoModal data-id=${item.id}
          img class=border border-primary rounded-circle img-thumbnail  src=${item.avatar} 
        a
        div class=name text-center m-2
            small class=card-title font-weight-bolder h6${item.name}small
            i class=far fa-heart fa text-danger remove-favorite float-right mt-1 style=cursor pointer data-id=${item.id}i
        div
      div
    `
  })
  peopleCards.innerHTML = rawHtml
}

 show info
function showInfoModal(id) {
  axios.get(Index_url + id).then(response = {
    const data = response.data

    const modalInfoList = document.querySelector('.modal-info-list')
    modalInfoList.innerHTML = `
      liId ${data.id}li
      liName ${data.name}li
      liSurname ${data.surname}li
      liEmail ${data.email}li
      liGender ${data.gender}li
      liAge ${data.age}li
      liRegion ${data.region}li
      liBirthday ${data.birthday}li
      liAvatar - a href=${data.avatar} target=_blank${data.avatar}ali
    `
  })
}

 favorite in local storage
function removeFromFavorite(id) {
  if(!peopleInfo) return

  const peopleIndex = peopleInfo.findIndex((people) = people.id === id)
  if (peopleIndex === -1) return

  peopleInfo.splice(peopleIndex,1)

  localStorage.setItem('favoritePeople',JSON.stringify(peopleInfo))

  renderPeopleCards(peopleInfo)
}


 favorite & info button
peopleCards.addEventListener('click', function avatarClick(event) {
  if (event.target.tagName === 'IMG') {
    const id = event.target.parentElement.dataset.id
    showInfoModal(id)
  } else if (event.target.matches('.remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

renderPeopleCards(peopleInfo)
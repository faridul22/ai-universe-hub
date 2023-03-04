const loadAllData = (dataLimit) => {
  fetch(` https://openapi.programming-hero.com/api/ai/tools`)
    .then(response => response.json())
    .then(data => displayAllData(data.data.tools, dataLimit))
  toggleSpinner(true);
}

const displayAllData = (data, dataLimit) => {
  if (dataLimit && data.length > 6) {
    data = data.slice(0, 6)
  }
  else {
    const seeMore = document.getElementById('see-more-btn');
    seeMore.classList.add('d-none')
  }

  const cardSectionContainer = document.getElementById('card-section-container');
  cardSectionContainer.textContent = '';
  data.forEach(singleUi => {
    console.log(singleUi)
    const { image, features, name, published_in
    } = singleUi;
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col');
    cardContainer.innerHTML = `
        <div class="card h-100 p-3">
          <img src="${image}" class="card-img-top rounded-3" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol class="text-muted">
                <li>${features[0]}</li>
                <li>${features[1]}</li>
                <li>${features[2] ? features[2] : 'No data available'}</li>
             </ol>
          </div>
          <hr class="m-0">
          <div class="d-flex justify-content-between align-items-center mt-3 m-2">
             <div>
                   <h5>${name}</h5>
                   <small class="text-muted"><i class="fa-regular fa-calendar-days"></i> ${published_in}</small>
             </div>
             <div>
                <span class="bg-light-subtle text-danger rounded-circle px-2 py-1"><i class="fa-solid fa-arrow-right"></i></span>
             </div>
          </div>
        </div>
        `;
    cardSectionContainer.appendChild(cardContainer)
  })
  toggleSpinner(false)
}

// see more event handler
document.getElementById('see-more-btn').addEventListener('click', function () {
  loadAllData()
})

// Toggle spinner
const spinner = document.getElementById('spinner');
const toggleSpinner = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove('d-none')
  }
  else {
    spinner.classList.add('d-none')
  }
}

loadAllData(6)
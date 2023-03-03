const loadAllData = () => {
  fetch(` https://openapi.programming-hero.com/api/ai/tools`)
    .then(response => response.json())
    .then(data => displayAllData(data.data.tools))
}

const displayAllData = (data) => {
  // console.log(data)
  const cardSectionContainer = document.getElementById('card-section-container');
  data.forEach(singleUI => {
    console.log(singleUI)
    const { image, features, name, published_in
    } = singleUI;
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
                <li>${features[2]}</li>
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

}
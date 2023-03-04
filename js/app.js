const loadAllData = (dataLimit, sort) => {
  fetch(` https://openapi.programming-hero.com/api/ai/tools`)
    .then(response => response.json())
    .then(data => displayAllData(data.data.tools, dataLimit, sort))
  toggleSpinner(true);
}

// sort by date
document.getElementById('sorting-btn').addEventListener('click', function () {
  loadAllData(false, true)
})

const displayAllData = (data, dataLimit, sort) => {
  if (dataLimit && data.length > 6) {
    data = data.slice(0, 6)
  }
  else {
    const seeMore = document.getElementById('see-more-btn');
    seeMore.classList.add('d-none')
  }


  if (sort) {
    data.sort((a, b) => new Date(a.published_in).getTime() - new Date(b.published_in).getTime())
  }


  const cardSectionContainer = document.getElementById('card-section-container');
  cardSectionContainer.textContent = '';


  data.forEach(singleUi => {
    const { image, features, name, published_in, id
    } = singleUi;
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col');
    cardContainer.innerHTML = `
        <div class="card h-100 p-3">
          <img src="${image}" class="card-img-top rounded-3" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol class="text-muted">
                <li>${features[0] ? features[0] : 'No data available'}</li>
                <li>${features[1] ? features[1] : 'No data available'}</li>
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
                <span onclick="loadSingleCardDetails('${id}')" class="bg-light-subtle text-danger rounded-circle px-2 py-2" data-bs-toggle="modal" data-bs-target="#cardDetailsModal">
                <i class="fa-solid fa-arrow-right"></i>
                </span>
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




// card details event handler
const loadSingleCardDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displaySingleCardDetails(data.data)
}

const displaySingleCardDetails = (data) => {
  console.log(data)
  const { description, pricing, image_link, features, integrations, input_output_examples, accuracy } = data
  const modalContainer = document.getElementById('modal-body');
  modalContainer.textContent = '';




  const modalBody = document.createElement('div');
  modalBody.classList.add('row');
  modalBody.innerHTML = `
  <div class="col-sm-12 col-md-6 border border-danger rounded-2 p-2 bg-danger-subtle ">
      <h6>${description ? description : 'No data found'}</h6>
      <div class="row">
          <div class="col-md-4">
              <p class="bg-light rounded-2 p-2 text-primary">${pricing?.[0].price ? pricing[0].price : 'Free of cost'} <br>${pricing?.[0].plan ? pricing[0].plan : ''}</p>
          </div>
          <div class="col-md-4">
              <p class="bg-light rounded-2 p-2 text-warning">${pricing?.[1].price ? pricing[1].price : 'Free of cost'} ${pricing?.[1].plan ? pricing[1].plan : ''}<br> </p>
          </div>
          <div class="col-md-4">
              <p class="bg-light rounded-2 p-2 text-info">${pricing?.[2].price ? pricing[2].price : 'Free of cost'} ${pricing?.[2].plan ? pricing[2].plan : ''}</p>
          </div>
      </div>
      <div class="row">
            <div class="col-md-6">
               <h5>Features</h5>
               <ul>
                  <li>${features?.[1].feature_name}</li>
                  <li>${features?.[2].feature_name}</li>
                  <li>${features?.[3].feature_name}</li>
               </ul>
            </div>
            <div class="col-md-6"> 
               <h5>Integrations</h5>
               <ul>
                <li>${integrations?.[0] ? integrations?.[0] : 'No data found'}</li>
                <li>${integrations?.[1] ? integrations?.[1] : 'No data found'}</li>
                <li>${integrations?.[2] ? integrations?.[2] : 'No data found'}</li>
               </ul>
            </div>
        </div>
  </div>
  <div class="col-sm-12 col-md-6 card mx-auto p-3">
      <img class="img-fluid rounded-2 " style="height:400px" src=${image_link?.[0] ? image_link[0] : 'No data found'} alt="">
      <h5 class="text-center mt-2">${input_output_examples?.[0].input ? input_output_examples?.[0].input : 'Can you give any example?'}</h5>
      <small class="text-muted text-center">${input_output_examples?.[0].output ? input_output_examples?.[0].output : 'No! Not Yet! Take a break!!!'}</small>

      <button id="accuracy-btn" class="w-50 border-0 bg-danger text-light rounded-4">${accuracy?.score ? accuracy?.score + ' accuracy' : ''}</button>
      
  </div>
  `;
  modalContainer.appendChild(modalBody)
}


loadAllData(6)


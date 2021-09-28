import View from './../View.js';

class PersonalDetalView extends View {
  _parentElement = document.querySelector('.about-me--content');

  addHandlerRender(handler) {
    handler();
  }

  _generateSkeletonMarkup() {
    return `
    <div class="entity skeleton">
      <div class="skeleton-text w-half"></div>
    </div>
    `;
  }

  _generateMarkup() {
    return `
    <div class="entity text-weight-bold">
	 		<p class="key">First Name</p>
	 		<p class="value">${this._data.user.first_name}</p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">Last Name</p>
	 		<p class="value">${this._data.user.last_name}</p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">DOC</p>
	 		<p class="value">${this._data.date_of_birth}</p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">Age</p>
	 		<p class="value">${this._data.other_info.age}</p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">Nationality</p>
	 		<p class="value">${this._data.other_info.address.nationality}</p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">Address</p>
	 		<p class="value">
       <a href="${this._data.other_info.address.url}" class="link" target="_blank">${this._data.other_info.address.locality}</a>
      </p>
	 	</div>
    <div class="entity text-weight-bold">
     <p class="key">Phone</p>
     <p class="value">
      <a href="${this._data.other_info.phone.url}" class="link" target="_blank">${this._data.other_info.phone.value}</a>
     </p>
    </div>
    <div class="entity text-weight-bold">
	 		<p class="key">Email</p>
	 		<p class="value">
       <a href="mailto:${this._data.user.email}" class="link" target="_blank">${this._data.user.email}</a>
      </p>
	 	</div>
    <div class="entity text-weight-bold">
	 		<p class="key">Languages</p>
	 		<p class="value">English, Hindi, Odiya</p>
	 	</div>
    `;
  }
}

export default new PersonalDetalView();

/*

{
  "id": "12194654-1074-46fa-a994-d18e6bc777e5",
  "user": {
      "email": "mohitkumar.b3399@gmail.com",
      "username": "mohit3399",
      "first_name": "Mohit",
      "last_name": "Kumar"
  },
  "other_info": {
      "age": 21,
      "address": {
          "nationality": "India",
          "locality": "Paradeep, Odisha",
          "url": "https://goo.gl/maps/rfEktawiTEQePXsi6"
      },
      "phone": {
          "value": "98610 13399",
          "url": "tel:9861013399"
      }
  },
  "date_of_birth": "2000-10-08",
  "cv": "/uploads/uploads/blockchain.pdf"
}

*/

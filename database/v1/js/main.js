(() => {
	const modalLinks = document.querySelectorAll('[data-modal]');
	const billingSameAsShipping = document.querySelectorAll('[name="billingSameAsShipping"]');
	const packages = document.querySelectorAll('[data-product]');

	// Setup modal links

	for (key = 0; key < modalLinks.length; key++) {
		modalLinks[key].addEventListener('click', (event) => {
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			openModal(event.target.href);
		});
	}

	// Setup billingSameAsShipping

	for (key = 0; key < billingSameAsShipping.length; key++) {
		billingSameAsShipping[key].addEventListener('click', (event) => {
			if (event.target.checked && event.target.value == 'no') {
				document.querySelector('.billing-info').className = 'billing-info';

				let billingInfoElems = document.querySelectorAll('.billing-info input, .billing-info select');

				for (let key = 0; key < billingInfoElems.length; key++) {
					billingInfoElems[key].classList.add('required');
					billingInfoElems[key].setAttribute('required', '');
				}
			} else {
				document.querySelector('.billing-info').className = 'billing-info is--hidden';

				let billingInfoElems = document.querySelectorAll('.billing-info input, .billing-info select');

				for (let key = 0; key < billingInfoElems.length; key++) {
					billingInfoElems[key].classList.remove('required');
					billingInfoElems[key].removeAttribute('required');
				}
			}
		});
	}

	// Setup product packages

	for (key = 0; key < packages.length; key++) {
		packages[key].addEventListener('click', function () {
			packages.forEach(function (package) {
				if (package.className.search('active') != -1) {
					package.classList.remove('active');
				}
			});

			this.classList.add('active');

			if (this.className.search('active') != -1) {
				this.querySelector('[name="product_selection"]').checked = true;
			}
		});
	}
})();

/**
 * Opens a modal window for displaying iframe content
 *
 * @param {String} url - URL of the page to display
 */

function openModal(url) {
	let iframe = document.createElement('iframe');
	let overlay = document.createElement('div');
	let modal = document.createElement('div');
	let closeButton = document.createElement('button');

	overlay.className = 'overlay';
	overlay.addEventListener('click', () => {
		document.body.removeChild(document.querySelector('.overlay'));
		document.body.removeChild(document.querySelector('.modal'));
	});

	modal.addEventListener('click', (event) => {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	});

	modal.className = 'modal';

	iframe.src = url;

	closeButton.setAttribute('type', 'button');
	closeButton.innerHTML = '<span class="fa fa-close"></span>';
	closeButton.addEventListener('click', () => {
		document.body.removeChild(document.querySelector('.overlay'));
		document.body.removeChild(document.querySelector('.modal'));
	});

	modal.appendChild(iframe);
	modal.appendChild(closeButton);
	document.body.appendChild(overlay);
	document.body.appendChild(modal);
}
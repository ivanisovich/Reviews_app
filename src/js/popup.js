import { loadDataFromStorage } from './storage';
import unixToDateStr from './date';

const popup = document.querySelector('#review');
const popupForm = document.querySelector('#popup-form');
const title = popup.querySelector('#popup-header');
const popupContent = document.querySelector('#popup-content');

function clearPopup() {
    title.childNodes[0].textContent = '-';
    popupContent.innerText = '';
}

function showEmptyPopup(point, address = '') {

    clearPopup();
    title.childNodes[0].textContent = address;
    popupContent.innerText = 'Отзывов пока нет ...';
    popup.classList.remove('hidden');
    popupForm.point = point;
}

function showPopupWithReviews(point) {

    clearPopup();

    let markers = loadDataFromStorage();
    let addressFilled = false;
    let innerHTML = '<ul>';

    markers.forEach(marker => {
        
        if (equalCoords(marker.point, point)) {

            innerHTML += `<li><span>${marker.name}</span>`;
            innerHTML += `<p>Локация</p>`;
            innerHTML += `<p>${marker.place}</p>`;
            innerHTML += `<p>Комментарий</p>`;
            innerHTML += `<p>${marker.comment}</p>`;
            innerHTML += `<p>${unixToDateStr(marker.timestamp)}</p></li>`;
            if (!addressFilled) {
                title.childNodes[0].textContent = marker.address;
                addressFilled = true;
            }
        }
    });
    innerHTML += '</ul>';

    popupContent.innerHTML = innerHTML;
    popup.classList.remove('hidden');
    popupForm.point = point;

   
}

function hidePopup() {
    popup.classList.add('hidden');

}

function equalCoords(point1, point2) {
    return ((Math.abs(point1[0] - point2[0]) < 0.000000001) && (Math.abs(point1[1] - point2[1]) < 0.000000001));
}

export {
    showEmptyPopup,
    showPopupWithReviews,
    hidePopup
};

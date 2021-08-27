import './css/main.css';

import { INIT_MAP } from './js/settings';
import getGeoObject from './js/geocoder';
import createClusterer from './js/clusterer';
import { loadDataFromStorage } from './js/storage';
import addMarkerToMap from './js/marker';
import { showEmptyPopup, hidePopup } from './js/popup';
import submitHandler from './js/submit';

/* ------------------------------- */

const init = () => {
    const yaMap = new ymaps.Map('ymaps', INIT_MAP);
    const yaClusterer = createClusterer(yaMap);

    const popupForm = document.querySelector('#popup-form');

    popupForm.map = yaMap;
    popupForm.clusterer = yaClusterer;
    popupForm.addEventListener('submit', submitHandler);
    

    yaMap.events.add('click', e => {
        const coords = e.get('coords');
        
        getGeoObject(coords)
            .then( geoObj => {
                popupForm.point = coords;
                showEmptyPopup(coords, geoObj.description+', '+geoObj.name);
            })
            .catch( () => {
                console.error('getGeoObject error');
            });
    });

    let markers = loadDataFromStorage();

    markers.forEach(marker => {
        addMarkerToMap(yaMap, yaClusterer, marker);
    });

    document.querySelector('#close-popup').addEventListener('click', hidePopup);
    
    
    
}

/* ------------------------------- */

ymaps.ready(init);

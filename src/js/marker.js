import { showPopupWithReviews } from './popup';

export default function addMarkerToMap(map, clusterer, reviewData) {

    const marker = new ymaps.Placemark(reviewData.point, {
        
        balloonContentPoint: reviewData.point.toString(),
        balloonContentAddress: reviewData.address,
        
    });

    map.geoObjects.add(marker);

    clusterer.add(marker);

    marker.events.add('click', (e) => {
        e.preventDefault();
        showPopupWithReviews(reviewData.point);
    });
}

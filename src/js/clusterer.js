import makeBalloonTemplate from '../hbs/balloon.hbs';
import { showPopupWithReviews } from './popup';

export default function createClusterer(map) {

    const customClusterBalloonContent = ymaps.templateLayoutFactory.createClass(
        makeBalloonTemplate('$[(properties)]')
    );

    const clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        openBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customClusterBalloonContent,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 160,
        clusterBalloonPagerSize: 10
    });

    map.geoObjects.add(clusterer);

    const onBalloonLinkClick = (e) => {
        console.log(e.target.className);
        if ((document.querySelector("#balloon-link")) && (e.target.className) && (e.target.className === "ymaps-2-1-79-events-pane ymaps-2-1-79-user-selection-none")) {
                console.log("123");
                e.preventDefault();
                let pointData = document.querySelector("#balloon-link").getAttribute("data-point").split(',');
                let point = pointData.map(Number);
                
                showPopupWithReviews(point);
                map.balloon.close();
            
        }
     
    };
    
    document.addEventListener('click', onBalloonLinkClick);
    
    return clusterer;
}

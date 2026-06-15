// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ мобильное меню
const mMenu = ()=> {
    document.querySelector('.js-mMenuOpen').addEventListener('click', function(){
        document.querySelector('.header__nav').classList.add('is-open')
    })
    document.querySelector('.js-mMenuClose').addEventListener('click', function(){
        document.querySelector('.header__nav').classList.remove('is-open')
    })

    const subMenuToggleIcons = document.querySelectorAll('.js-subMenuOpen')
    subMenuToggleIcons.forEach(item => {
        item.addEventListener('click', function(){
            item.nextElementSibling.classList.toggle('is-open')
            item.previousElementSibling.classList.toggle('is-open')
            this.classList.toggle('is-open')
        })
    })

}

// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
// $(document).ready(function () {
//     $(".js-maskPhone").inputmask({
//         mask: "+7 999 999 99 99",
//         clearIncomplete: true
//     });
//     $('.email').inputmask({
//         mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
//         clearIncomplete: true
//     //     greedy: false,
//     //     onBeforePaste: function (pastedValue, opts) {
//     //         pastedValue = pastedValue.toLowerCase();
//     //         return pastedValue.replace("mailto:", "");
//     //     },
//     //     definitions: {
//     //         '*': {
//     //             validator: "[0-9A-Za-z-а-я-]",
//     //             casing: "lower"
//     //         }
//     //     }
//     });
//     $(".js-maskDate").inputmask({
//         mask: "99/99/9999",
//         clearIncomplete: true,
//         'placeholder': 'dd/mm/yyyy'
//     });
// });

// ================================================== СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const swiper = new Swiper('.js-catalogSlider', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: '.slider-navigation',
        clickable: true
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        769: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        961: {
            slidesPerView: 4,
            spaceBetween: 30
        }
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const filter = ()=> {
    const btns = document.querySelectorAll('.js-rangeToggle')
    btns.forEach(item => {
        item.addEventListener('click', function(){
            item.closest('.parameter').classList.toggle('is-active')
        })
    })
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const galleryProduct = ()=> {
    const thumb = document.querySelectorAll('.js-galleryProduct')
    thumb[0].closest('.product-thumbnails__item').classList.add('active')

    document.querySelector('.product-thumbnails').addEventListener('click', function(e){
        let target = e.target
        thumb.forEach(item => {
            const itsThumb = target == item || item.contains(target)
            const itsSrcPath = item.getAttribute('src')
            if(itsThumb){
                item.closest('.product-thumbnails__item').classList.add('active')
                document.querySelector('.product-foto__img').setAttribute('src', itsSrcPath)
            } else {
                item.closest('.product-thumbnails__item').classList.remove('active')
            }
        })
    })

}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
    function hideContent(){
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    if(document.documentElement.clientWidth < 760){
        header.addEventListener('click', (e) => {
            header.classList.add('is-open')
            let itsActiveHeader = header.classList.contains('is-open'),
                firstEl = e.target == document.querySelector('.active-tab')
            if(itsActiveHeader && firstEl){
                header.style.maxHeight = header.scrollHeight + 'px'
            } else if(!firstEl){
                header.classList.remove('is-open')
                header.style.maxHeight = '40px'
            }
        })
    }
    
    function showContent(i){
        content[i].style.display = 'block'
        tab[i].classList.add(activeClass)
        if(document.documentElement.clientWidth < 760){
            let temp = tab[i]
            header.prepend(temp)
        }
    }
    
    header.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        if( target && (target.classList.contains(tabSelector.replace(/\./,"")) ||  target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
            tab.forEach((item, i) => {
                if(target == item || target.parentNode == item){
                    hideContent();
                    showContent(i);
                }
            })
        }
    })

    hideContent()
    showContent(0)

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = ()=> {
    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 1000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.777586, 37.604116],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.777586, 37.604116], {
                balloonContent: '<strong>127006, Москва, ул. Долгоруковская, д. 36, с. 3, этаж 6</strong>',
                iconCaption: 'ул. Долгоруковская, д. 36, с. 3'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 2000);
}
  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
mMenu()
filter()
if(document.querySelector('.product__gallery')){
    galleryProduct()
}
if(document.querySelector('.tabs')){
    tabs('.tabs__buttons', '.tabs__button', '.tabs__content', 'active-tab');
}
if(document.querySelector('#map')){
    map()
}
    



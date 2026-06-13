const tabs = document.querySelectorAll('.brand-tab');
const panels = document.querySelectorAll('.brand-panel');
const placeholder = document.querySelector('.brand-placeholder');

const categoryOrder = [
    'oem',
    'bearings',
    'lubricants',
    'filters',
    'brakes',
    'electrical',
    'suspension',
    'transmission'
];
let currentCategoryIndex = 0;
const categoryLabel =
document.getElementById('currentCategoryLabel');

const prevButton =
document.getElementById('prevCategory');

const nextButton =
document.getElementById('nextCategory');

function activateCategory(index){

    tabs.forEach(tab =>
        tab.classList.remove('active')
    );

    panels.forEach(panel =>
        panel.classList.remove('active')
    );

    currentCategoryIndex = index;

    tabs[index].classList.add('active');

    document
        .getElementById(
            categoryOrder[index]
        )
        .classList.add('active');

    if(placeholder){

        placeholder.classList.add('hidden');
    }

if(categoryLabel){

    categoryLabel.textContent =
        tabs[index].innerText
        .replace(/\d+/g,'')
        .trim();

}

tabs.forEach(tab => {

    tab.addEventListener('click', () => {

        activateCategory(
            [...tabs].indexOf(tab)
        );

    });

});

const search = document.getElementById('brandSearch');

if(search){

search.addEventListener('keyup', ()=>{

const term = search.value.toLowerCase();

document.querySelectorAll('.brand-card')
.forEach(card=>{

const brand =
card.dataset.brand.toLowerCase();

card.style.display =
brand.includes(term)
? ''
: 'none';

});

});

}
if(prevButton){

    prevButton.addEventListener(
        'click',
        ()=>{

            if(currentCategoryIndex < 0){

                currentCategoryIndex = 0;
            }

            currentCategoryIndex--;

            if(currentCategoryIndex < 0){

                currentCategoryIndex =
                categoryOrder.length - 1;
            }

            activateCategory(
                currentCategoryIndex
            );

        }
    );
}

if(nextButton){

    nextButton.addEventListener(
        'click',
        ()=>{

            if(currentCategoryIndex < 0){

                currentCategoryIndex = 0;
            }

            currentCategoryIndex++;

            if(
                currentCategoryIndex >=
                categoryOrder.length
            ){

                currentCategoryIndex = 0;
            }

            activateCategory(
                currentCategoryIndex
            );

        }
    );
}

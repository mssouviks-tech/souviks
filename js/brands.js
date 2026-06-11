const tabs = document.querySelectorAll('.brand-tab');
const panels = document.querySelectorAll('.brand-panel');

tabs.forEach(tab => {

    tab.addEventListener('click', () => {

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');

        document
            .getElementById(tab.dataset.category)
            .classList.add('active');

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
? 'flex'
: 'none';

});

});

}

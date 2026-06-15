let allProducts = [];

let selectedCategory = '';
let selectedBrand = '';

const productGrid =
document.getElementById('productGrid');

const categoryList =
document.getElementById('categoryList');

const featuredCategories =
document.getElementById('featuredCategories');

const brandFilter =
document.getElementById('brandFilter');

const searchInput =
document.getElementById('searchInput');

async function loadProducts(){

    try{

        const response =
        await fetch('assets/data/products.json');

        allProducts =
        await response.json();

        initializeFilters();

        readUrlParameters();

        renderProducts();

    }

    catch(error){

        console.error(
            'Unable to load products:',
            error
        );

    }

}

function initializeFilters(){

    createBrandDropdown();

    createCategories();

    attachEvents();

}

function createBrandDropdown(){

    const brands =
    [...new Set(
        allProducts.map(
            product => product.brand
        )
    )].sort();

    brands.forEach(brand => {

        const option =
        document.createElement('option');

        option.value = brand;

        option.textContent = brand;

        brandFilter.appendChild(option);

    });

}

function createCategories(){

    const categories =
    [...new Set(
        allProducts.map(
            product => product.category
        )
    )].sort();

    categoryList.innerHTML = '';

    featuredCategories.innerHTML = '';

    categories.forEach(category => {

        const sidebarItem =
        document.createElement('button');

        sidebarItem.className =
        'category-item';

        sidebarItem.textContent =
        category;

        sidebarItem.addEventListener(
            'click',
            () => {

                selectedCategory =
                category;

                renderProducts();

                updateCategoryState();

            }
        );

        categoryList.appendChild(
            sidebarItem
        );

        const card =
        document.createElement('div');

        card.className =
        'featured-category-card';

        card.innerHTML = `
            <h3>${category}</h3>
        `;

        card.addEventListener(
            'click',
            () => {

                selectedCategory =
                category;

                renderProducts();

                updateCategoryState();

            }
        );

        featuredCategories.appendChild(
            card
        );

    });

}

function attachEvents(){

    brandFilter.addEventListener(
        'change',
        () => {

            selectedBrand =
            brandFilter.value;

            renderProducts();

        }
    );

    searchInput.addEventListener(
        'input',
        renderProducts
    );

}

function renderProducts(){

    let filtered =
    [...allProducts];

    if(selectedCategory){

        filtered =
        filtered.filter(
            product =>
            product.category ===
            selectedCategory
        );

    }

    if(selectedBrand){

        filtered =
        filtered.filter(
            product =>
            product.brand ===
            selectedBrand
        );

    }

    const searchTerm =
    searchInput.value
    .toLowerCase()
    .trim();

    if(searchTerm){

        filtered =
        filtered.filter(
            product =>

            product.name
            .toLowerCase()
            .includes(searchTerm)

            ||

            product.partNumber
            .toLowerCase()
            .includes(searchTerm)

            ||

            product.brand
            .toLowerCase()
            .includes(searchTerm)
        );

    }

    productGrid.innerHTML = '';

    filtered.forEach(product => {

        const card =
        document.createElement('div');

        card.className =
        'product-card';

        card.innerHTML = `

            <div class="product-brand">

                <img
                    src="${product.brandLogo}"
                    alt="${product.brand}"
                >

            </div>

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

            <div class="product-content">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    <strong>Brand:</strong>
                    ${product.brand}
                </p>

                <p>
                    <strong>Part Number:</strong>
                    ${product.partNumber}
                </p>

                <a
                    href="${product.productPage}"
                    class="product-link"
                >
                    View Details →
                </a>

            </div>

        `;

        productGrid.appendChild(
            card
        );

    });

}

function updateCategoryState(){

    document
    .querySelectorAll(
        '.category-item'
    )
    .forEach(item => {

        item.classList.remove(
            'active'
        );

        if(
            item.textContent ===
            selectedCategory
        ){

            item.classList.add(
                'active'
            );

        }

    });

}

function readUrlParameters(){

    const params =
    new URLSearchParams(
        window.location.search
    );

    const category =
    params.get('category');

    const brand =
    params.get('brand');

    if(category){

        selectedCategory =
        category;

    }

    if(brand){

        selectedBrand =
        brand;

        brandFilter.value =
        brand;

    }

}

loadProducts();

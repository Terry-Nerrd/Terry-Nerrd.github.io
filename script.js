let allProducts = [];

// 1. Fetch Catalog
async function loadCatalog() {
    try {
        const res = await fetch('catalog.json');
        if (!res.ok) throw new Error('Could not find catalog.json');
        allProducts = await res.json();
        renderProducts(allProducts);
    } catch (e) { 
        console.error("Load error", e);
        document.getElementById('cologne-catalog').innerHTML = "<p>Loading colognes... Please check back soon!</p>";
    }
}

function renderProducts(items) {
    const container = document.getElementById('cologne-catalog');
    if (items.length === 0) {
        container.innerHTML = "<p>No colognes found matching your search. 🔍</p>";
        return;
    }
    container.innerHTML = items.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
            <button class="buy-btn" onclick="alert('Order Feature Coming Soon for ${item.name}!')">GET IT NOW 🛒</button>
        </div>
    `).join('');
}

// 2. Optimized Search Logic
const searchInput = document.getElementById('cologne-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });
}

// 3. Clerk Auth Management
window.addEventListener('load', async () => {
    try {
        await Clerk.load();
        const authDiv = document.getElementById('user-auth-ui');
        if (Clerk.user) {
            Clerk.mountUserButton(authDiv);
        } else {
            authDiv.innerHTML = `<button onclick="Clerk.openSignIn()" style="background:transparent; color:#00fbff; border:1px solid #00fbff; padding:8px 15px; border-radius:20px; cursor:pointer; font-weight:bold;">LOGIN</button>`;
        }
    } catch (err) {
        console.warn("Clerk Auth not ready yet.");
    }
});

loadCatalog();

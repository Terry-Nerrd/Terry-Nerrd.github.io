// 1. Load the Catalog
fetch('catalog.json')
    .then(res => res.json())
    .then(data => {
        const catalog = document.getElementById('cologne-catalog');
        data.forEach(item => {
            catalog.innerHTML += `
                <div class="product-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="price">${item.price}</span>
                </div>
            `;
        });
    });

// 2. Initialize Clerk Auth
window.addEventListener('load', async function () {
    await Clerk.load();
    const authDiv = document.getElementById('user-auth-ui');
    
    if (Clerk.user) {
        Clerk.mountUserButton(authDiv);
    } else {
        const loginBtn = document.createElement('button');
        loginBtn.innerText = "MEMBER LOGIN 👤";
        loginBtn.onclick = () => Clerk.openSignIn();
        authDiv.appendChild(loginBtn);
    }
});

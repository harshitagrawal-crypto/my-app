var allProducts = [
	{id:1, name:"Wireless Bluetooth Headphones", price:1299, oldprice:2499, img:"https://via.placeholder.com/150?text=Headphones"},
	{id:2, name:"Smart Watch Series 5 - Fitness Tracker", price:2199, oldprice:3999, img:"https://via.placeholder.com/150?text=Smart+Watch"},
	{id:3, name:"Running Shoes for Men", price:999, oldprice:1999, img:"https://via.placeholder.com/150?text=Shoes"},
	{id:4, name:"Cotton T-Shirt (Pack of 2)", price:449, oldprice:899, img:"https://via.placeholder.com/150?text=T-Shirt"},
	{id:5, name:"Laptop Backpack Waterproof", price:799, oldprice:1499, img:"https://via.placeholder.com/150?text=Backpack"},
	{id:6, name:"Wired Earphones with Mic", price:199, oldprice:499, img:"https://via.placeholder.com/150?text=Earphones"},
	{id:7, name:"Coffee Mug Ceramic 350ml", price:149, oldprice:299, img:"https://via.placeholder.com/150?text=Mug"},
	{id:8, name:"Portable Power Bank 10000mAh", price:899, oldprice:1799, img:"https://via.placeholder.com/150?text=Power+Bank"}
];

var cart = [];

function fetchProducts(){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			var success = true;
			if(success){
				resolve(allProducts);
			}else{
				reject("Something went wrong while fetching products");
			}
		}, 1500);
	});
}

function renderProducts(list){
	var productListDiv = document.getElementById("productList");
	productListDiv.innerHTML = "";

	for(var i = 0; i < list.length; i++){
		var p = list[i];
		var discount = Math.round(((p.oldprice - p.price)/p.oldprice)*100);

		var card = document.createElement("div");
		card.className = "product-card";
		card.innerHTML = `
			<span class="badge">${discount}% OFF</span>
			<img src="${p.img}" alt="product image">
			<h3>${p.name}</h3>
			<div>
				<span class="price">₹${p.price}</span>
				<span class="old-price">₹${p.oldprice}</span>
			</div>
			<button class="add-btn" onclick="addToCart(${p.id})">ADD TO CART</button>
		`;
		productListDiv.appendChild(card);
	}
}

fetchProducts()
	.then(function(products){
		document.getElementById("loadingMsg").style.display = "none";
		renderProducts(products);
	})
	.catch(function(err){
		document.getElementById("loadingMsg").innerHTML = "Failed to load products :( " + err;
	});


function addToCart(id){
	var product;
	for(var i=0; i<allProducts.length; i++){
		if(allProducts[i].id == id){
			product = allProducts[i];
		}
	}

	var found = false;
	for(var j=0; j<cart.length; j++){
		if(cart[j].id == id){
			cart[j].qty = cart[j].qty + 1;
			found = true;
		}
	}
	if(!found){
		product.qty = 1;
		cart.push(product);
	}

	updateCartUI();
	alert(product.name + " added to cart!");
}

function updateCartUI(){
	var cartCount = 0;
	var total = 0;
	var cartItemsDiv = document.getElementById("cartItems");
	cartItemsDiv.innerHTML = "";

	for(var i=0; i<cart.length; i++){
		var item = cart[i];
		cartCount += item.qty;
		total += item.qty * item.price;

		var div = document.createElement("div");
		div.className = "cart-item";
		div.innerHTML = "<span>" + item.name + " x" + item.qty + "</span><span>₹" + (item.qty*item.price) + "</span>";
		cartItemsDiv.appendChild(div);
	}

	document.getElementById("cartCount").innerText = cartCount;
	document.getElementById("cartTotal").innerText = total;
}

function openCart(){
	document.getElementById("cartSidebar").classList.add("open");
}
function closeCart(){
	document.getElementById("cartSidebar").classList.remove("open");
}

function processPayment(amount){
	return new Promise(function(resolve, reject){
		if(amount <= 0){
			reject("Cart is empty, add something first");
			return;
		}
		setTimeout(function(){
			resolve("Payment successful! Order placed.");
		}, 2000);
	});
}

function checkout(){
	var total = 0;
	for(var i=0;i<cart.length;i++){
		total += cart[i].qty * cart[i].price;
	}

	document.getElementById("checkoutBtn").innerText = "Processing...";

	processPayment(total)
		.then(function(msg){
			alert(msg);
			cart = [];
			updateCartUI();
			closeCart();
			document.getElementById("checkoutBtn").innerText = "Checkout";
		})
		.catch(function(err){
			alert("Error: " + err);
			document.getElementById("checkoutBtn").innerText = "Checkout";
		});
}

document.getElementById("searchBox").addEventListener("keyup", function(){
	var query = this.value.toLowerCase();
	var filtered = allProducts.filter(function(p){
		return p.name.toLowerCase().includes(query);
	});
	renderProducts(filtered);
});

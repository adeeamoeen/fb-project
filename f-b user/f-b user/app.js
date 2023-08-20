


const getStartedButton = document.getElementById('getStartedButton');
        
getStartedButton.addEventListener('click', () => {
    window.location.href = 'signup.html'; // Redirect to the signup page
});
const app = firebase.initializeApp(firebaseConfig);
console.log(app)

const signup = () => {
    let username = document.getElementById('username').value;
    let contact = document.getElementById('contact').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let role = 'User'

    console.log(email, password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                role: role,
                contact: contact,
                email: email,
                password: password
            })
                .then(() => {
                    const user = { email: email };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('User created successfully.')
                    window.location.href = './home.html'
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
}

const signin = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    if (userData.role === 'Admin') {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log('User created successfully.')
                        window.location.href = '../Admin/items/items.html'
                    }
                    else {
                        const user = { email: email };
                        localStorage.setItem('user', JSON.stringify(user));
                        window.location.href = '../adeea/home.html'
                    }
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });}





        ///slider///
        $(document).ready(function(){
            $('.slider').slick({
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
            });
        });




        
            // Initialize itemname here
            var product_name = document.getElementById('product_name');
            var product_price = document.getElementById('product_price');
            var product_detail = document.getElementById('product_detail');
    
            // Define the itemname based on your needs
            var itemname = "example_product"; // Change this to the actual product name
         
    function DisplayData() {
        const itemRef = ref(db, "Products");
    
        get(itemRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
    
                    const subBodyHome = document.querySelector('.sub_body_home');
                    subBodyHome.innerHTML = ""; // Clear previous content
    
                    // Loop through the data and create HTML elements for each item
                    Object.keys(data).map((key) => {
                        const item = data[key];
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item');
    
                        const itemImg = document.createElement('img');
                        itemImg.src = "assets/product_img.png";
                        itemImg.alt = "product_img";
                        itemImg.classList.add('img_sizing');
    
                        const productDetailCard = document.createElement('div');
                        productDetailCard.classList.add('product_detail_card');
    
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product_');
    
                        const productName = document.createElement('p');
                        productName.classList.add('product_name');
                        productName.textContent = item.itemname;
    
                        const productPrice = document.createElement('p');
                        productPrice.classList.add('product_price');
                        productPrice.textContent = item.price;
    
                        productDiv.appendChild(productName);
                        productDiv.appendChild(productPrice);
    
                        const productDiv2 = document.createElement('div');
                        productDiv2.classList.add('product_');
    
                        const productDetail = document.createElement('p');
                        productDetail.classList.add('product_detail');
                        productDetail.textContent = item.describe;
    
                        const addBtn = document.createElement('div');
                        addBtn.classList.add('add_btn');
    
                        const plusIcon = document.createElement('i');
                        plusIcon.classList.add('fa-solid', 'fa-plus', 'white');
    
                        productDiv2.appendChild(productDetail);
                        addBtn.appendChild(plusIcon);
    
                        productDetailCard.appendChild(productDiv);
                        productDetailCard.appendChild(productDiv2);
                        productDetailCard.appendChild(addBtn);
    
                        itemDiv.appendChild(itemImg);
                        itemDiv.appendChild(productDetailCard);
    
                        subBodyHome.appendChild(itemDiv);
                    });
                } else {
                    console.log("No data found");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    
    // Call the DisplayData function
    DisplayData();
    
    function Displaycat() {
        const catRef = ref(db, "category");
    
        get(catRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
    
                    const cardCategory = document.querySelector('.card_category');
                    cardCategory.innerHTML = ""; // Clear previous content
    
                    // Loop through the data and create HTML elements for each category
                    Object.keys(data).map((key) => {
                        const category = data[key];
                        const categoryDiv = document.createElement('div');
                        categoryDiv.classList.add('card');
    
                        const categoryImg = document.createElement('img');
                        categoryImg.src = "assets/cat1.png";
    
                        const categoryName = document.createElement('p');
                        categoryName.classList.add('name_cat');
                        categoryName.textContent = category.category;
    
                        categoryDiv.appendChild(categoryImg);
                        categoryDiv.appendChild(categoryName);
    
                        cardCategory.appendChild(categoryDiv);
                    });
                } else {
                    console.log("No data found");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    
    // Call the Displaycat function
    Displaycat();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
const app = firebase.initializeApp(firebaseConfig);
// Function to upload a file and product data
const fileUpload = async (file) => {
    const product = {
        name: document.getElementById('item-name').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        unit: document.getElementById('unit-name').value,
        price: document.getElementById('unit-price').value,
        quantity: document.getElementById('quantity').value,
        image: '',
    };

    console.log('File: ', file);

    if (file) {
        try {
            const imageRef = storageRef.child('images/' + file.name);
            const snapshot = await imageRef.put(file);
            console.log('Image uploaded successfully!');

            const imageUrl = await imageRef.getDownloadURL();
            console.log('Download URL:', imageUrl);
            
            product.image = imageUrl;

            const productsRef = database.ref('products');
            await productsRef.push(product);
            console.log('Product data uploaded successfully');
        } catch (error) {
            console.error('Error uploading product data:', error);
        }
    }
};

// Function to get and display products
const getProducts = () => {
    const productsRef = database.ref('products');
    productsRef.once('value').then((snapshot) => {
        const products = [];
        snapshot.forEach((childSnapshot) => {
            const productData = childSnapshot.val();
            products.push(productData);
        });

        console.log('Products: ', products);

        if (products.length > 0) {
            const product = products[0];
            document.getElementById('product_name').innerHTML = product.name;
            document.getElementById('product_detail').innerHTML = product.description;
            document.getElementById('product_Price').innerHTML = product.price;
            document.getElementById('product_img').src = product.image;
        }
    }).catch((error) => {
        console.error('Error retrieving product data:', error);
    });
};

// Assuming you have some event listener to trigger adding a product
const addProduct = () => {
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];
    fileUpload(file)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.error('Error adding product:', error);
        });
};

// Call this function to initially fetch and display products
getProducts();

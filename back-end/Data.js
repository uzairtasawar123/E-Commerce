const bcrypt = require('bcryptjs');

const data = {
    Users:[
        {
            name: 'Uzair Tasawar',
            email : 'uzairtasawar123@gmail.com',
            password: bcrypt.hashSync('1234567890'),
            IsAdmin:true

        },
        {
            name: 'Zohaib Tasawar',
            email:'zohaibtasawar123@gmail.com',
            password: bcrypt.hashSync('1234567890'),
            IsAdmin:false

        }
    ],
    products : [
        {
           // _id : '1',
            Name: "Polo White Pent",
            slug: "polo-white-pent",
            category: "Pent",
            img:"/images/pic5.jpg",
            price: 800,
            available_total: 20,
            brand: "Polo",
            Rating: 5,
            number_reviews : 10,
            description: "Best white Summer Pent for men" 

        },
        {
           // _id : '2',
            Name: "Umair Collection",
            slug: "umair-collection",
            category: "Pair",
            img:"/images/pic6.jpg",
            price: 2000,
            available_total: 20,
            brand: "Umair",
            Rating: 3.5,
            number_reviews : 8,
            description: "Best collection women" 

        },
        {
           // _id : '3',
            Name: "Polo Pent/Shirt",
            slug: "polo-pent-shirt",
            category: "Pair",
            img:"/images/pic7.jpg",
            price: 3000,
            available_total: 20,
            brand: "Polo",
            Rating: 4,
            number_reviews : 7,
            description: "Best collection for men" 

        },
        {
           // _id : '4',
            Name: "Polo Collection",
            slug: "polo-collection",
            category: "Pair",
            img:"/images/pic8.jpg",
            price: 3000,
            available_total: 20,
            brand: "Polo",
            Rating: 5,
            number_reviews : 6,
            description: "Best collection for women" 

        },
        {
          //  _id : '5',
            Name: "Polo White Summer Shirt",
            slug: "polo-white-summer-shirt",
            category: "Shirts",
            img:"/images/pic1.jpg",
            price: 400,
            available_total: 20,
            brand: "Polo",
            Rating: 5,
            number_reviews : 12,
            description: "Best white Summer shirt for men" 

        },
        {
           // _id : '6',
            Name: "Nike Winter Pair",
            slug: "nike-winter-pair",
            category: "Pair",
            img:"/images/pic2.jpg",
            price: 700,
            available_total: 12,
            brand: "Nike",
            Rating: 4.5,
            number_reviews : 10,
            description: "Best Pair for men" 

        },
        {
            //_id : '7',
            Name: "J. White Summer Pair",
            slug: "j.-white-summer-pair",
            category: "Pair",
            img:"/images/pic3.jpg",
            price: 500,
            available_total: 10,
            brand: "J.",
            Rating: 3,
            number_reviews : 5,
            description: "Best white Summer Pair for women" 

        },
       {
           // _id : '8',
            Name: "UzairBrand collection",
            slug: "uzair-collection",
            category: "Pair",
            img:"/images/pic4.jpg",
            price: 1200,
            available_total: 13,
            brand: "UzairBrand",
            Rating: 4,
            number_reviews : 9,
            description: "Best collection for women" 

        },
        {
           // _id : '9',
            Name: "Nike Red Shirt",
            slug: "nike-red-shirt",
            category: "shirt",
            img:"/images/pic9.jpg",
            price: 500,
            available_total: 13,
            brand: "Nike",
            Rating: 4,
            number_reviews : 9,
            description: "Best collection for men" 

        }
           
    ]
}

module.exports = data;
class User {
    name;
    lastname;
    books;
    pets;
    constructor (name, lastname){
        this.name = name;
        this.lastname = lastname;
        this.books = [];
        this.pets = [];
    }
    getFullName(){
        console.log(`User: ${this.name} ${this.lastname}`);
    }
    addPet(){
        this.pets.push('Perro');
    }
    countPets(){
        let total = this.pets.length
        console.log(total);
    }
    addBook(){
        const book = {name: 'The lord of the rings', author: 'JRR Tolkien'}
        this.books.push(book)
    }
    getBooksNames(){
        console.log(this.books.map((objct) => objct.name))
    }
}

let user1 = new User('Lionel', 'Messi');
user1.getFullName();
user1.addPet();
user1.countPets();
user1.addBook();
user1.getBooksNames();
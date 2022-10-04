class User {
    name;
    lastname;
    books = []
    pets = []
    constructor (name, lastname){
        this.name = name;
        this.lastname = lastname;
    }
    getFullName(){
        console.log(`User: ${this.name} ${this.lastname}`);
    }
    addPet(pet){
        this.pets.push(pet);
    }
    countPets(){
        let total = this.pets.length
        console.log(total);
    }
    addBook(name, author){
        const book = {name, author}
        this.books.push(book)
    }
    getBooksNames(){
        console.log(this.books.map((objct) => objct.name))
    }
}

let user1 = new User('Lionel', 'Messi');
user1.getFullName();
user1.addPet('Gato');
user1.addPet('Perro')
user1.countPets();
user1.addBook('The lord of the Rings', 'JRR Tolkien');
user1.getBooksNames();


const myCharacter = {
    name:'Dan',
    age:25,
    height:'180cm',
    sayHello(name){
        console.log(`Hello ${name}`)
    }
}

myCharacter.sayHello('Dan');

const users = [
    {
        name:'Oleg',
        age:20,
        isAdmin:true
    },
    {
        name:'Tom',
        age:28,
        isAdmin:false
    },
    {
        name:'James',
        age:33,
        isAdmin:true
    },
    {
        name:'Tim',
        age:18,
        isAdmin:false
    },
    {
        name:'Andrew',
        age:27,
        isAdmin:true
    },
]

let usersCount = 0;

for(let i = 0; i < users.length;i++){
    if (users[i].isAdmin === false){
        usersCount++
    }
}
console.log(usersCount);


// Короткое решение

// const usersCount = users.filter(user => !user.isAdmin).length
// console.log(usersCount)
//promise
function findAndSaveUser(Users) {
        Users.findOne({})
        .then((user) => {
        user.name ='zero';
        return user.save();
    })
        .then((user) => {
        return Users.findOne({ gender:'m' });
    })
        .then((user) => {
    
    })
      .catch(err => {
        console.error(err);
    });
}
    
//async.await
async function findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name ='zero';
    user = await user.save();
    user = await Users.findOne({ gender:'m' });
}
    
const answer = 'ync/await 문법을 사용하여 async function 추가';
console.log(answer);

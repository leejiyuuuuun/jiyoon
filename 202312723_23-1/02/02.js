const answer = '콜백 지옥은 콜백 함수를 중첩해 사용하는 것으로, +\
비동기적으로 실행되는 여러 개의 함수가 콜백 함수로 연결되어 +\
실행되는 코드의 가독성이 떨어지고, 유지보수가 어려워지는 문제점을 말한다. +\
콜백지옥은 Promise나  async/await로 해결할수도있다. +\
예를들면 아래와같다. 첫번째소스에서 콜백지옥을 두번째소스와같이 해결할수있다.';
console.log(answer);




function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => { 
    if (err) {
    return console.error(err);
    }
    user.name ='zero';
    user.save((err) => { 
    if (err) {
    return console.error(err);
    }
    Users.findOne({ gender:'m' }, (err, user) => { 
   
            });
        });
     });
    }


    function findAndSaveUser(Users) {
        Users.findOne({}, (err, user) => { 
        if (err) {
        return console.error(err);
        }
        user.name ='zero';
        user.save((err) => { 
        if (err) {
        return console.error(err);
        }
        Users.findOne({ gender:'m' }, (err, user) => { 
                });
             });
        });
        }
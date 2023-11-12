const form = document.querySelector('form');
const inputEmail = document.querySelector('#email');
const inputPass = document.querySelector('#pass');
const selectType = document.querySelector('#type');

class Account {
    #email;
    #pass;

    constructor(email, pass) {
        this.#email = email;
        this.#pass = pass;
    }

    get getEmail(){
        return this.#email;
    }

    get getPass(){
        return this.#pass;
    }
}

class App {
    #accounts = [];

    constructor() {
        form.addEventListener('submit', this._submit.bind(this));
    }

    _submit(e) {
        e.preventDefault();

        if (selectType.value === 'register') {
            this._register();
        } else {
            this._login();
        }
    }

    _register() {
        const emailValue = inputEmail.value;
        const passValue = inputPass.value;

        // Create account object
        const account = new Account(emailValue, passValue);

        // Add account to the array
        this.#accounts.push(account);

        // Set local storage
        this._setLocalStorage(account);
    }

    _login() {
        const emailValue = inputEmail.value;
        const passValue = inputPass.value;

        const account = this.#accounts.find(acc => acc.getEmail === emailValue);

        if(!account) return alert('Account dont exsist');

        if(this._getPassStorage(account) === passValue){
            alert('Succsesfully Logined');
        } else{
            alert('Your Password Is Incorrect');
        }
    }

    _setLocalStorage(account) {
        if(this._getPassStorage(account)){
            alert('Account Exsists');
            return;
        } else{
            localStorage.setItem(account.getEmail, JSON.stringify(account.getPass));
            alert('Succsesfully Created')
        }
    }

    _getPassStorage(account) {
        return JSON.parse(localStorage.getItem(account.getEmail));
    }

    reset(){
        localStorage.clear();
        location.reload();
    }
}

const app = new App();

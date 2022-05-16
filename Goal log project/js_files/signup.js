// ELEMENTS
const toggleContainer = document.querySelector('.toggle-element');
const toggleLogin = document.querySelector('#login');
const toggleSignup = document.querySelector('#signup');
const loginForm = document.querySelector('.login_form');
const signUpForm = document.querySelector('.signup_form');


// TOGGLE ELEMENT FUNCTIONALITY

function activateLoginToggleAndShowLoginForm(){
    toggleLogin.classList.add('active_toggle');
    signUpForm.classList.add('hide');
}
activateLoginToggleAndShowLoginForm();

toggleContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.toggle');
    if (!clicked) return
    if(clicked === toggleLogin){
        toggleLogin.classList.add('active_toggle');
        toggleSignup.classList.remove('active_toggle');
        signUpForm.classList.add('hide')
        loginForm.classList.remove('hide')
    }
    if(clicked === toggleSignup){
        toggleLogin.classList.remove('active_toggle');
        toggleSignup.classList.add('active_toggle');
        signUpForm.classList.remove('hide')
        loginForm.classList.add('hide')
    }
})
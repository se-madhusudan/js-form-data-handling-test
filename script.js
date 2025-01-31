//detailsForm 
const detailsForm = document.querySelector('#detailsForm');
const nextBtn = document.querySelector('.nextBtn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const gender = document.querySelector('input[name="gender"]:checked');
const bio = document.querySelector('#bio');
const profile = document.querySelector('#profile');


//editForms
const editForm = document.querySelector('#editForm');
const saveBtn = document.querySelector('.saveBtn');
const ediTname = document.querySelector('#ediTname');
const ediTemail = document.querySelector('#ediTemail');
const ediTphone = document.querySelector('#ediTphone');
const ediTgender = document.querySelector('input[name="gender"]:checked');
const ediTbio = document.querySelector('#ediTbio');
const ediTprofile = document.querySelector('#ediTprofile');

//popUpSub 
const popUpSub = document.querySelector('.popUpSub');
const cancelSubmitBtn = document.querySelector('.popUpSub .cancelBtn');

//checks if all the form fields are filled, if yes then it enables the btn
detailsForm.addEventListener('input', () => {
    const isFormFilled = detailsForm.checkValidity(); //checkValidity is built-in js function, part of HTMLFormElement interface
    nextBtn.disabled = !isFormFilled;
});

//function to validate the form data and show errors, show submit pop up post data validation, calls submitData()
const validateData = (name, email, phone, form, bio, profile, nextBtn) => {
    let isValid = true;

    // validate name
    if (!/^[a-zA-Z\s]{1,30}$/.test(name.value)) {
        document.querySelector('.nameWarning').style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector('.nameWarning').style.display = 'none';
    }

    // validate email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
        document.querySelector('.emailWarning').style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector('.emailWarning').style.display = 'none';
    }

    // validate phone
    if(phone.value != '') {
        if (phone.value && !/^\d{10}$/.test(phone.value)) {
            document.querySelector('.phoneWarning').style.display = 'inline-block';
            isValid = false;
        } else {
            document.querySelector('.phoneWarning').style.display = 'none';
        }
    }

    // validate gender
    const gender = form.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.querySelector('.genderWarning').style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector('.genderWarning').style.display = 'none';
    }

    // validate bio
    if (!/^[a-zA-Z0-9\s.]{1,150}$/.test(bio.value)) {
        document.querySelector('.bioWarning').style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector('.bioWarning').style.display = 'none';
    }

    // validate profile image - for .png, .jpg, .jpeg
    const fileName = profile.value;
    function isImageFile(fileName) {
        return /\.(png|jpg|jpeg)$/i.test(fileName);
    }

    if (!isImageFile(fileName)) {
        document.querySelector('.profileWarning').style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector('.profileWarning').style.display = 'none';
    }

    // toogle the submit button based on form validity
    nextBtn.disabled = !isValid;
};

//calls the validate data function
detailsForm.addEventListener('input', (e) => {
    e.preventDefault();
    validateData(name, email, phone, detailsForm, bio, profile, nextBtn);
});

//calls the validate data function
editForm.addEventListener('input', (e) => {
    e.preventDefault();
    validateData(ediTname, ediTemail, ediTphone, editForm, ediTbio, ediTprofile, saveBtn);
});


//show the form details pop up
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popUpSub.style.display = 'block';
});

//cancel the details submission
cancelSubmitBtn.addEventListener('click', () => {
    popUpSub.style.display = 'none'
});

//function to parse data into json and save in the local storage, hides the submit pop up
const submitData = () => {

}

//function to fetch data from local storage and view data, shows view pop up
const viewData = () => {

}

//function to pre-fill the form data in form after fetching from local storage, calls validateData()
const editData = () => {

}

//function to fetch the name, email from the local storage and show in table row to allow viewing and editing all data
const tableData = () => {

}
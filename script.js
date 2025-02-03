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
const submitBtn = document.querySelector('.submitBtn');

//popUpView
const popUpView = document.querySelector('.popUpView');
const closeBtn = document.querySelector('.closeBtn');

//popUpEdit
const popUpEdit = document.querySelector('.popUpEdit');
const cancelEdit = document.querySelector('.popUpEdit .cancelBtn');


//checks if all the form fields are filled, if yes then it enables the btn
detailsForm.addEventListener('input', () => {
    const isFormFilled = detailsForm.checkValidity(); //checkValidity is built-in js function, part of HTMLFormElement interface
    nextBtn.disabled = !isFormFilled;
});

//function to validate the form data and show errors, show submit pop up post data validation, calls reviewData()
const validateData = (name, email, phone, form, bio, profile, btn) => {
    let isValid = true;
    const formType = form.id === 'detailsForm' ? '' : 'ediT';

    // validate name
    if (!/^[a-zA-Z\s]{1,30}$/.test(name.value)) {
        document.querySelector(`.${formType}nameWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}nameWarning`).style.display = 'none';
    }

    // validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.querySelector(`.${formType}emailWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}emailWarning`).style.display = 'none';
    }

    // validate phone - only when filled
    if (phone.value && !/^\d{10}$/.test(phone.value)) {
        document.querySelector(`.${formType}phoneWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}phoneWarning`).style.display = 'none';
    }

    // validate gender
    const gender = form.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.querySelector(`.${formType}genderWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}genderWarning`).style.display = 'none';
    }

    // validate bio
    if (!/^[\s\S]{1,150}$/.test(bio.value)) {
        document.querySelector(`.${formType}bioWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}bioWarning`).style.display = 'none';
    }

    // validate profile image - for .png, .jpg, .jpeg, only when file is selected
    if (profile.value && !/\.(png|jpg|jpeg)$/i.test(profile.value)) {
        document.querySelector(`.${formType}profileWarning`).style.display = 'inline-block';
        isValid = false;
    } else {
        document.querySelector(`.${formType}profileWarning`).style.display = 'none';
    }

    btn.disabled = !isValid;
    
    // For detailsForm only
    if (form.id === 'detailsForm') {
        reviewData(profile, name.value, email.value, phone.value, gender?.value || '', bio.value);
    }

    // reviewData(profile, name.value, email.value, phone.value, gender.value, bio.value); //profile - not profile.value because we want actual file input element not it's value
};

//calls the validate data function
detailsForm.addEventListener('input', (e) => {
    e.preventDefault();
    validateData(name, email, phone, detailsForm, bio, profile, nextBtn);
});

editForm.checkValidity = () => {
    return document.querySelectorAll('#editForm :invalid').length === 0;
};

//calls the validate data function
editForm.addEventListener('input', (e) => {
    e.preventDefault();
    const isFormFilled = editForm.checkValidity();
    saveBtn.disabled = !isFormFilled;
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

//calls the submitData() to save data in localStorage in json
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    submitData(name.value, email.value, phone.value, detailsForm, bio.value, profile);
});

//hides the popUpView
closeBtn.addEventListener('click', () => {
    popUpView.style.display = 'none';
});

//cancels the popUpEdit
cancelEdit.addEventListener('click', () => {
    popUpEdit.style.display = 'none';
});

//saves the edited data
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const index = editForm.dataset.editIndex;
    if (index === undefined) return;

    let storedData = localStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];
    
    // Get updated values
    const updatedUser = {
        name: ediTname.value,
        email: ediTemail.value,
        phone: ediTphone.value,
        gender: editForm.querySelector('input[name="gender"]:checked').value,
        bio: ediTbio.value,
        pic: users[index].pic // existing image as default
    };

    // Handle new profile image
    const handleImageUpdate = () => {
        if (ediTprofile.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updatedUser.pic = e.target.result;
                updateUserData(users, index, updatedUser);
            };
            reader.readAsDataURL(ediTprofile.files[0]);
        } else {
            updateUserData(users, index, updatedUser);
        }
    };

    handleImageUpdate();
});


//function to show the form details for review
const reviewData = (profile, name, email, phone, gender, bio) => {
    const reviewProfile = document.querySelector('.reviewProfile');
    const reviewName = document.querySelector('.reviewName');
    const reviewEmail = document.querySelector('.reviewEmail');
    const reviewPhone = document.querySelector('.reviewPhone');
    const reviewGender = document.querySelector('.reviewGender');
    const reviewBio = document.querySelector('.reviewBio');

    //js can't directly access the file path due to security reason, so we need to create object url
    // Convert file input to a blob URL
    if (profile.files.length > 0) {
        const file = profile.files[0]; //gets selected file
        reviewProfile.src = URL.createObjectURL(file); // Create and set object URL - it's temporary and works on current session only
    } else {
        reviewProfile.src = gender ==  'male' ? './assets/male.jpg' : './assets/female.jpg';
    }

    reviewName.innerHTML = name;
    reviewEmail.innerHTML = email;
    reviewPhone.innerHTML = phone === '' ? 'NA' : phone;
    reviewGender.innerHTML = gender;
    reviewBio.innerHTML = bio;
}

//function to parse data into json and save in the local storage, hides the submit pop up, and calls the tableData() to show some data in table rows(name, email).
const submitData = (name, email, phone, detailsForm, bio, profile) => {
    let pic = '';
    if (profile.files.length > 0) {
        //to store image in localStorage as Base64 string, it's accessible in any session
        const file = profile.files[0];
        const reader = new FileReader();

        reader.onloadend = function() {
            //store Base64 data
            pic = reader.result; 

            //call only after image is ready
            saveUserData(name, email, phone, detailsForm, bio, pic);
        };
       reader.readAsDataURL(file);
    } else {
        saveUserData(name, email, phone, detailsForm, bio, '');
    }
};
const saveUserData = (name, email, phone, detailsForm, bio, pic) => {
    //to get the value otherwise, it returns null
    const gender = detailsForm.querySelector('input[name="gender"]:checked').value;
    
    const userData = {
        name,
        email,
        phone,
        gender,
        bio,
        pic
    };
    
    // Get existing data from localStorage
    let storedData = localStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];
    
    users.push(userData);
    localStorage.setItem('userData', JSON.stringify(users));
    
    //hide popUpSub
    popUpSub.style.display = 'none';

    //form reset
    detailsForm.reset();

    //disable next button
    nextBtn.disabled = true;
    
    //update the table data
    tableData();
}

//function to fetch data from local storage and view data, shows view pop up
const viewData = (index) => {
    let storedData = localStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];
    let user = users[index];

    const viewName = document.querySelector('.viewName'); 
    const viewEmail = document.querySelector('.viewEmail'); 
    const viewPhone = document.querySelector('.viewPhone'); 
    const viewGender = document.querySelector('.viewGender');
    const viewBio = document.querySelector('.viewBio');
    const viewProfile = document.querySelector('.profileImage');

    if(user) {
        viewName.innerHTML = user.name;
        viewEmail.innerHTML = user.email;
        viewGender.innerHTML = user.gender;
        viewBio.innerHTML = user.bio;
        viewPhone.innerHTML = user.phone != '' ? user.phone : 'NA';

        if(user.pic && user.pic.startsWith('data:image')) {
            viewProfile.src = user.pic; // This should be a Base64 image
        } else {
            viewProfile.src = user.gender === 'male' ? './assets/male.jpg' : './assets/female.jpg';
        }
    };

    popUpView.style.display = "block";
}

//function to pre-fill the form data in form after fetching from local storage, calls validateData()
const editData = (index) => {
    let storedData = localStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];
    let user = users[index];

    // Store current edit index in the form
    editForm.dataset.editIndex = index;
        
    ediTname.value = user.name;
    ediTemail.value = user.email;
    ediTphone.value = user.phone || '';
    ediTbio.value = user.bio;

    // Clear existing gender selection first
    const genderRadios = editForm.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => radio.checked = false);
    
    // Set new gender selection
    const selectedGender = editForm.querySelector(`input[name="gender"][value="${user.gender}"]`);
    if (selectedGender) selectedGender.checked = true;

    // Add gender change listener
    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            validateData(ediTname, ediTemail, ediTphone, editForm, ediTbio, ediTprofile, saveBtn);
        });
    });

    
    // Enable/disable save button based on initial validity
    validateData(ediTname, ediTemail, ediTphone, editForm, ediTbio, ediTprofile, saveBtn);

    popUpEdit.style.display = "block";
}

//function to update the data after edit
const updateUserData = (users, index, updatedUser) => {
    users[index] = updatedUser;
    localStorage.setItem('userData', JSON.stringify(users));
    
    popUpEdit.style.display = "none";
    tableData(); //refresh the data in table
    
    ediTprofile.value = '';
};

//function to fetch the name, email from the local storage and show in table row to allow viewing and editing all data
const tableData = () => {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    
    let storedData = localStorage.getItem('userData');
    let users = storedData ? JSON.parse(storedData) : [];
    
    users.forEach((user, index) => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button class="viewBtn" onclick="viewData(${index})">View</button></td>
            <td><button class="editBtn" onclick="editData(${index})">Edit</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// on page reload, fetch data from localStorage and show in table
document.addEventListener('DOMContentLoaded', tableData);
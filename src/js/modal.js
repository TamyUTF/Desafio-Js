import { isFavorite } from "./contact";

const modalDiv = document.getElementById('modal');
const btEdit = document.getElementsByClassName('edit')[0]

const elementsModalDOM = {
    header: document.getElementsByClassName('title')[0],
    email:document.getElementsByClassName('mEmail')[0],
    phone: document.getElementsByClassName('mPhone')[0],
    gender: document.getElementsByClassName('mGender')[0],
    company: document.getElementsByClassName('mCompany')[0],
    address: document.getElementsByClassName('mAddress')[0],
    comments: document.getElementsByClassName('mComments')[0], 
    avatar: document.getElementById('mAvatar'),
    favorite: document.getElementsByClassName('icon')[1]
}

const closeModal = function (e) {
    if (e.target == modalDiv) {
        modalDiv.style.display = 'none';
    }
}
window.addEventListener('click', closeModal);


export const openModal = (contact)=>{
    modalDiv.style.display = 'block';
    elementsModalDOM.header.innerHTML = `${contact.firstName} ${contact.lastName}`;
    elementsModalDOM.email.innerHTML = contact.email;
    elementsModalDOM.phone.innerHTML = contact.info.phone;
    elementsModalDOM.gender.innerHTML = contact.gender;
    elementsModalDOM.company.innerHTML = contact.info.company;
    elementsModalDOM.address.innerHTML = contact.info.address;
    elementsModalDOM.comments.innerHTML = contact.info.comments;
    elementsModalDOM.avatar.setAttribute('src',contact.info.avatar);
    elementsModalDOM.favorite.setAttribute('src',isFavorite(contact));
}

const openForm = (contact) => {
    if(contac!=null){

    }
}
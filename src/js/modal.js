import fav from '../img/icon-fav-full.png';
import nfav from '../img/icon-fav.png';

import { isFavorite } from "./contact";
import {loadMore} from "./../index";
import {myFavs} from './contact';
import {setFavorite} from './contact';
import {removeFavorite} from './contact';



const modalDiv = document.getElementById('modal');
const modalContact = document.getElementById('modal-contact');
const modalForm = document.getElementById('modal-form');

const btEdit = document.getElementsByClassName('edit')[0];
const btConfirm = document.getElementById('btConfirm');
const btFav = document.getElementsByClassName('fav')[0];
const imgFav = document.getElementsByClassName('icon')[1];

const elementsModalDOM = {
    header: document.getElementById('title-modal'),
    email: document.getElementsByClassName('mEmail')[0],
    phone: document.getElementsByClassName('mPhone')[0],
    gender: document.getElementsByClassName('mGender')[0],
    company: document.getElementsByClassName('mCompany')[0],
    address: document.getElementsByClassName('mAddress')[0],
    comments: document.getElementsByClassName('mComments')[0], 
    avatar: document.getElementById('mAvatar'),
    favorite: document.getElementsByClassName('icon')[1]
}

const elementsFormDOM = {
    header: document.getElementById('title-form'),
    firstName: document.getElementById('fFirstName'),
    lastName: document.getElementById('fLastName'),
    email: document.getElementById('fEmail'),
    phone: document.getElementById('fPhone'),
    gender: document.getElementById('fGender'),
    company: document.getElementById('fCompany'),
    address: document.getElementById('fAddress'),
    comments: document.getElementById('fComments'), 
    avatar: document.getElementById('fAvatar'),
    favorite: document.getElementById('fFavorite')
}

const closeModal = function (e) {
    if (e.target == modalDiv) {
        modalDiv.style.display = 'none';
        if(modalForm.style.display == "block"){
            modalForm.style.display = "none";
            modalContact.style.display == "block";   
        }
    }
}

window.addEventListener('click', closeModal);


export const openModal = (contact)=>{
    modalDiv.style.display = 'block';
    modalContact.style.display = 'block';

    elementsModalDOM.header.innerHTML = `${contact.firstName} ${contact.lastName}`;
    elementsModalDOM.email.innerHTML = contact.email;
    elementsModalDOM.phone.innerHTML = contact.info.phone;
    elementsModalDOM.gender.innerHTML = contact.gender;
    elementsModalDOM.company.innerHTML = contact.info.company;
    elementsModalDOM.address.innerHTML = contact.info.address;
    elementsModalDOM.comments.innerHTML = contact.info.comments;
    elementsModalDOM.avatar.setAttribute('src',contact.info.avatar);
    elementsModalDOM.favorite.setAttribute('src',isFavorite(contact));

    btEdit.onclick = () => {
        openForm(contact);
    }

    btFav.onclick = () => {
        favoriteContact(contact);
    }
}


const openForm = (contact) => {
    modalContact.style.display = "none";
    modalForm.style.display = "block";

    if(contact!=null){ //é para editar
        elementsFormDOM.header.innerHTML = "Editar Contato";
        elementsFormDOM.firstName.value = contact.firstName;
        elementsFormDOM.lastName.value = contact.lastName;
        elementsFormDOM.email.value = contact.email;
        elementsFormDOM.phone.value = contact.info.phone;
        elementsFormDOM.gender.value =  contact.gender;//arrumar
        elementsFormDOM.company.value = contact.info.company;
        elementsFormDOM.address.value = contact.info.address;
        elementsFormDOM.comments.value = contact.info.comments;
        elementsFormDOM.avatar.setAttribute('src', contact.info.avatar);
        elementsFormDOM.favorite.checked = contact.favorite;
    }
    btConfirm.onclick = () =>{
        console.log(elementsFormDOM);
    }
}

const favoriteContact = (contact) => {
    if(contact.isFavorite == true){
        if(myFavs.getItem(contact.id)!= null){ //se ele estiver no local Storage
            myFavs.removeItem(contact.id);
            removeFavorite(contact);
        }
        contact.isFavorite = false;
        imgFav.setAttribute('src', nfav);
    }else{
        myFavs.setItem(contact.id, true);
        contact.isFavorite = true;
        imgFav.setAttribute('src', fav);
    }
    loadMore(1);    
}

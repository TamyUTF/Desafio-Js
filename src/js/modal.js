import fav from '../img/icon-fav-full.png';
import nfav from '../img/icon-fav.png';

import { isFavorite } from "./contact";
import {loadMore} from "./../index";
import {updateContact} from './api';
import {createContact} from './api';
import {deleteContact} from './api';

const modalDiv = document.getElementById('modal');
const modalContact = document.getElementById('modal-contact');
export const modalForm = document.getElementById('modal-form');
export const contactForm = document.getElementById('contact-form');

const btEdit = document.getElementsByClassName('edit')[0];
const btConfirm = document.getElementById('btConfirm');
const btFav = document.getElementsByClassName('fav')[0];
const imgFav = document.getElementsByClassName('icon')[1];
const btDel = document.getElementsByClassName('garbage')[0];

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
    modalForm.style.display = "none";

    elementsModalDOM.header.innerHTML = `${contact.firstName} ${contact.lastName}`;
    elementsModalDOM.email.innerHTML = contact.email;
    elementsModalDOM.phone.innerHTML = contact.info.phone;
    elementsModalDOM.gender.innerHTML = contact.gender;
    elementsModalDOM.company.innerHTML = contact.info.company;
    elementsModalDOM.address.innerHTML = contact.info.address;
    elementsModalDOM.comments.innerHTML = contact.info.comments;
    elementsModalDOM.avatar.setAttribute('src', contact.info.avatar);
    elementsModalDOM.favorite.setAttribute('src', isFavorite(contact));

    btEdit.onclick = () => {
        openForm(contact);
    }

    btFav.onclick = () => {
        favoriteContact(contact);
    }

    btDel.onclick = () => {
        const res = confirm("Deseja realmente excluir?");
        if(res == true){
            deleteContact(contact);
        }
    }
}

export const openForm = (contact) => {
    modalDiv.style.display = 'block';
    modalForm.style.display = "block";
    modalContact.style.display = "none";
    
    if(contact != null){ //edita contato
        elementsFormDOM.header.innerHTML = "Editar Contato";
        elementsFormDOM.firstName.value = contact.firstName;
        elementsFormDOM.lastName.value = contact.lastName;
        elementsFormDOM.email.value = contact.email;
        elementsFormDOM.phone.value = contact.info.phone;
        if(contact.info.gender == 'f'){
            elementsFormDOM.gender.innerHTML=
            `<option value='f' selected >Feminino</option>
            <option value='m'>Masculino</option>`
        }else if(contact.info.gender == 'm'){
            `<option value='f'>Feminino</option>
            <option value='m' selected >Masculino</option>`
        }
        elementsFormDOM.company.value = contact.info.company;
        elementsFormDOM.address.value = contact.info.address;
        elementsFormDOM.comments.value = contact.info.comments;
        elementsFormDOM.avatar.value = contact.info.avatar;
        if(contact.isFavorite == true){
            elementsFormDOM.favorite.checked = true;
        }else{
            elementsFormDOM.favorite.checked = false;
        }
    }else{ //adiciona um novo contato
        elementsFormDOM.header.innerHTML = "Novo Contato"; 
        elementsFormDOM.firstName.value = "";
        elementsFormDOM.lastName.value = "";
        elementsFormDOM.email.value = "";
        elementsFormDOM.phone.value = "";
        elementsFormDOM.gender.value = "f";
        elementsFormDOM.company.value = "";
        elementsFormDOM.address.value = "";
        elementsFormDOM.comments.value = "";
        elementsFormDOM.avatar.value = "";
        elementsFormDOM.favorite.checked = false;
    }
 
    btConfirm.onclick = () =>{
        if(checkForm(contactForm)){
            if(contact != null){
                editContact(elementsFormDOM, contact); 
            }else{
                newContact(elementsFormDOM);
            }        
        }
    }
}

const favoriteContact = (contact) => {
    if(contact.isFavorite == true){
        contact.isFavorite = false;
        updateFavorite(contact);
        imgFav.setAttribute('src', nfav);
    }else{
        updateFavorite(contact);
        imgFav.setAttribute('src', fav);
    }
    loadMore(1);    
}

export const checkForm = (form) =>{
    if(form.fFirstName.value == ""){
        alert("Informe o nome do contato.");
        form.fFirstName.focus();
        return false;
    }
    console.log(form.fFirstName.value.length);
    if(form.fFirstName.value.length > 0 && form.fFirstName.value.length < 3){
        alert("Preencha o nome (mín. 3 caracteres)");
        form.fFirstName.focus();
        return false;
    }
    if(form.fLastName.value == ""){
        alert("Informe o sobrenome do contato.");
        form.fLastName.focus();
        return false;
    }
    if(form.fLastName.value.length > 0 && form.fLastName.value.length < 3){
        alert("Preencha o sobrenome (mín. 3 caracteres)");
        form.fLastName.focus();
        return false;
    }
    if(form.fCompany.value == ""){
        alert("Informe a empresa do contato.");
        form.fCompany.focus();
        return false
    }
    if(form.fCompany.value.length > 0 && form.fCompany.value.length < 3){
        alert("Nome da empresa (mín. 3 caracteres)");
        form.fCompany.focus();
        return false;
    }
    if(form.fAddress.value.length > 0 && form.fAddress.value.length < 3){
        alert("Preencha o endereço (mín. 3 caracteres)");
        form.fAddress.focus();
        return false;
    }
    if(form.fPhone.value.length > 0 && form.fPhone.value.length < 3){
        alert("Preencha o telefone (mín. 3 caracteres)");
        form.fPhone.focus();
        return false;
    }
return true; 
}

const updateFavorite = (contact) => {
    const contactJSON = JSON.stringify({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        gender: contact.gender,
        isFavorite: contact.isFavorite,
        company: contact.info.company,
        avatar: contact.info.avatar,
        address: contact.info.address,
        phone: contact.info.phone,
        comments: contact.info.comments,   
    });
    updateContact(contactJSON, contact);
}
const editContact = (dataForm, contact) => {
    let email = dataForm.email.value;
    let phone = dataForm.phone.value;
    let address = dataForm.address.value;
    let comments = dataForm.comments.value;
    let favorite = dataForm.favorite.checked;
    let avatar = dataForm.avatar.value;

    if(email.length == 0){
        email = "null";
    }else if(phone.length == 0 ){
        phone = "null"
    }else if(address.length == 0){
        address = "null";
    }else if(comments.length == 0){
        comments = "null";
    }else if(avatar.length == 0){
        avatar = contact.info.avatar;
    }

    const contactJSON = JSON.stringify({
        firstName: dataForm.firstName.value,
        lastName: dataForm.lastName.value,
        email: email,
        gender: dataForm.gender.value,
        isFavorite: favorite,
        company: dataForm.company.value,
        avatar: avatar,
        address: address,
        phone: phone,
        comments: comments,   
    });
    console.log(contactJSON);

    updateContact(contactJSON, contact);
}

const newContact = (dataForm) => {
    let email = dataForm.email.value;
    let phone = dataForm.phone.value;
    let address = dataForm.address.value;
    let comments = dataForm.comments.value;
    let favorite = dataForm.favorite.checked;
    let avatar = dataForm.avatar.value;

    if(email.length == 0){
        email = "null";
    }else if(phone.length == 0 ){
        phone = "null"
    }else if(address.length == 0){
        address = "null";
    }else if(comments.length == 0){
        comments = "null";
    }else if(avatar.length == 0){
        avatar = "";
    }

    const contactJSON = JSON.stringify({
        firstName: dataForm.firstName.value,
        lastName: dataForm.lastName.value,
        email: email,
        gender: dataForm.gender.value,
        isFavorite: favorite,
        company: dataForm.company.value,
        avatar: avatar,
        address: address,
        phone: phone,
        comments: comments,   
    });

    createContact(contactJSON);
}

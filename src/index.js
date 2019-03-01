import './css/index.css'
import './js/api'
import './js/modal'

import {isFavorite} from  './js/contact';
import {openModal} from './js/modal';
import {getAllFavorites} from './js/contact';
import {openForm} from './js/modal';
import {searchContact} from './js/contact';

let favAux;
let contacts = [];
let allContacts =[];

const contactCard = document.getElementsByClassName('contactList').childNodes.length;

const getAll = async () => {
    const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts/')

    const data = await res.json();
    window.state = {
        ...window.state,
        allContacts: data,
        filter:'',
        loading: false
    }
    allContacts = data;
}

/*INFINITE SCROLL*/
window.addEventListener('scroll',() =>{
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (index < contacts.length) {
        if(contactCard<=0){
            loadMore();
        }
     if(Math.ceil(scrolled) >= scrollable){
            if(favAux){ //Se clicou na aba de favoritos
                loadMore();
            }else{
                console.log('todos os contatos');
                loadMore();
            } 
        }
    }
})

getAll().then(() => {
    contacts = allContacts;
    loadMore();
});


const contactsDiv = document.getElementById('contactList');
let index = 0;
/*FUNÇÃO QUE LISTA CONTATOS*/
export const loadMore = function (reset) {
    if(reset == 1){
        index = 0;
        contactsDiv.innerHTML = "";
    }else{
            const aux = index + 10;
            if (index == contacts.length) {
                contactsDiv.innerHTML = "";
            } else {
                for (let i = index; i < aux; i++) {
                    index++;
                    if (!window.state.loading) {
                        let favIcon = isFavorite(contacts[i]);
                        const b = document.createElement("div");
                        b.className = 'contact-card';
                        b.innerHTML =
                            `<button class='card-header'>
                                <img src='${favIcon}' class="icon-card"/>
                                <img src='${contacts[i].info.avatar}' class='avatar'/>                  
                                <section class="main-info">
                                    <h3>${contacts[i].firstName} ${contacts[i].lastName}</h3>
                                    <h4>${contacts[i].email}</h4> 
                                    <p>${contacts[i].info.phone}</p>
                                </section>
                            </button>`;
                        b.onclick = () => {
                            openModal(contacts[i]);
                        }
                        contactsDiv.appendChild(b);
                    }else{
                        const b = document.createElement("div");
                        b.innerHTML = `<h1>CARREGANDO...</h1>`
                        const body = document.getElementById('container');
                        body.innerHTML = b;  
                    }
                }
            } 
              
    }
}

const btFavContacts = document.getElementById('aFavorites');
btFavContacts.addEventListener('click', function(){
    favAux = true;
    contacts = getAllFavorites();
    loadMore(1);
});

const btHome = document.getElementById('aHome');
btHome.addEventListener('click', function(){
    favAux = false;
    contacts = allContacts;
    loadMore(1)
})

const btNewContact = document.getElementById('aNewContact');
btNewContact.onclick=()=>{
    openForm(null);
}

const btSearch = document.getElementById('iSearch');
btSearch.onkeyup=()=>{
    contacts = searchContact(btSearch.value);
    loadMore(1);
}
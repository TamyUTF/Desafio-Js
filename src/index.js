import './css/index.css'
import './js/api'
import './js/modal'

import {isFavorite} from  './js/contact';
import {openModal} from './js/modal';
import {getAllFavorites} from './js/contact';
import {openForm} from './js/modal';
import {searchContact} from './js/contact';

const favAux = window.localStorage;
let contacts = [];
let allContacts =[];

const btToggle = document.getElementById("btToggle");
const sideMenu = document.getElementById('menuButtons');
const container = document.getElementById('container');

btToggle.onclick =() =>{
    if(sideMenu.style.width == '0px'){
        sideMenu.style.width = '200px';
        container.style.marginLeft = '200px';
    }else{
        sideMenu.style.width = 0;
        container.style.marginLeft = 0;
    }
}

const getAll = async () => {
    const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts/');
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
     if(Math.ceil(scrolled) >= scrollable){
            if(favAux.getItem('flag') == true){ //Se clicou na aba de favoritos      
                loadMore();
            }else{
                loadMore();
            } 
        }
    }
})

getAll().then(() => {
    contacts = allContacts;
    if(favAux.getItem('flag') == null){  
        favAux.setItem('flag', false);
        loadMore();
    }else if (favAux.getItem('flag') == 'false'){
        contacts = allContacts;
        loadMore();
    }else{
        contacts = getAllFavorites();
        loadMore();
    }
});


const contactsDiv = document.getElementById('contactList');
let index = 0;
/*FUNÇÃO QUE LISTA CONTATOS*/
export const loadMore = function (reset) {
    if(reset == 1){
        index = 0;
        contactsDiv.innerHTML = "";
    }
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

const btFavContacts = document.getElementById('aFavorites');
btFavContacts.addEventListener('click', function(){
    favAux.setItem('flag', true);
    contacts = getAllFavorites();
    loadMore(1);
});

const btHome = document.getElementById('aHome');
btHome.addEventListener('click', function(){
    favAux.setItem('flag', false);
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
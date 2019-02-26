import './css/index.css'
import './js/api'
import './js/modal'

import {isFavorite} from  './js/contact';
import {openModal} from './js/modal';

let contacts = [];
const favorites =[];

const getAll = async () => {
    const res = await fetch('http://contacts-api.azurewebsites.net/api/contacts/')

    const data = await res.json();
    window.state = {
        ...window.state,
        allContacts: data,
        loading: false
    }

    contacts = data;
}

/*INFINITE SCROLL*/
window.addEventListener('scroll',() =>{
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (index < contacts.length) {
        if(Math.ceil(scrolled) >= scrollable){
            loadMore();
        }
    }
})

getAll().then(() => {
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
        if (index == contacts.length - 1) {
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
                }
            }
        }
    }
}
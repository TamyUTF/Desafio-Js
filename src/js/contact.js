import fav from '../img/icon-fav-full.png';
import nfav from '../img/icon-fav.png';

export const getAllFavorites = function (){
    const {allContacts} = window.state;
    const favorites = allContacts.filter(contact => contact.isFavorite == true);
    return favorites;
}

export const searchContact = function (search) {
    const {allContacts} = window.state;

    const foundContacts = allContacts.filter(contacts => new RegExp(search.toLowerCase()).test(contacts.firstName.toLowerCase()));
    return foundContacts;
}

/*ATRIBUI ICONE DE FAVORITO*/
export const isFavorite = function(contact)  {
    if (contact.isFavorite) {
        return fav;
    } else {
        return nfav;  
    }
}


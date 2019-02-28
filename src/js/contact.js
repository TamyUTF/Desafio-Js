import fav from '../img/icon-fav-full.png';
import nfav from '../img/icon-fav.png';

export const myFavs = window.localStorage;

let favorites=[];

export const getAllFavorites = function (contacts){
    favorites = [];
    for(let i = 0; i < contacts.length ; i++){
        if(myFavs.getItem(contacts[i].id) != null){
            favorites.push(contacts[i]);
        }
    }
    return favorites;
}

export const removeFavorite = function (contact) {
    for(let i = 0; i < favorites.length; i++){
        if(myFavs.getItem(contact.id)){
            favorites.splice(i,1);
            break;
        }
    }
}

/*ATRIBUI ICONE DE FAVORITO E SETA OS CONTATOS FAVORITOS*/
export const isFavorite = function(contact)  {
    if (contact.isFavorite) {  //se ele for favorito    
        if(myFavs.getItem(contact.id) != null){ //se estiver no LS
            return fav; 
        }else{
            myFavs.setItem(contact.id,true); //add no LS //add no array
            return fav;
        }
    } else {
        if(myFavs.getItem(contact.id) != null){//se for falso, mas estiver como favorito no LS
            contact.isFavorite = true;
            return fav;   
        }else{
            return nfav;
        }   
    }
}


import fav from '../img/icon-fav-full.png';
import nfav from '../img/icon-fav.png';

/*FUNÇÃO PARA ATRIBUIR ICONE DE FAVORITO NO CARD*/
export const isFavorite = function(contact)  {
    if (contact.isFavorite) {
        //myFavs.setItem(contact.id, true);
        return fav;
    } else {
        return nfav;
    }
}
import {openModal} from './modal';

export const updateContact = async (contactJSON, contact)=>{

     try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${contact.id}`,{
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: contactJSON
            }
        )
        if (res.status == 200) {
            window.location.reload(); 
            console.log('usuario modificado');
        }
    } catch (e) {
        console.error('Erro ao editar contato: ' + e);
        alert('Não foi possível editar o contato');
    }
}

export const createContact = async (contactJSON) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts`,{
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: contactJSON
            }
        )
        console.log(res.status);
        if (res.status == 201) { 
            alert("Contado adicionado! :D");
            window.location.reload();
        }
        
    } catch (e) {
        console.error('Erro ao editar contato: ' + e);
        alert("Não foi possível adicionar o contato :'(");
    }
}

export const deleteContact = async (contact) => {
    try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${contact.id}`,{
                method: 'DELETE'
            }
        )
        if (res.status == 200) { 
            alert("Contado deletado! :D");
            window.location.reload();
        }
    } catch (e) {
        console.error('Erro ao editar contato: ' + e);
        alert("Não foi possível deletar o contato :'(");
    }
}
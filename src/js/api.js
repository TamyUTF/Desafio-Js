export const updateContact = async (contactJSON, contact)=>{

     try {
        const res = await fetch(`http://contacts-api.azurewebsites.net/api/contacts/${contact.id}`,{
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: contactJSON
            }
        )
        if (res.status == 200) { 
            alert("Contado atualizado! :D");
        }
        throw await res.json()
    } catch (e) {
        console.error('Erro ao editar contato: ' + e);
        alert('Não foi possível editar o contato');
    }
}
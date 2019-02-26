const modalDiv = document.getElementById('modal');

const elementsModalDOM = {
    header: document.getElementById('modal-header'),
    email:document.getElementsByClassName('mEmail')[0],
    phone: document.getElementsByClassName('mPhone')[0],
    gender: document.getElementsByClassName('mGender')[0],
    company: document.getElementsByClassName('mCompany')[0],
    address: document.getElementsByClassName('mAddress')[0],
    comments: document.getElementsByClassName('mComments')[0] 
}

const closeModal = function (e) {
    if (e.target == modalDiv) {
        modalDiv.style.display = 'none';
    }
}
window.addEventListener('click', closeModal);


export const openModal = async (contact)=>{

    modalDiv.style.display = 'block';
    let h = document.createElement("h3");


    elementsModalDOM.header.setAttribute(h,);
    elementsModalDOM.header.innerHTML;
    innerElement(elementsModalDOM.email,contact.email);
    innerElement(elementsModalDOM.phone,contact.info.phone);
}

const innerElement = (targetElement, data) =>{
    let parent = targetElement.parentNode;
    let newElement = document.createElement("p");
    newElement.innerHTML=`${data}`;

    if(parent.lastChild == targetElement){
        parent.innerHTML(newElement);
    }else{
        parent.insertBefore(newElement, targetElement.nextSibling);
    }

}
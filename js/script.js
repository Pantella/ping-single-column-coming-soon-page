
let main = ()=>{
    let form = document.querySelector("#mainSecForm");
    let mailInput = document.querySelector("#emailInput");
    let mailInputMessage = document.querySelector("#invalidInputMessage");
    let submitBtn = document.querySelector("#submitBtn");

    let alertMail = document.querySelector("#alert");
    let alertBtn = document.querySelector("#alertDismiss");

    let checkMail = (mail)=>{
        let regExMail = "[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+" ;
        let regex = new RegExp(regExMail);

        if (!mail) {
            return false
        } else {
            return regex.test(mail)
        }
    };

    let sendMail = (evt)=>{
        evt.preventDefault();

        let emailInserted = mailInput.value;

        console.log(`Inserted email: ${emailInserted}`);

        if (checkMail(emailInserted)) {

            let showAlert = ()=>{
                alertMail.classList.remove('alertHide');

                alertBtn.addEventListener('click',()=>{
                    alertMail.classList.add('alertHide');
                });
            };

            showAlert();

            mailInput.value = '';
            mailInput.classList.remove('invalid');
            mailInputMessage.classList.add('labelHide');
            mailInputMessage.classList.remove('invalidInput','invalid');

            let formDataEmail = new FormData(form);
            let xhr = new XMLHttpRequest();

            xhr.onload = ()=>{
                if ( xhr.status === 200 ) {
                    console.log('Form data correctly sent');
                    console.log(`Response: ${xhr.responseText}`);
                } else {
                    console.warn(`Status is not 200 but ${xhr.status}...`);
                    console.warn(`Response: ${xhr.responseText}`);
                }
            };

            xhr.onerror = ()=>{
                console.error('An Error occurred sending data...');
            };

            xhr.open('POST','/');
            xhr.send(formDataEmail);
        } else {
            console.error('Not Valid Email!!!');
            mailInput.classList.add('invalid');
            mailInputMessage.classList.remove('labelHide');
            mailInputMessage.classList.add('invalidInput','invalid');
        }
    };

    submitBtn.addEventListener("click",sendMail);
    mailInput.addEventListener('focusin',()=>{
        mailInput.setAttribute('placeholder','');
    });
    mailInput.addEventListener('focusout',()=>{
        mailInput.setAttribute('placeholder','Your email address...');
    });

};

document.addEventListener("DOMContentLoaded",main);

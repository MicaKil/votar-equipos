// 4. Cuando el usuario presione el botón “Enviar”, funciones escritas en JavaScript deberán verificar, del lado del cliente, que el e-mail ingresado 
// tiene el formato correcto, es decir, debe cumplir:
    // i. Tener al menos 7 caracteres.
    // ii. Tener una @, pero no al principio ni al final.
    // iii. Tener un punto, pero no al principio ni al final.
    // iv. No tener caracteres especiales (#, !, %, $, etc.).
// Además, debe verificar que el usuario seleccionó una de las opciones.
// En caso de que el e-mail ingresado no cumplan alguno de estos requisitos, o el usuario no haya seleccionado una opción, la página web deberá indicar la
// condición no cumplida y solicitar corregir el error.

function check_ans() {
    // se optiene el email del input
    return(check_option() && check_mail())
}

// se fija que haya marcado una opción
function check_option(){
    var checked_team = document.querySelector('input[name = "equipo"]:checked');
    if(!checked_team){ 
        alert('Por favor seleccione una opción.'); 
        return (false)
    }
    return (true)
}

//==============================================================================================
//funciones para verificar mail
// verifica que el mail ingresado sea correcto.
function check_mail() {
    let mail = document.forms["teams"]["email"].value; 
    //exp regular que describe el formato de un email
    mail_regExp = /^\w+([-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!(mail_regExp.test(mail))) {
        if (mail == "") {
            alert("El email no puede quedar vacío.\nPor favor, corríjalo.");
            return (false)
        } else if (mail.length < 7) { //tener al menos 7 caracteres.
            alert("El email debe tener más de 7 caracteres.\nPor favor, corríjalo.");
            return (false)
        } else {
            if (check_at_sign(mail) && check_dot(mail) && check_special_char(mail)) {
                //si el error no está en ninguno de esos...
                alert("El formato de email es incorrecto.\nPor favor, corríjalo.") //por ejemplo el orden está mal
            }  
            return (false)
        }
    }
    return (true) //El formato de mail es correcto.
}

//verifica el uso correcto de @
function check_at_sign(mail) {
    at_match = mail.match("@")
    if (!at_match) { //no hay @
        alert("El email debe contener un (1) \"@\".\nPor favor, corríjalo.");
        return (false)
    }
    count = at_match.length
    if (count > 1) { //hay más de un @
        alert("El email debe contener un (1) \"@\".\nPor favor, corríjalo.");
        return (false)
    } else if (mail.startsWith("@")) {
        alert("El email no puede empezar con \"@\".\nPor favor, corríjalo.");
        return (false)
    } else if (mail.endsWith("@")) {
        alert("El email no puede terminar con \"@\".\nPor favor, corríjalo.");
        return (false)
    }
    return (true) //@ se usa de forma correcta
}

//verifica el uso correcto de "."
function check_dot(mail) {
    dot_match = mail.match(/\./g)
    if (!dot_match) { //no hay "." - null se trata como false
        alert("El email debe contener un (1) \".\".\nPor favor, corríjalo.");
        return (false)
    } else if (mail.startsWith(".")) {
        alert("El email no puede empezar con \".\".\nPor favor, corríjalo.");
        return (false)
    } else if (mail.endsWith(".")) {
        alert("El email no puede terminar con \".\".\nPor favor, corríjalo.");
        return (false)
    }
    return (true) //@ se usa de forma correcta
}

function check_special_char(mail) {
    // The \W metacharacter matches non-word characters:
    // A word character is a character a-z, A-Z, 0-9, including _ (underscore).
    if (/[^\w\.\-@]/g.test(mail)) { // si cont. char dist. de a-z, 0-9,_ ,- ,. y @...
        alert("El email no puede tener caracteres especiales (#, !, %, $, etc.).\nPor favor, corríjalo.");
        return (false)
    }
    return(true)
}
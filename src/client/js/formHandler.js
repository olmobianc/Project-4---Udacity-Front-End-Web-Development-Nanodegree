// check what text was put into the form field
function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "http://localhost:8080/sentimentAPI";
    const url = document.getElementById('url').value;

    //CHECK IF URL IS VALID
    if (validUrl(url)) {
        fetch(baseURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url})
        })
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('polarity').innerHTML = res.polarity
                document.getElementById('subjectivity').innerHTML = res.subjectivity
                document.getElementById('confidence').innerHTML = res.confidence
                document.getElementById('irony').innerHTML = res.irony
            })
    } else {
        alert("The URL is not valid. Please isert another one.")
    }
}

//IMPORT FILES
import { validUrl } from './js/validURL'
//EXPORT FILES
export {handleSubmit}

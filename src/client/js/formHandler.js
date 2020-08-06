import { validUrl } from './validURL'

function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "http://localhost:8081/sentimentAPI";
    const url = document.getElementById('url').value; //url inserted by user
    console.log(url);

    //CHECK IF URL IS VALID
    if (validUrl(url)) {
        fetch(baseURL, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url})
        })
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('polarity').innerHTML = res.polarity;
            document.getElementById('subjectivity').innerHTML = res.subjectivity;
            document.getElementById('confidence').innerHTML = res.confidence;
            document.getElementById('irony').innerHTML = res.irony;
        })
        .catch((error) => {
            console.log(" an error", error);
        })
    } else {
        alert("The URL is not valid. Please isert another one.")
    }
}

//EXPORT FILES
export { handleSubmit }

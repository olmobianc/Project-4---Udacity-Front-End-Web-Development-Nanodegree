import { validUrl } from './validURL'

function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "http://localhost:8080/sentimentAPI";
    const url = document.getElementById('url').value;
    console.log(url);

    //CHECK IF URL IS VALID
    if (validUrl(url)) {
        fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${url}&model=general&lang=en`, {
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
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity
            document.getElementById('confidence').innerHTML = res.confidence
            document.getElementById('irony').innerHTML = res.irony
        })
        .catch((error) => {
            console.log("error", error);
        })
    } else {
        alert("The URL is not valid. Please isert another one.")
    }
}

//EXPORT FILES
export { handleSubmit }

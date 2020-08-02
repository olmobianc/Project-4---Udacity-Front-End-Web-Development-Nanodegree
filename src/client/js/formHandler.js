function handleSubmit(event) {
    event.preventDefault()

    const baseURL = "http://localhost:8081/sentimentAPI";
    const url = document.getElementById('url').value;
    console.log(url);

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
            .then(res => console.log('Success: ', res))
            .then(function (res) {
                document.getElementById('polarity').innerHTML = res.polarity
                document.getElementById('subjectivity').innerHTML = res.subjectivity
                document.getElementById('confidence').innerHTML = res.confidence
                document.getElementById('irony').innerHTML = res.irony
            })
            .catch((error) => {
            console.log(error);
          });
    } else {
        alert("The URL is not valid. Please isert another one.")
    }
}

//IMPORT FILES
import { validUrl } from './validURL'
//EXPORT FILES
export { handleSubmit }

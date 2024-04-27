
import { isValidURL } from './validateURL';

//adding event listener for form submission

document.addEventListener('DOMContentLoaded', function () {

 const form = document.getElementById('dataForm');
    
 form.addEventListener('submit',handleSubmit )
    
    });

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    
    if (isValidURL(formText)) {
        // If the URL is valid, send it to the server 
        sendDataToServer('/api', { url: formText })
        .then(response => {
        console.log('Server response:', response);
        // Handle the response from the server and update dom 
        document.getElementById('results').innerHTML = response.score_tag;
        document.getElementById('polarity').innerHTML = response.polarity;
        document.getElementById('agreement').innerHTML = response.agreement;
        document.getElementById('confidence').innerHTML = response.confidence;
        document.getElementById('irony').innerHTML = response.irony;
        document.getElementById('subjectivity').innerHTML = response.subjectivity;
    })
    .catch(error => {
    console.error('Error:', error);
    // Handle errors 
  });
    } else {
    alert('Invalid URL');
    console.log('Invalid URL');
    // Handle invalid URL 
    
     }
}  

// Function to send data to the server

const sendDataToServer = async (url = '', data = {}) => {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      return response.json();
  } catch (error) {
      throw error;
  }
};


export { handleSubmit };
export { sendDataToServer };

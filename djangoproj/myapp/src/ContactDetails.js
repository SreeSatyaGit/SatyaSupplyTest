
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactDetails() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/hello-world/')
          .then(response => {
            setMessage(response.data.message);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

  return (
    <section id="contact">
      <h1>Get in Touch</h1>
      <p>
        {message}
      </p>
      <p>
      k.vanaja@northeastern.edu
      </p>
    </section>
  );
}

export default ContactDetails;
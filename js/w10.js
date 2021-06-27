const getPost = () => {
  let num = document.getElementById('postNum').value;
  console.log(`Fetching Post #${num}`);
  fetch(`https://jsonplaceholder.typicode.com/posts/${num}`)
    .then(response => response.json())
    .then(json => {
      let outputTo = document.getElementById('getPostContainer');
      outputTo.innerHTML = `
      <h3>Title: ${json.title}</h3>
      <h4>Created by User: ${json.userId}</p>
      <p>${json.body}</p>`;
      outputTo.setAttribute('data-status', '');
    })
    .catch(err => console.log(err))
};

const newPost = () => {
  let title = document.querySelector('#postTitle').value;
  let body = document.querySelector('#postBody').value;
  let userId = document.querySelector('#postUserId').value;
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      let outputNewPostTo = document.querySelector('#newPostContainer');
      outputNewPostTo.innerHTML = `
      <h3>Title: ${json.title}</h3>
      <h4>Created by User: ${json.userId}</p>
      <p>${json.body}</p>`;
      outputNewPostTo.setAttribute('data-status', '');
    });
};

const updatePost = () => {
  let updatedBody = document.querySelector('#updatePostBody').value;
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: 'Updated Post',
        body: updatedBody,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      let outputUpdatedPostTo = document.querySelector('#updatePostContainer');
      outputUpdatedPostTo.innerHTML = `
      <h3>Title: ${json.title}</h3>
      <h4>Created by User: ${json.userId}</p>
      <p>${json.body}</p>`;
      outputUpdatedPostTo.setAttribute('data-status', '');
    });
};


const form = document.querySelector('#customForm');
const telNum = document.querySelector('#telNum');
const telNumError = document.querySelector('#telNum + span.error');

telNum.addEventListener('input', e => {
  if (telNum.validity.valid) {
    telNumError.textContent = '';
    telNumError.className = 'error';
  } else {
    showError();
  }
})


function showError() {
  if (telNum.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    telNumError.textContent = 'You need to enter a phone number.';
  } else if (telNum.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    telNumError.textContent = `The phone number should be at least ${ telNum.minLength } characters; you entered ${ telNum.value.length }.`;
  } else if (telNum.validity.patternMismatch) {
    // If the field doesn't contain a phone number
    // display the following error message.
    telNumError.textContent = 'Entered value needs to be formated like this: (123) 456-7890.';
  }
  // Set the styling appropriately
  telNumError.className = 'error';
}
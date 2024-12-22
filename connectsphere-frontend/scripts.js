// User Login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
        return;
    }

    // Get stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Login successful!');
        window.location.href = 'profile.html';  // Redirect to profile
    } else {
        alert('Invalid username or password.');
    }
});

// User Registration
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Save user data to localStorage
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';  // Redirect to login page
});

// Like Post Handler
function likePost(postId) {
    const likeCountElement = document.getElementById(`like-count-${postId}`);
    let currentLikes = parseInt(likeCountElement.textContent);
    currentLikes++;
    likeCountElement.textContent = currentLikes;

    alert('You liked the post!');
}

// Toggle Comment Section
function toggleCommentSection(postId) {
    const commentSection = document.getElementById(`comments-section-${postId}`);
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

// Add Comment Handler
function addComment(postId) {
    const commentText = document.getElementById(`comment-text-${postId}`).value;

    if (commentText) {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentText;

        const commentsList = document.getElementById(`comments-list-${postId}`);
        commentsList.appendChild(newComment);

        document.getElementById(`comment-text-${postId}`).value = '';  // Clear comment input
    } else {
        alert('Please write a comment before adding.');
    }
}

// Handle Sending a Message
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting and refreshing the page

    const messageContent = document.getElementById('message-content').value;

    if (messageContent) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
            <div class="message-sender">You:</div>
            <div class="message-text">${messageContent}</div>
        `;

        const messageList = document.getElementById('message-list');
        messageList.appendChild(newMessage);

        // Save the message in localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ sender: 'You', text: messageContent });
        localStorage.setItem('messages', JSON.stringify(messages));

        // Clear the message input field
        document.getElementById('message-content').value = '';

        // Redirect to feed after sending the message
        window.location.href = 'feed.html';  // Redirect to feed page
    } else {
        alert('Please type a message before sending.');
    }
});

// Profile Edit Form Submission
document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    const bio = document.getElementById('new-bio').value;

    if (bio) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        storedUser.bio = bio;
        localStorage.setItem('user', JSON.stringify(storedUser));

        alert('Profile updated successfully!');
        window.location.href = 'feed.html';  // Redirect to feed page
    } else {
        alert('Please fill in your bio!');
    }
});

// Load Messages from LocalStorage
window.onload = function() {
    const messageList = document.getElementById('message-list');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `
            <div class="message-sender">${message.sender}:</div>
            <div class="message-text">${message.text}</div>
        `;
        messageList.appendChild(messageDiv);
    });
};

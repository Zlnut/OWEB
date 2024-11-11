document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const postsContainer = document.getElementById('posts-container');

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('upload-image');
        const commentInput = document.getElementById('comment');

        const file = fileInput.files[0];
        const comment = commentInput.value;

        if (file && comment) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageUrl = event.target.result;
                createPost(imageUrl, comment);
            };
            reader.readAsDataURL(file);

            // Clear form inputs
            fileInput.value = '';
            commentInput.value = '';
        }
    });

    function createPost(imageUrl, comment) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <img src="${imageUrl}" alt="Zastava 750">
            <p>${comment}</p>
            <div class="likes">
                <span class="like-button">❤️ Like</span>
                <span class="like-count">0</span> Likes
            </div>
        `;

        // Like functionality
        const likeButton = postElement.querySelector('.like-button');
        const likeCount = postElement.querySelector('.like-count');

        likeButton.addEventListener('click', () => {
            let count = parseInt(likeCount.textContent);
            likeCount.textContent = count + 1;
        });

        postsContainer.prepend(postElement);
    }
});

const postTitleInputNode = document.querySelector('.js-title-input');
const postTextInputNode = document.querySelector('.js-text-input');
const publicationBtnNode = document.querySelector('.js-publicate_post-btn');
const postsNode = document.querySelector(".js-posts");
const errorNode = document.querySelector(".js-input__error");

document.querySelector('.js-publicate_post-btn').disabled = false;

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;
const posts = [];

publicationBtnNode.addEventListener('click', function(){
    // Получить данные из поля ввода
    const postFromUser = getPostFromUser();

    // сохранить пост
    addPost(postFromUser);

    // отобразить пост в браузере
    renderPosts();

});

// Проверка количества введенных символов
postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;
    return {
        title: title,
        text: text,
    };
};

function addPost({title, text}) {
    posts.push({
        title,
        text
    });
};

function getPosts(){
    return posts;
}

function renderPosts() {
    const posts = getPosts();
    let postsHtml = '';
    let currentDate = new Date();
    let time = `${currentDate.getHours()}:${currentDate.getMinutes()}`
    posts.forEach(post => {

        postsHtml += `
        <div class = "post">
            <p class = "post__title">${post.title}</p>
            <p class = "post__date">${currentDate.toLocaleDateString()} ${time}</p>
            <p class = "post__text">${post.text}</p>
        </div>
        `}
    );
    postsNode.innerHTML = postsHtml;
}

function clearError() {
    errorNode.innerHTML = '';
}

function validation() {
    const titleLen = postTitleInputNode.value.length;
    const textLen = postTextInputNode.value.length;
    
    if (titleLen > TITLE_VALIDATION_LIMIT) {
        
        errorNode.innerHTML = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
        errorNode.classList.remove('input__error-hidden');
        document.querySelector('.js-publicate_post-btn').disabled = true;
        return;
    };

    if (textLen > TEXT_VALIDATION_LIMIT) {
        
        errorNode.innerHTML = `Длиина поста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        errorNode.classList.remove('input__error-hidden');
        document.querySelector('.js-publicate_post-btn').disabled = true;
        return;
    }

    document.querySelector('.js-publicate_post-btn').disabled = false;

    errorNode.classList.add('input__error-hidden');
}

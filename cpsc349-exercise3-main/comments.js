// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts (page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments (postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName (userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}

// ASSIGNMENT CODE

const main = document.querySelector('main')

const posts = await downloadPosts()
for (const post of posts) {
  const author = await getUserName(post.userId)
  const body = post.body.replaceAll("\n", "<br>")
  const article = document. createElement('article')
  article.dataset.postId = post.id
  article.innerHTML = `
    <h2>${post.title}</h2>
    <aside>by <span class="author">${author}</span></aside>
    <p>
      ${body}
    </p>
    `
    main.appendChild(article)

  const details = document.createElement('details')
  details.innerHTML = `
    <summary>See what our readers had to say...</summary>
    <section>
        <header>
            <h3>Comments</h3>
        </header>
    </section>
    `
    main.appendChild(details)
}

const details = document.getElementsByTagName('details')
for (const detail of details) {
  detail.addEventListener('toggle', async event => {
    if (!detail.open) {
      return;
    }

    const asides = detail.getElementsByTagName('aside')
    const commentsWereDownloaded = asides.length > 0
    if (!commentsWereDownloaded) {
      const articleId = getArticleId(detail)
      const comments = await downloadComments(articleId)
      for (const comment of comments) {
        const body = comment.body.replaceAll("\n", "<br>")
        const aside = document.createElement('aside')
        aside.innerHTML = `
          <p>
            ${body}
          </p>
          <p><small>${comment.name}</small></p>
        `

        const section = detail.querySelector('section')
        section.appendChild(aside)
      }
    } 
  })
}

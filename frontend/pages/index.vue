<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">frontend</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <div style="margin: 2em 0">
        <form @submit="handleGetForm">
          <input v-model="topic" type="text" placeholder="topic" required />
          <input type="submit" value="get" />
        </form>
      </div>
      <div style="margin: 2em 0">
        <form @submit="handlePostForm">
          <input v-model="topic" type="text" placeholder="topic" required />
          <input v-model="message" type="text" placeholder="message" required />
          <input type="submit" value="post" />
        </form>
      </div>
      <div style="margin: 2em 0">
        <form @submit="handleDeleteForm">
          <input v-model="topic" type="text" placeholder="topic" required />
          <input type="submit" value="delete" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topic: '',
      message: '',
    }
  },
  methods: {
    handleGetForm(e) {
      e.preventDefault()
      this.$axios
        .get('/topics/' + this.topic)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handlePostForm(e) {
      e.preventDefault()
      this.$axios
        .post('/topics/' + this.topic, {
          message: this.message,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleDeleteForm(e) {
      e.preventDefault()
      this.$axios
        .delete('/topics/' + this.topic)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

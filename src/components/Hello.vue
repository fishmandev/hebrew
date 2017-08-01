<template>
    <div class="hello">
        <ul>
            <li v-for="item of items">
                <router-link :to="{ name: 'Lesson', params: { id: item.id } }">{{ item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'hello',
    data () {
      return {
        items: []
      }
    },
    created () {
      axios.get('http://10.0.3.173/lesson')
        .then(response => {
          this.items = response.data.lessons
        })
    }
  }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        font-size: 18px;
    }
</style>

new Vue({
  el: '#app',
  data: {
    items: [],
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const URL = 'https://public-api.wordpress.com/rest/v1.1/sites/lakonhidup.wordpress.com/posts/?fields=ID,title,author,date,short_URL,excerpt,categories,attachments,tags&page=1&number=100';
      axios.get(URL).then((response) => {
        response.data.posts.forEach((val) => {
          val.tags = Object.values(val.tags);
          val.categories = Object.values(val.categories);
        })
        this.items = response.data.posts;
      });
    },
  },
})

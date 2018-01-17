const BLOGURL = 'lakonhidup.wordpress.com';
const APIURL = `https://public-api.wordpress.com/rest/v1.1/sites/${BLOGURL}/posts/?fields=ID,title,author,date,short_URL,excerpt,categories,attachments,tags&page=1&number=100`;

new Vue({
  el: '#app',
  data: {
    items: [],
    blogURL: BLOGURL,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get(APIURL).then((response) => {
        response.data.posts.forEach((val) => {
          val.tags = Object.values(val.tags);
          val.categories = Object.values(val.categories);
        })
        this.items = response.data.posts;
      });
    },
  },
})

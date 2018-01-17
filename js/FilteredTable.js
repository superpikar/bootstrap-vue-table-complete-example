let fields = ['ID', 'title', 'short_URL', 'tags', 'categories', 'actions'];
fields = fields.map((val) => {
  if (val === 'tags' || val === 'categories') {
    return {
      key: val,
      sortable: true,
      formatter: 'getRelationTitle',
    };
  } else if (val === 'actions') {
    return {
      key: val,
    }
  }
  return {
    key: val,
    sortable: true,
  }
});

Vue.component('filtered-table', {
  name: 'filtered-table',
  props: {
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    console.log('table mounted', this.items.length);
  },
  data() {
    return {
      filter: null,
      pagination: {
        totalRows: this.items.length,
        currentPage: 1,
      },
      options: {
        fields,
        perPage: 10,
        pageOptions: [ 10, 25, 50 ],
      },
    };
  },
  template: `
    <div class="filtered-table">
      <div class="table-title">
        Table of {{label}}
      </div>
      <div class="row table-control">
        <div class="col-md-3">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="clearFilter">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-3">
          <b-form-group horizontal label="#data" class="mb-0">
            <b-form-select :options="options.pageOptions" v-model="options.perPage" />
          </b-form-group>
        </div>
      </div>
      <b-table 
        striped
        hover 
        show-empty
        :items="items" 
        :fields="options.fields"
        :current-page="pagination.currentPage"
        :per-page="options.perPage"
        :filter="filter"
        @filtered="onFiltered"
      >
        <template slot="actions" slot-scope="row">
          <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
          <b-button size="sm" @click.stop="openDetail(row)" class="mr-2">
            See detail
          </b-button>
        </template>
      </b-table>
      <div class="table-pagination">
        <b-pagination :total-rows="pagination.totalRows" :per-page="options.perPage" v-model="pagination.currentPage" class="my-0" />
      </div>
    </div>
  `,
  methods: {
    getRelationTitle(relation) {
      if (relation.length > 0) {
        return relation[0].name;
      }
      return '-';
    },
    openDetail(item) {
      console.log(JSON.parse(JSON.stringify(item)));
    },
    clearFilter() {
      this.filter = '';
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.pagination.totalRows = filteredItems.length
      this.pagination.currentPage = 1
    }
  },
});

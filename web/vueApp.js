
var vueApp = new Vue({
  el: '#app',
  data: () => ({
    dialog: false,
    drawer: false,
    headers: [
      { text: 'Name', align: 'center', value: 'name' },
      { text: 'Type', align: 'center', value: 'type' },
      { text: 'IP', align: 'center', value: 'ip' },
      { text: 'Port', align: 'center', value: 'port' },
      { text: 'Middleware', align: 'center', value: 'middleware' },
      { text: 'Python', align: 'center', value: 'python' },
      { text: 'Edit', value: 'edit', sortable: false }
    ],
    items_robots: "[]",
    robots: [],
    editedIndex: -1,
    editedItem: { name: '', type: "pepper", ip: "192.168.0.100", port: 9559, middleware: "ZMQ", python: "default" },
    defaultItem: { name: '', type: "pepper", ip: "192.168.0.100", port: 9559, middleware: "ZMQ", python: "default" }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New robot' : 'Edit robot'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.items_robots = rize_robots
    this.initialize()
    console.log(this.robots)
  },

  methods: {
    initialize() {
      this.robots = nepRize.onLoadRobots()
    },

    editItem(item) {
      this.editedIndex = this.robots.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    onDelete() {
     
        name = this.robots[this.editedIndex]["name"]
        nepRize.onDeleteRobot(name)
    
      this.robots.splice(this.editedIndex, 1)
      this.close()
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.robots[this.editedIndex], this.editedItem)
      } else {
        this.robots.push(this.editedItem)
      }
      this.close()
      this.update()
    },

    onDrawer: function () {
      this.drawer = !this.drawer
      this.drawer ? document.getElementById("Area").style.marginRight = "300px" : document.getElementById("Area").style.marginRight = "0px"
    },

    onHome() {
      window.location.href = "http://" + window.location.host
    },

    update() {
      let path = nepRize.pathRIZE + "/robots/" 
      this.robots.forEach(element => {
        nepRize.onSaveJSON(path + element["name"] + ".json", element)
      });
    },
  }
})
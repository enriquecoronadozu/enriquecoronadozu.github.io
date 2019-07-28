class Rize {

  constructor() {
    this.path = require('path');
    this.fs = require('fs');
    this.pathRIZE = 'C:/Rize'
    this.directoryProjects = this.pathRIZE + '/projects';

    this.onCreateFolder(this.pathRIZE)
    this.onCreateFolder(this.directoryProjects)

    this.list_projects = [];
  }

  onCreateFolder(path) {
    if (!this.fs.existsSync(path)) {
      this.fs.mkdirSync(path);
    }
  }

  onSaveBlockProgram(project_name) {
    var path_project = this.directoryProjects + "/" + project_name
    this.onCreateFolder(path_project)
    this.onCreateFolder(path_project + "/goal")
    this.onCreateFolder(path_project + "/goal/js")
    this.onCreateFolder(path_project + "/goal/json")
    this.onCreateFolder(path_project + "/goal/xml")
    this.onCreateFolder(path_project + "/reaction")
    this.onCreateFolder(path_project + "/reaction/js")
    this.onCreateFolder(path_project + "/reaction/json")
    this.onCreateFolder(path_project + "/reaction/xml")
    this.onCreateFolder(path_project + "/module")
    this.onCreateFolder(path_project + "/module/js")
    this.onCreateFolder(path_project + "/module/json")
    this.onCreateFolder(path_project + "/module/xml")
    this.onCreateFolder(path_project + "/behavior")
    this.onCreateFolder(path_project + "/behavior/js")
    this.onCreateFolder(path_project + "/behavior/json")
    this.onCreateFolder(path_project + "/behavior/xml")


  }

  onBuildBlockCodeJS(project_name) {

    var path_project = this.directoryProjects + "/" + project_name

    var reaction_files = this.onGetListFiles(path_project + "/reaction/js")
    var goals_files = this.onGetListFiles(path_project + "/goal/js")
    var behaviors_files = this.onGetListFiles(path_project + "/behavior/js")
    var modules_files = this.onGetListFiles(path_project + "/module/js")

    var initial = "var " + project_name + "= { \n"
    var final = "\n }"
    var middle = ""


    var all_files = [[reaction_files, "/reaction/js"], [goals_files, "/goal/js"], [behaviors_files, "/behavior/js"], [modules_files, "/module/js"]]
    for (let index = 0; index < all_files.length; index++) {
      var sfiles = all_files[index];
      for (let index2 = 0; index2 < sfiles[0].length; index2++) {
        var file = sfiles[0][index2]
        var path2read = path_project + sfiles[1] + "/" + file
        var text = this.onReadFile(path2read)
        middle = middle + "\n" + text
      }
    }
    var code = initial + middle + final
    this.onSaveFileSync(path_project + "/code.js", code)
  }

  getListProjects() {
    return this.list_projects
  }

  getPathProjects() {
    return this.directoryProjects
  }

  onUpdateProjects() {
    this.list_projects = this.onGetListFiles(this.directoryProjects)
  }

  onGetListFiles(path) {
    return this.fs.readdirSync(path)
  }

  onReadJSONFile(path) {
    let rawdata = this.fs.readFileSync(path);
    let json_value = JSON.parse(rawdata);
    return json_value
  }

  onReadFile(path) {
    console.log(path)
    let rawdata = this.fs.readFileSync(path)
    return rawdata
  }

  onLoadProject(project_name) {
    let full_path = this.directoryProjects + "/" + project_name + "/config.json"
    let config = this.onReadJSONFile(full_path);
    return config
  }

  onLoadRobots() {
    // Read robots from folder
    var full_path = this.pathRIZE + "/robots"
    var list_robots = this.onGetListFiles(full_path)
    var list_dict_robots = []
    // Push list of robots (in a dictionary)
    for (let index = 0; index < list_robots.length; index++) {
      let robot = this.onReadJSONFile(full_path + "/" + list_robots[index])
      list_dict_robots.push(robot)
    }
    // return as a dictionary with a list
    return list_dict_robots
  }

  onDeleteFile(filePath) {
    this.fs.unlinkSync(filePath)
  }

  onDeleteRobot(name) {
    let filePath = this.pathRIZE + "/robots/" + name + ".json"
    this.onDeleteFile(filePath)
  }

  onSaveJSON(path, output) {
    var value = JSON.stringify(output)
    this.fs.writeFile(path, value, (err) => {
      if (err) console.log(err);
      console.log(path);
    });
  }


  onSaveFile(path, value) {
    this.fs.writeFile(path, value, (err) => {
      if (err) console.log(err);
      console.log(path);
    });
  }

  onSaveFileSync(path, value) {
    this.fs.writeFileSync(path, value)
  }
}
var nepRize = new Rize();
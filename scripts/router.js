import TaskView from './views/taskToAdd';
import ListView from './views/list';
import {TaskCollection} from './models/tasks';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
	},

	initialize: function() {
		this.tasks = new TaskCollection();
	},

	index: function() {
		var NewTask = new TaskView({collection: this.tasks});
		$('#header').append(NewTask.el);

		this.tasks.fetch().then(function() {
			this.taskList = new ListView({collection: this.tasks});
			$('#main').prepend(this.taskList.el);
		}.bind(this));
		console.log(this);
		
	}

});

var router = new Router();
export default router;
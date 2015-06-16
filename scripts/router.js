import TaskView from './views/taskToAdd';
import ListView from './views/list';
import TasksLeft from './views/left';
import {TaskCollection} from './models/tasks';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'active': 'active',
		'completed': 'completed'
	},

	initialize: function() {
		this.tasks = new TaskCollection();

		var NewTask = new TaskView({collection: this.tasks});
		$('#header').append(NewTask.el);

		this.fetchedTasks = this.tasks.fetch().then(function() {
			this.filteredTasks = this.tasks.clone();
			this.filteredTasks.listenTo(this.tasks, 'add', this.filteredTasks.add);
			this.filteredTasks.listenTo(this.tasks, 'remove', this.filteredTasks.remove);
			this.taskList = new ListView({collection: this.filteredTasks});
			$('#main').prepend(this.taskList.el);
			this.tasksLeft = new TasksLeft({collection: this.tasks});
			$('#footer').prepend(this.tasksLeft.el);
		}.bind(this));
	},

	index: function() {
		this.fetchedTasks.then(function() {
			this.filteredTasks.reset(this.tasks.models);
		}.bind(this));
	},

	active: function() {
		this.fetchedTasks.then(function() {
			this.filteredTasks.reset(this.tasks.where({completed: false}));
		}.bind(this));
	},

	completed: function() {
		this.fetchedTasks.then(function() {
			this.filteredTasks.reset(this.tasks.where({completed: true}));
		}.bind(this));
	}

});

var router = new Router();
export default router;
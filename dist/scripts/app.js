require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

(function () {
  'use strict';

  $(document).ready(function () {
    Backbone.history.start();
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsTaskToAdd = require('./views/taskToAdd');

var _viewsTaskToAdd2 = _interopRequireDefault(_viewsTaskToAdd);

var _viewsList = require('./views/list');

var _viewsList2 = _interopRequireDefault(_viewsList);

var _viewsLeft = require('./views/left');

var _viewsLeft2 = _interopRequireDefault(_viewsLeft);

var _viewsRemoveCompleted = require('./views/removeCompleted');

var _viewsRemoveCompleted2 = _interopRequireDefault(_viewsRemoveCompleted);

var _modelsTasks = require('./models/tasks');

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'active': 'active',
		'completed': 'completed'
	},

	initialize: function initialize() {
		this.tasks = new _modelsTasks.TaskCollection();

		var NewTask = new _viewsTaskToAdd2['default']({ collection: this.tasks });
		$('#header').append(NewTask.el);

		this.fetchedTasks = this.tasks.fetch().then((function () {
			this.filteredTasks = this.tasks.clone();
			this.filteredTasks.listenTo(this.tasks, 'add', this.filteredTasks.add);
			this.filteredTasks.listenTo(this.tasks, 'remove', this.filteredTasks.remove);
			this.taskList = new _viewsList2['default']({ collection: this.filteredTasks });
			$('#main').prepend(this.taskList.el);
			this.tasksLeft = new _viewsLeft2['default']({ collection: this.tasks });
			$('#footer').prepend(this.tasksLeft.el);
			this.completedTasks = this.tasks.clone();
			this.completedTasks.listenTo(this.tasks, 'change', (function () {
				this.completedTasks.reset(this.tasks.where({ completed: true }));
			}).bind(this));
			this.completedTasks.reset(this.tasks.where({ completed: true }));
			this.removeTasks = new _viewsRemoveCompleted2['default']({ collection: this.completedTasks });
			$('#footer').append(this.removeTasks.el);
		}).bind(this));
	},

	index: function index() {
		this.fetchedTasks.then((function () {
			this.filteredTasks.reset(this.tasks.models);
		}).bind(this));
	},

	active: function active() {
		this.fetchedTasks.then((function () {
			this.filteredTasks.reset(this.tasks.where({ completed: false }));
		}).bind(this));
	},

	completed: function completed() {
		this.fetchedTasks.then((function () {
			this.filteredTasks.reset(this.tasks.where({ completed: true }));
		}).bind(this));
	}

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/tasks", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var Task = Backbone.Model.extend({

	urlRoot: 'http://tiny-lasagna-server.herokuapp.com/collections/matts_tasks',

	idAttribute: '_id',
	defaults: function defaults() {
		return {
			content: '',
			completed: false,
			created_at: new Date()
		};
	}

});

var TaskCollection = Backbone.Collection.extend({

	model: Task,
	url: 'http://tiny-lasagna-server.herokuapp.com/collections/matts_tasks',
	comparator: 'created_at'

});

exports['default'] = { Task: Task, TaskCollection: TaskCollection };
module.exports = exports['default'];
  
});

require.register("views/left", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['tasks-remaining'],

	tagName: 'span',
	id: 'todo-count',

	initialize: function initialize() {
		this.render();
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/list", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _taskItem = require('./taskItem');

var _taskItem2 = _interopRequireDefault(_taskItem);

exports['default'] = Backbone.View.extend({

	template: JST['task-list'],
	tagName: 'ul',
	id: 'todo-list',

	events: {
		'click input[type=checkbox]': 'toggleAll'
	},

	completeAll: function completeAll() {},

	initialize: function initialize() {
		this.collection.fetch().then((function (tasks) {
			this.render();
		}).bind(this));
		this.listenTo(this.collection, 'update reset change remove destroy', this.render);
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
		this.renderChildren();
	},

	renderChildren: function renderChildren() {
		_.invoke(this.children || [], 'remove');

		this.children = this.collection.map((function (child) {
			var view = new _taskItem2['default']({
				model: child
			});
			this.$el.append(view.el);
			return view;
		}).bind(this));
		return this;
	},

	remove: function remove() {
		_.invoke(this.children || [], 'remove');
		Backbone.View.prototype.remove.apply(this, arguments);
	},

	toggleAll: function toggleAll() {
		console.log(this.collection.models);
		if (this.collection.models.every(function (model) {
			var isCompleted = model.get('completed');
			return isCompleted === true;
		})) {
			return _.map(this.collection.models, function (model) {
				model.set('completed', false);
				model.save();
			});
		} else {
			return _.map(this.collection.models, function (model) {
				model.set('completed', true);
				model.save();
			});
		}
	}

});
module.exports = exports['default'];
  
});

require.register("views/removeCompleted", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['remove-completed'],

	events: {
		'click #clear-completed': 'clearCompl'
	},

	initialize: function initialize() {
		this.render();
		console.log(this.collection.models);
		this.listenTo(this.collection, 'update change reset', this.render);
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	clearCompl: function clearCompl() {
		this.collection.invoke('destroy');
	}

});
module.exports = exports['default'];
  
});

require.register("views/taskItem", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['task-item'],

	tagName: 'li',
	className: '',

	events: {
		'click .destroy': 'deleteTask',
		'click .toggle': 'completed',
		'dblclick label': 'editItem',
		'submit': 'saveEdit'
	},

	initialize: function initialize() {
		if (this.model.attributes.completed === true) {
			this.$el.addClass('completed');
		} else {
			this.$el.removeClass('completed');
		}
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	deleteTask: function deleteTask() {
		this.model.destroy();
	},

	completed: function completed() {
		this.$el.toggleClass('completed');
		var isComplete = this.model.get('completed');
		if (isComplete) {
			this.model.set('completed', false);
		} else {
			this.model.set('completed', true);
		}
		this.model.save();
	},

	editItem: function editItem() {
		var content = this.model.get('content');
		this.$('.read').hide();
		this.$('.edit').show();
	},

	saveEdit: function saveEdit(e) {
		e.preventDefault();
		var content = this.$('.edit').val();
		this.model.set('content', content);
		this.model.save();
	}

});
module.exports = exports['default'];
  
});

require.register("views/taskToAdd", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST.addTask,

	tagName: 'form',
	className: 'add-todo-form',

	events: {
		'submit': 'addTask'
	},

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	addTask: function addTask(e) {
		e.preventDefault();
		var content = $('#new-todo').val();
		this.collection.create({
			content: content
		});
		$('#new-todo').val('');
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map
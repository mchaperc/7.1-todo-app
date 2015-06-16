var Task = Backbone.Model.extend({

	urlRoot: 'http://tiny-lasagna-server.herokuapp.com/collections/matts_tasks',

	idAttribute: '_id',
	defaults: function() {
		return {
			content: '',
			created_at: new Date()
		};
	}

});

var TaskCollection = Backbone.Collection.extend({

	model: Task,
	url: 'http://tiny-lasagna-server.herokuapp.com/collections/matts_tasks',
	comparator: 'created_at'

});

export default {Task, TaskCollection};
var Task = Backbone.Model.extend({

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
	url: 'http://tiny-lasagna-server.herokuapp.com/collections/matts_tasks'

});

export default {Task, TaskCollection};
export default Backbone.View.extend({

	template: JST['task-item'],

	tagName: 'li',
	className: '',

	events: {
		'click .destroy': 'deleteTask',
		'click .toggle': 'completed'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	deleteTask: function() {
		this.model.destroy();
		console.log('destwooooy!');
	},

	completed: function() {
		this.$el.toggleClass('completed');
	}
});
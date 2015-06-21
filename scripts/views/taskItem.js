export default Backbone.View.extend({

	template: JST['task-item'],

	tagName: 'li',
	className: '',

	events: {
		'click .destroy': 'deleteTask',
		'click .toggle': 'completed',
		'dblclick label': 'editItem',
		'submit': 'saveEdit',
	},

	initialize: function() {
		if(this.model.attributes.completed === true) {
			this.$el.addClass('completed');
		} else {
			this.$el.removeClass('completed');
		}
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	deleteTask: function() {
		this.model.destroy();
	},

	completed: function() {
		this.$el.toggleClass('completed');
		var isComplete = this.model.get('completed');
		if (isComplete) {
			this.model.set('completed', false);
		} else {
			this.model.set('completed', true);
		}
		this.model.save();
	},

	editItem: function() {
		var content = this.model.get('content');
		this.$('.read').hide();
		this.$('.edit').show();
	},

	saveEdit: function(e) {
		e.preventDefault();
		var content = this.$('.edit').val();
		this.model.set('content', content);
		this.model.save();
	}

});
export default Backbone.View.extend({

	template: JST.addTask,

	tagName: 'form',
	className: 'add-todo-form',

	events: {
		'submit': 'addTask',
		'click input[type=checkbox]': 'toggleAll',
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	addTask: function(e) {
		e.preventDefault();
		var content = $('#new-todo').val();
		console.log(content);
		this.collection.create({
			content: content
		});
		$('#new-todo').val('');
	},

	toggleAll: function() {
		console.log('toggledAll');
	}

});
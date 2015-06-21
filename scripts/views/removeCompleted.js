export default Backbone.View.extend({

	template: JST['remove-completed'],

	events: {
		'click #clear-completed': 'clearCompl',
	},

	initialize: function() {
		this.render();
		console.log(this.collection.models);
		this.listenTo(this.collection, 'update change reset', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	clearCompl: function() {
		this.collection.invoke('destroy');
	}

});
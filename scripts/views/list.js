import TaskItemView from './taskItem';

export default Backbone.View.extend({

	template: JST['task-list'],
	tagName: 'ul',
	id: 'todo-list',

	events: {
		'click input[type=checkbox]': 'toggleAll',
	},

	completeAll: function() {
		console.log(this);
	},

	initialize: function() {
		this.collection.fetch().then(function(tasks) {
			this.render();
		}.bind(this));
		this.listenTo(this.collection, 'update reset change', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
		this.renderChildren();
	},

	renderChildren: function(){
		_.invoke(this.children || [], 'remove');

		this.children = this.collection.map(function(child) {
			var view = new TaskItemView({
	  		model: child,
		});
		this.$el.append(view.el);
		return view;
		}.bind(this));
		return this;
	},

	remove: function(){
		_.invoke(this.children || [], 'remove');
		Backbone.View.prototype.remove.apply(this, arguments);
	},

	toggleAll: function() {
		console.log(this.collection.models);
		if (this.collection.models.every(function(model) {
			var isCompleted = model.get('completed');
			return isCompleted === true;
			})) {
				return _.map(this.collection.models, function(model) {
					model.set('completed', false);
					model.save();
				});
		} else {
			return _.map(this.collection.models, function(model) {
				model.set('completed', true);
				model.save();
			});
		}
	}

});
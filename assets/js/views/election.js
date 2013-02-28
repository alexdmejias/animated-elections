define(['backbone'], function(Backbone) {
    var ElectionView = Backbone.View.extend({
        wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',
        stately: $('#election'),
        // stores all the color classes for the parties. Used for resetting classes
        color_classes: [],
        template: _.template($('#template').html()),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.update_ui();
            this.build_reset_colors();
            this.color_parties();
            return this;
        },

        _update_data: function() {
            $('#data').html(this.template(this.model.attributes));
        },

        update_ui: function() {
            this._update_data();
        },

        build_reset_colors: function() {
            var that = this;
            var parties = this.model.get('parties');
            for (var i = 0; parties.length > i; i++) {
                if((parties[i].color.length > 2) && (that.color_classes.indexOf(parties[i].color) == -1 ) ) {
                    that.color_classes.push(parties[i].color);
                }
            }
        },

        _reset_states: function() {
            $('li', this.stately).removeClass(this.color_classes.join(' '));
        },

        _build_states_selector: function (array_of_states) {
            return '.' + array_of_states.join(', .');
        },

        _color_party: function(party_index, color) {
            $(this._build_states_selector(party_index)).addClass(color);
        },

        color_parties: function() {
            this._reset_states();
            for(var party in this.model.get('parties')) {
                this._color_party( this.model.get('parties')[party]['states'], this.model.get('parties')[party]['color']);
            }
        }
    });

    return ElectionView;
});
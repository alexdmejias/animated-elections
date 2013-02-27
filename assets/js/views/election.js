define(['backbone'], function(Backbone) {
    var ElectionView = Backbone.View.extend({
        wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',
        stately: $('#election'),
        color_classes: ['test'],

        initialize: function() {
            this.render();
        },

        render: function() {
            this.update_wiki_link();
            this.update_heading();
            this.build_reset_colors();
            this.reset_states();
            this.color_parties();
            return this;
        },

        update_wiki_link: function() {
            $('#wiki').attr('href', this.wiki_base + this.model.get('year'));
        },

        update_heading: function() {
            $('#year').html(this.model.get('year'));
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

        reset_states: function() {
            $('li', this.stately).removeClass(this.color_classes.join(' '));
        },

        build_states_selector: function (array_of_states) {
            return '.' + array_of_states.join(', .');
        },

        color_party: function(party_index, color) {
            $(this.build_states_selector(party_index)).addClass(color);
        },

        color_parties: function() {
            for(var party in this.model.get('parties')) {
                this.color_party( this.model.get('parties')[party]['states'], this.model.get('parties')[party]['color']);
            }
        }
    });

    return ElectionView;
});
define(['backbone', '/assets/js/collections/elections.js', '/assets/js/views/election.js'], function(Backbone, Elections, ElectionView) {
    var AppView = Backbone.View.extend({
        current_election_index: 0,
        active_btn_class: 'dark_blue_bg',
        playback: {
            id: '',
            duration: 1750,
            status: false
        },
        el: 'body',

        initialize: function() {
            elections = new Elections();
            _.bindAll(this, 'render');
            this.listenTo(elections, 'reset', this.render);
            elections.fetch();
        },

        render: function () {
            var view = new ElectionView({
                model: elections.at(this.current_election_index),
                election_index: this.current_election_index
            });

            this.update_ui();

            return this;
        },

        events: {
            'click #next': 'next',
            'click #prev': 'prev',
            'click #play': 'turn_play_on',
            'click #stop': 'turn_play_off',
            'click #restart': 'restart'
        },

        change_election_index: function(prev) {
            return typeof prev === 'undefined' ? this.current_election_index++: this.current_election_index--;
        },

        _update_wiki_link: function() {
            $('#wiki').attr('href', this.wiki_base + elections.at(this.current_election_index).get('year'));
        },

        _update_description: function() {
            $('#description').find('.year_start').text(elections.at(0).get('year')).end()
            .find('.year_end').text(elections.at(elections.length - 1 ).get('year')).end()
            .find('.year_length').text(elections.length).end()
            .find('.year_current').text(this.current_election_index + 1);
        },

        _update_heading: function() {
            $('#year').html(elections.at(this.current_election_index).get('year'));
        },

        update_ui: function() {
            this._update_wiki_link();
            this._update_description();
            this._update_heading();
        },

        next: function() {
            // add an indicator to show they cant go in this direction anymroe
            if (this.current_election_index + 1 != elections.length) {
                this.change_election_index();
                this.render();
            }
        },

        prev: function() {
            // add an indicator to show they cant go in this direction anymore
            if (this.current_election_index !== 0 ) {
                this.change_election_index(prev);
                this.render();
            }
        },

        turn_play_on: function() {
            if (this.playback.status === false) {
                this.playback.status = true;
                this.play();
            }
            $('#play').addClass(this.active_btn_class);
        },

        turn_play_off: function() {
            this.playback.status = false;
            clearTimeout(this.playback.id);
          $('#play').removeClass(this.active_btn_class);
        },

        play: function() {
            var that = this;
            this.playback.id = setInterval(function() {
                if ((that.playback.status === true) && (that.current_election_index < elections.length - 1 )) {
                    that.next();
                } else {
                    that.turn_play_off();
                }
            }, that.playback.duration);
        },

        restart: function() {
            this.turn_play_off();
            this.current_election_index = 0;
            this.render();
        }
    });

    return AppView;
});
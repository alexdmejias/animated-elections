define(['backbone', 'collections/elections.js', 'views/election.js', 'jqueryui'], function(Backbone, Elections, ElectionView, simpleSlider) {
    var AppView = Backbone.View.extend({
        current_election_index: 0,
        active_btn_class: 'dark_blue_bg',
        wiki_base: 'http://en.wikipedia.org/wiki/United_States_presidential_election,_',
        slider: $("#sliderjq"),
        started: 0,
        el: '#content',
        playback: {
            id: '',
            duration: 1750,
            status: false
        },

        initialize: function() {
            elections = new Elections();
            _.bindAll(this, 'render');
            this.listenTo(elections, 'reset', this.render);
            elections.fetch();
            this.remove_loader();
        },

        render: function () {
            var view = new ElectionView({
                model: elections.at(this.current_election_index),
                election_index: this.current_election_index
            });
            this._make_slider();
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

        election_year: function() {
            if (this.options.year) {
                for(var i = 0; i < elections.models.length; i++) {
                    if (elections.models[i].attributes.year == this.options.year) {
                     this.current_election_index = i;
                     this.started = 1;
                    }
                }
            }
        },

        change_election_index: function(prev) {
            return typeof prev === 'undefined' ? this.current_election_index++: this.current_election_index--;
        },

        remove_loader: function() {
            $('#loader', this.content).fadeOut(function() {
                $('#content').fadeIn();
            });
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

        _make_slider: function() {
            var that = this;
            this.slider.slider({
                animate: 'slow',
                max: elections.length - 1,
                min: 0,
                change: function(event, ui) {
                    that.current_election_index = ui.value;
                    that.render();
                }
            });
        },

        update_ui: function() {
            this._update_wiki_link();
            this._update_description();
            this._update_heading();
        },

        next: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }

            if (this.current_election_index + 1 != elections.length) {
                this.change_election_index();
                this.slider.slider('value', this.current_election_index);
            }
            r.navigate('year/' + elections.at(this.current_election_index).get('year'), {trigger: true});
        },

        prev: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }

            if (this.current_election_index !== 0 ) {
                this.change_election_index(prev);
                this.slider.slider('value', this.current_election_index);
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
            // this.current_election_index = 0;
            this.slider.slider('value', 0);
            // this.render();
        }
    });

    return AppView;
});
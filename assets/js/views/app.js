define(['backbone', 'assets/js/collections/elections.js', 'assets/js/views/election.js', 'jqueryui'], function(Backbone, Elections, ElectionView, simpleSlider) {
    var AppView = Backbone.View.extend({
        current_index: 0,
        current_election_year: '',
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
            this.make_slider();
            if (this.started === 0) {
                this.detect_election_year();
            }
            var view = new ElectionView({
                model: elections.at(this.current_index),
                election_index: this.current_index
            });

            this.set_current_year(this.current_index);
            this.set_slider_val(this.current_index);
            // console.log(this.current_index);

            this.update_ui();

            return this;
        },

        events: {
            'click #next': 'next',
            'click #prev': 'prev',
            'click #play': 'turn_play_on',
            'click #stop': 'pause',
            'click #restart': 'restart'
        },

        detect_election_year: function() {
            if (this.options.year) {
                for(var i = 0; i < elections.models.length; i++) {
                    if (elections.models[i].attributes.year == this.options.year) {
                     this.current_index = i;
                     this.started = 1;
                    }
                }
            }
        },

        change_election_index: function(prev) {
            if (typeof prev === 'undefined') {
                this.current_index++;
            } else {
                this.current_index--;
            }

            this.set_current_year(this.current_index);
            this.index_changed();
        },

        set_current_year: function(index) {
            this.current_election_year = elections.at(index).get('year');
        },

        set_slider_val: function(value) {
            this.slider.slider('value', value);
        },

        index_changed: function() {
            this.update_year_url(this.current_election_year);
            this.update_ui();
            this.set_slider_val(this.current_index);
            this.render();
        },

        remove_loader: function() {
            $('#loader', this.content).fadeOut();
            $('#content').fadeIn();
        },

        _update_wiki_link: function() {
            $('#wiki').attr('href', this.wiki_base + this.current_election_year);
        },

        _update_description: function() {
            $('#description').find('.year_start').text(elections.at(0).get('year')).end()
            .find('.year_end').text(elections.at(elections.length - 1 ).get('year')).end()
            .find('.year_length').text(elections.length).end()
            .find('.year_current').text(this.current_index + 1);
        },

        _update_heading: function() {
            $('#year').html(this.current_election_year);
        },

        make_slider: function() {
            var that = this;
            this.slider.slider({
                value: this.current_index,
                max: elections.length - 1,
                min: 0,
                stop: function(event, ui) {
                    that.current_index = ui.value;
                    that.render();
                }
            });
        },

        update_ui: function() {
            this._update_wiki_link();
            this._update_description();
            this._update_heading();
        },

        update_year_url: function(year) {
            r.navigate('#year/' + year, {trigger: false});
        },

        next: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }

            if (this.current_index + 1 != elections.length) {
                this.change_election_index();
                this.set_slider_val(this.current_index);
            }

            this.index_changed();
        },

        prev: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }

            if (this.current_index !== 0 ) {
                this.change_election_index(prev);
                this.set_slider_val(this.current_index);
            }

            this.index_changed();
        },


        // ====PLAYBACK =========//
        turn_play_on: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }
            if (this.playback.status === false) {
                this.playback.status = true;
                this.play();
            }
        },

        pause: function(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }
            this.playback.status = false;
            clearTimeout(this.playback.id);
            $('#play').removeClass(this.active_btn_class);
        },

        play: function() {
            var that = this;
            this.playback.id = setInterval(function() {
                if ((that.playback.status === true) && (that.current_index < elections.length - 1 )) {
                    that.next();
                } else {
                    that.pause();
                }
            }, that.playback.duration);
        },

        restart: function() {
            this.pause();
            this.set_slider_val(0);
        }
    });

    return AppView;
});
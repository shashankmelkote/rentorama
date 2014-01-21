define(['Backbone', 'text!templates/menu.html'],
    function (backbone, menuTemplate) {

        var menuView = Backbone.View.extend({
            el: $('#topmenu'),

            // binding submit button clicks to event handlers
            events: {
                "click .home": "homeClick",
                "click .search": "searchClick",
                "click .messages": "messageClick",
                "click .upload": "uploadClick",
                "click .settings": "settingsClick"
            },

            homeClick: function () {
                console.log("home button clicked!");
                return false;
            },

            searchClick: function () {
                console.log("search button clicked!");
                return false;
            },

            messageClick: function () {
                console.log("messages button clicked!");
                return false;
            },

            uploadClick: function () {
                console.log("upload apartment button clicked!");
                return false;
            },

            settingsClick: function () {
                console.log("settings button clicked!");
                return false;
            },

            render: function () {
                this.$el.html(menuTemplate);
                var template = _.template($('#main-menu-template').html());
                $('#topmenu').html(template);
            }
        });

        return menuView;

    });

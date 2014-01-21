define(['text!templates/uploadApartment.html', 'text!templates/uploadAptDetails.html',
    'text!templates/uploadLandlord.html', 'text!templates/uploadAptFacilities.html',
    'text!templates/uploadImages.html'],
    function (aptAddressTemplate, aptDetailsTemplate, aptLandlordTemplate, aptFacilitiesTemplate, aptImagesTemplate) {

        var uploadView = Backbone.View.extend({
            el: $('#content'),

            // binding submit button clicks to event handlers
            events: {
                "submit .uploadApt": "uploadAddr",
                "submit .uploadAptDetails": "uploadDetails",
                "submit .uploadLandlord": "uploadLandlord",
                "submit .uploadAptFacilities": "uploadAptFacilities",
                "submit .uploadImages": "uploadImages"
            },

            uploadAddr: function () {
                $.post('/uploadAptAddr', {
                        houseno: $('input[name=stno]').val(),
                        street: $('input[name=streetName]').val(),
                        aptNo: $('input[name=aptNo]').val(),
                        city: $('input[name=city]').val(),
                        state: $('input[name=state]').val(),
                        zipcode: $('input[name=zipcode]').val()
                    },
                    function (data) {
                        console.log(data);
                    }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });

                this.renderDetails();
                return false;
            },

            uploadDetails: function () {
                $.post('/uploadAptDetails', {
                        rent: $('input[name=rent]').val(),
                        moveout: $('input[name=moveout]').val(),
                        neighbourhood: $('input[name=neighbourhood]').val(),
                        bed: $('input[name=bed]').val(),
                        bath: $('input[name=bath]').val(),
                        headline: $('input[name=headline]').val(),
                        desc: $('input[name=desc]').val()
                    },
                    function (data) {
                        console.log(data);
                    }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });

                this.renderLandlord();
                return false;
            },

            uploadLandlord: function () {
                $.post('/uploadLandlord', {
                        name: $('input[name=ll_name]').val(),
                        houseno: $('input[name=ll_stno]').val(),
                        street: $('input[name=ll_streetName]').val(),
                        aptNo: $('input[name=ll_aptNo]').val(),
                        city: $('input[name=ll_city]').val(),
                        state: $('input[name=ll_state]').val(),
                        zipcode: $('input[name=ll_zipcode]').val()
                    },
                    function (data) {
                        console.log(data);
                    }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });
                this.renderFacilities();
                return false;
            },

            uploadAptFacilities: function () {
                this.renderImages();
                return false;
            },

            uploadImages: function () {

                console.log("enter jquery code");



                /* console.log("enter jquery code");
                 $.post('/uploadImage', {
                 file: $('input[name=uploadFile]').val()
                 },
                 function(data) {
                 console.log(data);
                 }).error(function(){
                 $("#error").text('Unable to create user.');
                 $("#error").slideDown();
                 });*/
                this.renderImages();
                return false;

                /* $.post('/uploadImage',{
                 file: $('input[name=uploadFile]').files()
                 },
                 function(data) {
                 console.log(data);
                 }).error(function(){
                 $("#error").text('Unable to create user.');
                 $("#error").slideDown();
                 });
                 //this.renderImages();
                 return false;*/
            },

            renderDetails: function () {
                this.$el.html(aptDetailsTemplate);
                var uploadData = $.get('/uploadAptAddr', {},function (data) {
                    console.log("output : " + JSON.stringify(data));
                    var template = _.template($('#apartment-details-template').html(), {user: data});
                    $('#content').html(template);
                }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });
            },

            renderLandlord: function () {
                this.$el.html(aptLandlordTemplate);
                var uploadData = $.get('/uploadAptAddr', {},function (data) {
                    console.log("output : " + JSON.stringify(data));
                    var template = _.template($('#apartment-landlord-template').html(), {user: data});
                    $('#content').html(template);
                }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });
            },

            renderFacilities: function () {
                this.$el.html(aptFacilitiesTemplate);
                var uploadData = $.get('/uploadAptAddr', {},function (data) {
                    console.log("output : " + JSON.stringify(data));
                    var template = _.template($('#apartment-facilities-template').html(), {user: data});
                    $('#content').html(template);
                }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });
            },

            renderImages: function () {
                this.$el.html(aptImagesTemplate);
                var uploadData = $.get('/uploadAptAddr', {},function (data) {
                    console.log("output : " + JSON.stringify(data));
                    var template = _.template($('#apartment-images-template').html(), {user: data});
                    $('#content').html(template);
                    $('#fileupload').fileupload({
                        url: '/uploadImage',
                        dataType: 'json',
                        done: function (e, data) {
                            $.each(data.result.files, function (index, file) {
                                $('<p/>').text(file.name).appendTo(document.body);
                            });
                        }
                    });
                }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });

            },

            render: function () {
                this.$el.html(aptAddressTemplate);
                var uploaddata = $.get('/uploadAptAddr', {},function (data) {
                    console.log("output : " + JSON.stringify(data));
                    var template = _.template($('#apartment-address-template').html(), {user: data});
                    $('#content').html(template);
                }).error(function () {
                        $("#error").text('Unable to create user.');
                        $("#error").slideDown();
                    });
            }

        });
        return uploadView;
    });

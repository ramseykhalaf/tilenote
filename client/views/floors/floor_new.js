Template.floor_new.events({
    'submit form': function(e) {
        e.preventDefault();

        var form = $(e.target);
        var newFloor = {
            ownerId: Meteor.userId(),
            title: form.find('[name=title]').val(),
            description: form.find('[name=description]').val()
        };
        Floors.insert(newFloor);
    }
});

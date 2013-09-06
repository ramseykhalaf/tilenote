Template.floor_new.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var newFloor = {
            userId: Meteor.userId(),
            title: $(e.target).find('[name=title]').val(),
            description: $(e.target).find('[name=description]').val()
        };

        Floors.insert(newFloor);
    }
});

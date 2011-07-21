var Chart = Backbone.View.extend({
    initialize: function(args) {
        this.workspace = args.workspace;
        
        // Bind table rendering to query result event
        _.bindAll(this, "render", "process_data", "show");
        this.workspace.bind('query:result', this.render);
        
        // Add chart button
        this.add_button();
    },
    
    add_button: function() {
        var $chart_button = $('<li class="seperator"><a href="#chart" class="button"></a></li>')
            .click(this.show)
            .css({ backgroundImage: "/js/saiku/plugins/Chart/chart.png" });
        $(this.workspace.toolbar.el).find("ul").append($chart_button);
    },
    
    show: function(event, ui) {
        if (event.target.hasClass('on')) {
            $(this.workspace.el).find('.workspace_results').html('')
                .append($(this.el));
            event.target.removeClass('on');
        } else {
            $(this.workspace.el).find('.workspace_results').html('')
                .append($(this.workspace.table.el).find('table'));
            event.target.addClass('on');
        }
    },
    
    render: function(args) {
        // Render the table without blocking the UI thread
        _.delay(this.process_data, 0, args);
    },
    
    process_data: function(args) {
        var chart = "";
        
        $(this.el).html(chart);
    }
});

(function() {
    function new_workspace(args) {
        // Add chart element
        args.workspace.chart = new Chart({ workspace: args.workspace });
    }
        
    
    // Attach chart to existing tabs
    for (var i = 0; i < Saiku.tabs._tabs.length; i++) {
        new_workspace({ workspace: Saiku.tabs._tabs[i].content });
    }
    
    // Attach chart to future tabs
    Saiku.session.bind("workspace:new", new_workspace);
}());
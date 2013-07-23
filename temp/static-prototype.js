// Prototype specific startup scripts
$(function() {
    
    // Event delegation for links
    $('body').on("click", function(e) {
        try {
            // Display an alert dialog when inactive links are clicked.
            if ($(e.target).closest('a').attr('href').match(/(^\/$|\/?xlink-)/)) {
                e.preventDefault();
                alert('Denna länk är inte aktiv i prototypen.');
            }
        } catch (e) {}
    });
    
    
    // Slide in navigation
    $(".open-toolbar").on("click", function(e) {
        $(".functions-menu").toggleClass("open");
        e.preventDefault();
    });
    
    
    // Custom select elements
    $("select").customSelect({customClass:'custom-select'});
    
    
    // Custom file upload elements
    $("input:file").customFileInput();
    
    
    // Placeholder support for legacy IE
    $("input, textarea").placeholder();
    
    
    // Expandable fields (TODO: Template this)
    $(".expandable-field").addClass("active").append("<a href=\"#\" class=\"expand\"><i class=\"glyph icon-arrow-down\"></i><span>Visa mer</span><i class=\"glyph icon-arrow-down\"></i></a>").children(".expandable-content").hide();
    $(".expand").on("click", function(e) {
        $(this).toggleClass("expanded").prevAll(".expandable-content").slideToggle("fast");
        e.preventDefault();
    });
    
    // Date picker
    try {
        $('.datepicker').pickadate({
            format: 'yyyy-mm-dd',
        });
    } catch(e) {}
    
    // Fix toolbar on scroll
    var sidebar     = $(".toolbar"), 
        view        = $(window),
        offset      = sidebar.offset();

    view.scroll(function() {
        if (view.scrollTop() > offset.top - 76) {
            sidebar.addClass('fixed');
        } else {
            sidebar.removeClass('fixed');
        }
    });
    
    // Google Maps config
    function initMaps() {
        $("#issues-map").gmap3({
            map: {
                options: {
                    center: [55.603466,12.99416],
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    navigationControl: true,
                    scrollwheel: false,
                    streetViewControl: false
                }
            },
            marker: {
                values: [
                    {latLng: [55.611375,12.974193]},
                    {latLng: [55.604975,12.965953]},
                    {latLng: [55.60032,12.986209]},
                    {latLng: [55.617143,12.994939]},
                    {latLng: [55.594464,12.992965]},
                    {latLng: [55.594404,13.007062]},
                    {latLng: [55.599859,13.004294]},
                    {latLng: [55.597107,12.967451]},
                    {latLng: [55.590605,12.967976]},
                    {latLng: [55.590636,12.989111]},
                    {latLng: [55.588192,12.997727]}
                ],
                options:{
                    draggable: false,
                    icon: new google.maps.MarkerImage(
                        "gui/i/map-marker-green.png",
                        new google.maps.Size(32, 37, "px", "px")
                    )
                }
            }
        });
    }
    
    // Superfish dropdown menu
    $(".buttons ul").superfish();
    
    // Google Maps toggle
    if ($("body").hasClass("public")) {
        var overviewHeading = $(".issues-overview > h2");
        overviewHeading.append("<a href=\"#\" class=\"toggle-map\">Visa ärenden på karta</a>");
        overviewHeading.after("<div id=\"issues-map\" class=\"map\"></div>");
    }
    
    var toggleMap = $(".toggle-map");
    var googleMap = $("#issues-map");
    
    googleMap.hide();
    
    toggleMap.on("click", function(e){
        googleMap.slideToggle();
        initMaps();
        e.preventDefault();
    });
    
});
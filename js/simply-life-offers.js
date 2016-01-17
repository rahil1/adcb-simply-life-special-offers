function init() {

    // Link 'learn more' button to dialog open function
    var learnMoreLinks = $('#accordion #opener');

    learnMoreLinks.on('click', function (event) {
        modalShow(event);
        return false;
    });

    // Link close button
    $('#modalClose').click(function (event) {
        modalClose(this);
        return false;
    });

    $('#accordion').data('openTotal', 0);

    // Init accordion

    var headers = $('#accordion .accordion-header');
    var contentAreas = $('#accordion .ui-accordion-content ').hide();
    var expandLink = $('.accordion-expand-all');
    var collapseLink = $('.accordion-collapse-all');

    // add the accordion functionality
    headers.click(function () {
        var panel = $(this).next();
        var isOpen = panel.is(':visible');

        toggleIcons($(this));

        var openTotal = $('#accordion').data('openTotal');

        if (isOpen && openTotal > 0) {
            openTotal--;
        } else {
            openTotal++;
        }

        if (openTotal == 0)
            disableLink(collapseLink);
        else
            enableLink(collapseLink);

        if (openTotal == headers.length)
            disableLink(expandLink);
        else
            enableLink(expandLink);

        $('#accordion').data('openTotal', openTotal);

        // open or close as necessary
        panel[isOpen ? 'slideUp' : 'slideDown']()
        // trigger the correct custom event
        .trigger(isOpen ? 'hide' : 'show');

        // stop the link from causing a pagescroll
        return false;
    });

    function enableLink(link) {
        //removing disable class
        //link.removeClass('disabled');
    }

    function disableLink(link) {
        //adding disable class
        //link.addClass('disabled');
    }

    function checkActive() {

        var openTotal = $(this).data('openTotal');

    }

    // Check if all are collapsed and disable collapse button

    var isAllCollapsed = contentAreas.is(':hidden');

    if (isAllCollapsed) {
        disableLink(collapseLink);
    } else {
        enableLink(collapseLink);
    }

    function toggleIcons(panel) {

        var icon = panel.find('.ui-accordion-header-icon');

        icon.toggleClass('ui-icon-plus');
        icon.toggleClass('ui-icon-minus');

    }



    // hook up the expand/collapse all
    expandLink.click(function (e) {

        e.preventDefault();
        if (expandLink.hasClass('disabled'))
            return false;
        else
            disableLink(expandLink);
        enableLink(collapseLink);
        contentAreas['slideDown']()
        .trigger('show');
        $('#accordion').data('openTotal', 0);
        $('.ui-accordion-header-icon').removeClass('ui-icon-plus');
        $('.ui-accordion-header-icon').addClass('ui-icon-minus');

    });

    // hook up the collapse all
    collapseLink.click(function (e) {
        e.preventDefault();
        if (collapseLink.hasClass('disabled'))
            return false;
        else
            disableLink(collapseLink);
        enableLink(expandLink);
        contentAreas['slideUp']()
        .trigger('hide');
        $(this).data('openTotal', headers.length);

        $('.ui-accordion-header-icon').removeClass('ui-icon-minus');
        $('.ui-accordion-header-icon').addClass('ui-icon-plus');

    });

    initDialog();

}

// Initialise jQuery dialog Box

function initDialog() {

    var accordionWidth = $('#accordion .accordion-header').width();

    $("#dialog").dialog({
        autoOpen: false,
        show: {

        },
        hide: {
            effect: "blind",
            duration: 100
        },
        modal: true,
        width: accordionWidth
    });

}

var offersByCuisine;

// Load in the offers xml file and parse asynchronously

function loadXMLOffers() {

    $.ajax({
        type: "GET",
        url: "offers.xml",
        dataType: "xml",
        success: parseXml
    });
}

// Once the xml has been loaded, this function is called

function parseXml(xml) {
    $('#accordion').data('offersXml', xml);
    $('#accordion').data('selectedCategory', 0);

    // THis code can be used to populate the categories in the carousel dynamically
    //
    // You just need to replace the current slider content variable to match this line:
    //   <div class="item" id="dining" ><span class="offerImage"></span><span class="proText">More to Savour</span> <span class="btmarrow"></span></div>



    var sliderContent = "<div class='item'><ul id='content-slider' class='content-slider'>";
    $(xml).find("Category").each(function (index) {
        sliderContent += "<a href='#' name=" + index + " class='slider-images'><li name=" + index + "><img src='" + $(this).find("CategoryImage").text() + "'><h3 name=" + index + ">" + index + "</h3><p class='down-arrow' name=" + index + ">" + $(this).find("CategoryName").text() + "</p></li></a>";
    });
    sliderContent += "</ul></div>";

    document.getElementById("image-slider").innerHTML = sliderContent;

    initLightSlider();

    populateXMLOffers(0);

}

function initLightSlider() {
    var slider = $("#content-slider").lightSlider({
        loop: true,
        keyPress: true,
        pager: false,
        slideMargin: 28,
        item: 4,
        controls: false
    });
    $('#goToPrevSlide').on('click', function (e) {
        e.preventDefault();
        slider.goToPrevSlide();
    });
    $('#goToNextSlide').on('click', function (e) {
        e.preventDefault();
        slider.goToNextSlide();
    });

    // Link 'learn more' button to dialog open function
    var sliderImages = $('a.slider-images');

    sliderImages.on('click', function (event) {
        //Adding actual Image to offers icons
        for (var i = 0; i < sliderImages.length; i++) {
            var path = $(sliderImages[i]).find("img").attr("src");
            if (path.toLowerCase().indexOf("-active.png") >= 0) {
                var activeimage = path.replace('-active.png', '');
                $(sliderImages[i]).find("img").attr("src", activeimage + ".png");
            }
        }

        //adding active image to offer icon
        var selectedCategoryCode = $(event.currentTarget)[0].getAttribute("name");
        var path = $(this).find("img").attr("src");
        var imgName = path.replace('.png', '');
        $(this).find("img").attr("src", imgName + "-active.png");

        $('#accordion').data('selectedCategory', selectedCategoryCode);
        populateXMLOffers(selectedCategoryCode);
        return false;
    });
}

function populateXMLOffers(categoryIndex) {

    //console.log("CategoryTot: "+ $(this).find("Category").size());

    var output = '';

    var xml = $('#accordion').data('offersXml');

    $(xml).find("Category").each(function (index) {

        if (index == categoryIndex) {
            console.log("categoryName:" + $(this).find("CategoryName").text());


            $(this).find("SubCategory").each(function (index) {
                var totalOffersInCategory = $(this).find("Offer").size();

                var offerNumber = index + 1;
                var subCategoryName = $(this).find("SubCategoryName").text();

                output += "<!-- section " + offerNumber + " start -->";
                output += "<div class='accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all'> "
                + subCategoryName + "<span class='icon-box'><span class='ui-accordion-header-icon ui-icon ui-icon-plus'></span></span>";
                output += "</div>";
                output += "<div class='ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom'>";

                $(this).find("Offer").each(function (subindex) {

                    var offerName = $(this).find("OfferName").text();
                    var offerImage = $(this).find("OfferImageSmall").text();
                    var offerValidity = $(this).find("OfferValidity").text();
                    var offerTerms = $(this).find("TnC").text();
                    var offerDesc = $(this).find("TnC").text();

                    output += "<!-- list item start -->";
                    output += "<div class='offerListItem'>";
                    output += "<div class='offerListLeft'>";
                    output += "<img src='" + offerImage + "'></div>";
                    output += "<div class='offerListRight'>";
                    output += "<h2 class='offer'>" + offerName + "</h2>";
                    output += "<p><span class='offercopy'>" + offerDesc + "</span></p><br>";
                    output += "<span class='offertc'>";
                    output += offerValidity;

                    // if (offers[j].offerTerms) {
                    //   output+="<br>" + offerTerms;
                    // }
                    output += "</span>";
                    output += "<div class='offermore'>";
                    output += "<a href='#' class='offercopy' name='" + index + "_" + subindex + "' id='opener'>Learn More<span class='rightarrow'></span></a></div></div>";
                    output += "</div><!-- list item end -->";
                    if (subindex <= Number(totalOffersInCategory) - 2) {
                        output += "<!-- list item divider --><br><hr class='offer'>";
                    }

                });

                output += "</div>";

            });



        }
    });


    document.getElementById("accordion").innerHTML = output;

    init();

}

function populateOffers() {

    var output = "";
    offersByCuisine = data.offersByCuisine;

    //Finds y value of given object
    function findPos(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    }

    for (var i in offersByCuisine) {

        offers = offersByCuisine[i].offers;

        var offerNumber = Number(i) + 1;

        output += "<!-- section " + offerNumber + " start -->";
        output += "<div class='accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all'> "
        + offersByCuisine[i].offerCuisine + "<span class='icon-box'><span class='ui-accordion-header-icon ui-icon ui-icon-plus'></span></span>";
        output += "</div>";
        output += "<div class='ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom'>";

        for (var j in offers) {

            output += "<!-- list item start -->";
            output += "<div class='offerListItem'>";
            output += "<div class='offerListLeft'>";
            output += "<img src='img/logos/" + offers[j].offerImage + "'></div>";
            output += "<div class='offerListRight'>";
            output += "<h2 class='offer'>" + offers[j].offerName + "</h2>";
            output += "<p><span class='offercopy'>Use your Simplylife Credit Card and get a " + offers[j].offerDiscount + " discount.</span></p><br>";
            output += "<span class='offertc'>";
            output += offers[j].offerValid;

            if (offers[j].offerTerms) {
                output += "<br>" + offers[j].offerTerms;
            }
            output += "</span>";
            output += "<div class='offermore'>";
            output += "<a href='#' class='offercopy' name='" + i + "_" + j + "' id='opener'>Learn More<span class='rightarrow'></span></a></div></div>";
            output += "</div><!-- list item end -->";
            if (j <= offers.length - 2) {
                output += "<!-- list item divider --><br><hr class='offer'>";
            }


        }
        output += "</div>";


    }

    document.getElementById("accordion").innerHTML = output;

    //init();

    loadXMLOffers();


}

// Pull data for selected offer and substitute into modal
function populateModal(offerCode) {

    // SPlit offer code into section and offer indices
    selectedOffer = offerCode;

    var offerIndices = offerCode.split("_");

    var subCategoryIndex = Number(offerIndices[0]);
    var offerIndex = Number(offerIndices[1]);

    var xml = $('#accordion').data('offersXml');
    var categoryIndex = $('#accordion').data('selectedCategory');
    console.log(categoryIndex);
    $(xml).find("Category").each(function (i) {

        if (i == categoryIndex) {
            //console.log("categoryName:" + $(this).find("CategoryName").text());

            $(this).find("SubCategory").each(function (j) {
                if (j == subCategoryIndex) {

                    //console.log("SubCategoryName:" + $(this).find("SubCategoryName").text());

                    $(this).find("Offer").each(function (k) {
                        if (k == offerIndex) {

                            var totalOffersInCategory = $(this).find("Offer").size();

                            var offerName = $(this).find("OfferName").text();
                            var offerImage = $(this).find("OfferImageSmall").text();
                            var offerValidity = $(this).find("OfferValidity").text();
                            var offerTerms = $(this).find("TnC").text();
                            var offerDesc = $(this).find("OfferDesc").text();

                            // Populate offer name
                            document.getElementById("popup_offer_name").innerHTML = offerName;

                            // Populate offer copy
                            document.getElementById("popup_offer_copy").innerHTML = offerDesc;

                            // Set image source
                            document.getElementById("popup_offer_image").src = offerImage;

                            //console.log("offerName: " + offerName);

                            // Construct validity & T&C stiring then populate
                            // var offerTerms = chosenOffer.offerValid;

                            if ($(this).find("TnC").text().length > 0) {
                                offerValidity += "<br>" + $(this).find("TnC").text();
                            }
                            document.getElementById("popup_offer_validity").innerHTML = offerValidity;

                            /* Loop throuugh and list all locations & addresses for each */
                            var locationContent = "";
                            $(this).find("Location").each(function (l) {
                                //console.log("LocationName:" + $(this).find("LocationName").text());
                                //console.log("LocationAddress:" + $(this).find("LocationAddress").text());
                                //console.log("LocationContact:" + $(this).find("LocationContact").text());

                                locationContent += "<li class='detail'><strong>" + $(this).find("LocationName").text() + "</strong>";
                                locationContent += "<br>" + $(this).find("LocationAddress").text() + ".";

                                if ($(this).find("LocationContact").text().length > 0) {
                                    locationContent += "Tel. " + $(this).find("LocationContact").text();
                                }
                                locationContent += "</li>";

                            });

                            document.getElementById("popup_offer_locations").innerHTML = locationContent;

                            // Display modal
                            $("#dialog").dialog("open");
                        }

                    });



                }
            });
        }
    });


    // var chosenOffer =  offersByCuisine[cuisineIndex].offers[offerIndex];
    // var offerLocations = chosenOffer.offerLocations;
    //




}

// Called by learn more link
function modalShow(event) {
    //console.log(event.target.getAttribute("name"));
    var selectedOfferCode = event.target.getAttribute("name");

    console.log("offer code: " + selectedOfferCode);
    // Put appropriate offer info into modal
    populateModal(selectedOfferCode);

}

function modalClose() {

    $("#dialog").dialog("close");

}

/*
	Name: Joan Montas
	Email: Joan_Montas@student.uml.edu
	File: multable.js
	GUI Assignment: GUI, HW4 : PART 2: jQuery UI Slider and Tab Widgets
	Date:06/23/2023
	Description: Create a dynamic multiplication table.
        Certain error handling was added using jquery validation plugins.
        Jquery ui plugins was used to create slider and tabs.
        Boostrap used for styling.
	Copyright (c) 2023 by Joan Montas. All rights reserved.
*/

/*
    @description    sets up the page automatically.
    *@param Name    none
    *@return        None
    *@throws        none
*/
$(document).ready(function() {
    createslider();
    createvalidation();
    submitifvalid();    // to show table prior submiting
    createtabs();
});

/*
    @description    helper function to check validity of the
                    table form
    *@param Name    none
    *@return        None
    *@throws        none
*/
function submitifvalid() {
    // https://stackoverflow.com/questions/1961326/using-jquery-to-automatically-submit-form
    var validonah = $("#theform").valid();
    if (validonah) {
        // https://stackoverflow.com/questions/1961326/using-jquery-to-automatically-submit-form
        $("#theform").submit();
    } else {
        $("#thetable").empty();
    }
}

/*
    @description    Create and setups jquery UI slider on page.
    *@param Name    none
    *@return        None
    *@throws        none
*/
function createslider() {
    // https://jqueryui.com/slider/#rangemax
    $( "#numberonerange" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,

        slide: function( event, ui ) {
            $( "#numberone" ).val( ui.value );
            // https://stackoverflow.com/questions/1961326/using-jquery-to-automatically-submit-form
            submitifvalid();
        }
    });

    // customization of the slider also sets up two way binding
    // repeats for all the slider
    // https://stackoverflow.com/questions/11189136/fire-oninput-event-with-jquery
    $( "#numberone" ).val( $( "#numberonerange" ).slider( "value" ) );
    $("#numberone").on('input', function() {
        console.log($("#numberone").val());
        $("#numberonerange").val ($("#numberone").val());
        // https://stackoverflow.com/questions/2833396/jquery-ui-slider-setting-programmatically
        $("#numberonerange").slider("value", $("#numberone").val());
        submitifvalid();
      });

    $( "#numbertworange" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
            $( "#numbertwo" ).val( ui.value );
            submitifvalid();
        }
    });

    $( "#numbertwo" ).val( $( "#numbertworange" ).slider( "value" ) );
    $("#numbertwo").on('input', function() {
        console.log($("#numbertwo").val());
        $("#numbertworange").val ($("#numbertwo").val());
        $("#numbertworange").slider("value", $("#numbertwo").val());
        submitifvalid();
      });

    $( "#numberthreerange" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
        $( "#numberthree" ).val( ui.value );
            submitifvalid();
        }
    });

    $( "#numberthree" ).val( $( "#numberthreerange" ).slider( "value" ) );
    $("#numberthree").on('input', function() {
        console.log($("#numberthree").val());
        $("#numberthreerange").val ($("#numberthree").val());
        $("#numberthreerange").slider("value", $("#numberthree").val());
        submitifvalid();
      });
    
    $( "#numberfourrange" ).slider({
        range: "max",
        min: -50,
        max: 50,
        value: 0,
        slide: function( event, ui ) {
        $( "#numberfour" ).val( ui.value );
            submitifvalid();
        }
    });
    $( "#numberfour" ).val( $( "#numberfourrange" ).slider( "value" ) );
    $("#numberfour").on('input', function() {
        console.log($("#numberfour").val());
        $("#numberfourrange").val ($("#numberfour").val());
        $("#numberfourrange").slider("value", $("#numberfour").val());
        submitifvalid();
      });

    // helper the function return true if the element's value is bigger than the right variable element
    $.validator.addMethod("greaterorequalthan",
    function(value, element, param){
        var $el = $(param);
        return parseInt(value, 10) >= parseInt($el.val(), 10);
    });

    // helper the function return true if the element's value is smaller than the right variable element
    $.validator.addMethod("lesserorequalthan",
    function(value, element, param){
        var $el = $(param);
        return parseInt(value, 10) <= parseInt($el.val(), 10);
    });
}

/*
    @description    creates the validation parameter of the slider
    *@param Name    none
    *@return        None
    *@throws        none
*/
function createvalidation(){
    // https://jqueryvalidation.org/files/demo/
    $("#theform").validate({
        onfocusout: function(element) {
            $("#theform").valid();
        },
        rules: {
            // https://jqueryvalidation.org/max-method/
            // custom rule to limit user input
            numberone: {
                required: true,
                lesserorequalthan: "#numbertwo",
                max: 50,
                min: -50,
            },
            numbertwo: {
                required: true,
                greaterorequalthan: "#numberone",
                max: 50,
                min: -50
            },
            numberthree: {
                required: true,
                lesserorequalthan: "#numberfour",
                max: 50,
                min: -50
            },
            numberfour: {
                required: true,
                greaterorequalthan: "#numberthree",
                max: 50,
                min: -50
            },
        },
        // custom display error message to display depending on the condition
        messages: {
            numberone: {
                required: "Please enter a number",
                lesserorequalthan: "Minimum value should be lesser than the Maximum, try a smaller number",
                max: "value should not exceed 50",
                min: "value should not be less than -50"
            },
            numbertwo: {
                required: "Please enter number",
                greaterorequalthan: "Maximum should be greater or equal than minimum, try a bigger number",
                max: "value should not exceed 50",
                min: "value should not be less than -50"
            },
            numberthree: {
                required: "Please enter a number",
                lesserorequalthan: "Minimum value should be lesser than the Maximum, try a smaller number",
                max: "value should not exceed 50",
                min: "value should not be less than -50"
            },
            numberfour: {
                required: "Please enter number",
                greaterorequalthan: "Maximum should be greater or equal than Minimum, try a bigger number",
                max: "value should not exceed 50",
                min: "value should not be less than -50"
            }
        },
        submitHandler: function(form, event) { 
            // https://stackoverflow.com/questions/10798717/preventing-a-form-from-submitting-in-jquery-validate-plugins-submithandler-func
            event.preventDefault();
            createtableNew("theform", "thetable");
        }
    });
}

/*
    @description                                        *Function Given a form and table's id, the form's value is use to
    *@param Name    String String                       The ID of the form from where to gather argument
                                                        and the ID of the table should be given
    *@return        None                                As of now no output
    *@throws        "INVALID INPUT" "RESOURCE INPUT"    "RESOURCE INPUT" is thrown when the
                                                        computation exceeds 2 minutes.
*/
function createtableNew(theformarg, thetablearg) {
    /* the form to gather input */
    var $theforme = $("#" + theformarg);

    var $theformValues = $theforme.serializeArray();

    /* the tabke where to output */
    var $thetablee = $("#" + thetablearg);

    /* Clear the table */
    $thetablee.text("");

    var $num0 = parseInt($theformValues[0].value, 10);
    var $num1 = parseInt($theformValues[1].value, 10);
    var $num2 = parseInt($theformValues[2].value, 10);
    var $num3 = parseInt($theformValues[3].value, 10);

    /* The first data is empty */
    var $therow = $("<tr></tr>");
    var $thedata = $("<td></td>");
    $thedata.width(50);
    $therow.append($thedata);

    var $i = $num2;
    var $j = $num0;

    /* The first row */
    for (var $i = $num0; $i <= $num1; $i++) {
        $thedata = $("<td></td>");
        $thedata.text($i);
        $thedata.width(50);
        $therow.append($thedata);
    }
    $thetablee.append($therow);

    /* 
        dynamically create the multiplicatibe table
        Handles event where computation time exceeds2 minutes
    */
    var initialunixtime = Date.now();
    $i = $num2;
    $j = $num0;
    
    while ($i <= $num3) {
        $therow = $("<tr></tr>");
        $thedata = $("<td></td>");
        $thedata.width(50);
        $thedata.text($i);
        $therow.append($thedata);
        while($j <= $num1) {
            var $thedata = $("<td></td>");
            $thedata.text($i*$j);
            $thedata.width(50);
            $therow.append($thedata);
            $j++;
        };
        $j = $num0;
        $thetablee.append($therow);
        $i++;
        /* Stop if more than 2 minutes have pass */
        if (Date.now() - initialunixtime >= 120000) {
            $thetablee.text("");
            $therow = $("<tr></tr>");
            $thedata = $("<td></td>");
            $thedata.text("Resource ERROR: Computation time exceeded");
            throw("Resource ERROR: Computation time exceeded");
            $therow.append($thedata);
            $thetablee.append($therow);
            break;
        };
    }
};

/*
    @description    creates the check boxs relative to number of tabs.
                    Loops tabs and create appropriate checker element,
                    appending it to the designated area
    *@param Name    none
    *@return        None
    *@throws        none
*/
function createtableremover(){
    var numberoftabs = $("#tabs").tabs("instance")["tabs"].length;
    $("#thecloseform").empty();
    for (var i = 0; i < numberoftabs; i++) {
        var $inputlabel = $("<input type=\"checkbox\" id = \"checkbox" + i + "\"name=\"chekbox" + i + "\" value=\"checkboxsdfsdf?" + i +"\">");
        var tempinnertext = $($($("#tabs").tabs("instance")["tabs"][i])[0]).find("a")[0].text;
        var $labellabel = $("<label id=\"checkbox" + i + "\">" + tempinnertext + "|   "  + "</label>")
        var $temphrerf = $($($("#tabs").tabs("instance")["tabs"][i])[0]).find("a")[0];
        $temphrerf =  $($temphrerf).attr("href");
        $("#thecloseform").append($inputlabel);
        $("#thecloseform").append($labellabel);
    };
}

/*
    @description    close the tabs based on the checkbox checked.
                    Loops checkbox if checked delete corresponding
                    tab. The tabs are selected based on index.
                    Offset value is used to account for deleted
                    elements.
    *@param Name    none
    *@return        None
    *@throws        none
*/
function closetabs(){
    var offsetval = 0;
    console.log("closing tabs");
    var $thecloseformelement = $($("#thecloseform")[0])[0];
    var numberofcheckform = $thecloseformelement.length;
    for (var i = 0; i < numberofcheckform; i++) {
        var ischeckboxactive = $($thecloseformelement[i]).prop("checked");
        console.log(ischeckboxactive);
        if (ischeckboxactive) {
            // https://stackoverflow.com/questions/21709989/no-such-method-remove-for-tabs-widget-instance
            $("#tabs").find( ".ui-tabs-nav li:eq(" + (i - offsetval) +")" ).remove();
            var $divwidgetsleft = $("#tabs").find("div");
            $divwidgetsleft[i-offsetval].remove();
            $("#tabs").tabs( "refresh" );
            offsetval++;
        }
    }
    // updates checkbox upon deletion
    createtableremover();
}

/*
    @description    close the tabs regardless of state.
                    Loops and destroy both tabs and
                    checkbox.
    *@param Name    none
    *@return        None
    *@throws        none
*/
function closealltabs() {
    var offsetval = 0;
    console.log("closing tabs");
    var $thecloseformelement = $($("#thecloseform")[0])[0];
    var numberofcheckform = $thecloseformelement.length;
    for (var i = 0; i < numberofcheckform; i++) {
        var ischeckboxactive = $($thecloseformelement[i]).prop("checked");
        console.log(ischeckboxactive);
            // https://stackoverflow.com/questions/21709989/no-such-method-remove-for-tabs-widget-instance
            $("#tabs").find( ".ui-tabs-nav li:eq(" + (i - offsetval) +")" ).remove();
            var $divwidgetsleft = $("#tabs").find("div");
            $divwidgetsleft[i-offsetval].remove();
            $("#tabs").tabs( "refresh" );
            offsetval++;
    }
    // updates checkbox upon deletion
    createtableremover();
}


/*
    @description    creates the validation parameter of the slider
    *@param Name    none
    *@return        None
    *@throws        none
*/
 function createtabs() {
    // https://jqueryui.com/tabs/#manipulation

    // helps in the creation of ids
    var tabcounterid = 0;

    // creates the table
    var tabs = $( "#tabs" ).tabs();

    $("#tabs").on("click", function(event, ui) {
        console.log("clicked");
        createtableremover();
    });

    // helper funcction, if form is valid 
    // create and append a tab element
    function addtabs(t) {
        console.log("added");
        var validonah = $("#theform").valid();
        if (!validonah) {
            return;
        };
        var label = "("+ $("#numberone").val() + "," + $("#numbertwo").val() + ") to " + "("+ $("#numberthree").val() + "," + $("#numberfour").val() + ")";
        var id = "tabs-" + tabcounterid;
        var li = $(" <li><a href=\"#"+ id+"\">"+ label+"</a> <span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span></li>")
        t.find( ".ui-tabs-nav" ).append( li );
        t.append( "<div id='" + id + "'><p>" + $("#display").html() + "</p></div>" );
        t.tabs("refresh");

        tabcounterid++;
        // updates checkbox upon deletion
        createtableremover();
    }

    // bind addtab to addtab buttons
    $( "#addtab" )
      .button()
      .on( "click", function() {
          addtabs(tabs);
    });

    // bind closetab to closetab buttons
    $( "#closetab" )
    .button()
    .on( "click", function() {
        closetabs();
    });

    // bind closealltab to closealltab buttons
    $( "#closealltab" )
    .button()
    .on( "click", function() {
        closealltabs();
    });
 
    // bind click to tabs in order to remoe individual tabs
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelid = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelid ).remove();
      tabs.tabs( "refresh" );
      console.log("tabs clicked");
    });
  };
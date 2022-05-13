/*
    PROG3185 Final Project
    gythianFacade.js

    Revision History
        Tonnicca Gelacio, 2019-04-04: Created
        Tonnicca Gelacio, 2019-04-07: Updated
        Tonnicca Gelacio, 2019-04-09: Updated
        Tonnicca Gelacio, 2019-04-10: Updated
        Tonnicca Gelacio, 2019-04-12: Updated
        Tonnicca Gelacio, 2019-04-13: Updated
*/

// Add a new build
function addBuild(){

    // Validation
    if (validateForm_frmAddNewBuild()){
        console.info("Validation is successful.");

        // Fetch input from controls
        var buildName = $("#txtAddBuildName").val();
        var buildType = $("#cboAddBuildType").val();
        var hero = $("#cboAddBuildHero").val();
        var role = $("#cboAddBuildRole").val();
        var item1 = $("#cboAddItem1").val();
        var item2 = $("#cboAddItem2").val();
        var item3 = $("#cboAddItem3").val();
        var item4 = $("#cboAddItem4").val();
        var item5 = $("#cboAddItem5").val();
        var item6 = $("#cboAddItem6").val();

        var opt = [buildName, buildType, hero, role, item1, item2, item3, item4, item5, item6];

        function success() {

            //Test
            console.info("Record inserted successfully.");

            alert("New Build Added");
            $("#frmAddNewBuild")[0].reset();
            $(location).prop('href', '#viewBuildsPage');
        }

        // Insert to table
        Build.insert(opt, success);
    }

    else {
        console.info("Validation failed.");
    }
}

// Update an Existing Build
function updateBuild() {

    // Validation
    if (validateForm_frmEditBuild()) {
        console.info("Validation is successful.");

        //Get id from local storage
        var id = localStorage.getItem("build_id");
        console.info("id: " + id);

        // Fetch input from controls
        var buildName = $("#txtEditBuildName").val();
        var buildType = $("#cboEditBuildType").val();
        var hero = $("#cboEditBuildHero").val();
        var role = $("#cboEditBuildRole").val();
        var item1 = $("#cboEditItem1").val();
        var item2 = $("#cboEditItem2").val();
        var item3 = $("#cboEditItem3").val();
        var item4 = $("#cboEditItem4").val();
        var item5 = $("#cboEditItem5").val();
        var item6 = $("#cboEditItem6").val();

        var opt = [buildName, buildType, hero, role, item1, item2, item3, item4, item5, item6, id];

        function success() {
            console.info("Record updated successfully.");
            alert("Build has been successfully updated.");
            $(location).prop('href', '#viewBuildsPage');
        }

        Build.update(opt, success);
    }

    else {
        console.info("Validation failed.");
    }
}

// Delete Build
function deleteBuild() {

    var id = localStorage.getItem("build_id");
    var options = [id];

    function callback() {
        console.info("Record deleted successfully.");
        alert("Build has been successfully deleted.");
        $(location).prop('href', '#viewBuildsPage');
    }

    Build.delete(options, callback);
}

//Clear database
function clearDatabase(){

    var result = confirm("Are you sure you want to clear the database?");

    if (result){
        try {
            DB.TGDropTables();
            alert("Database cleared!");
        }

        catch (e) {
            alert(e);
        }
    }
}

//Get Builds
function getBuilds() {

    console.info("Builds have been retrieved from table.");

    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            htmlCode += "<li style='opacity: 0.95;'>" + "<a data-role='button' data-row-buildID=" + row['build_id'] + " href='#'>" +
                "<img src='img/roles/" + row['role_name'] + ".png' alt='" + row['role_name'] + "' width='80px' height='80px' style='padding:5px;'>" +
                "<h1>" + row['build_name'] + "</h1>" +
                "<p>" + row['hero_name'] + " | " + row['build_type_name'] + "</p>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvBuildList");
        lv = lv.html(htmlCode);

        lv.listview("refresh"); //VERY IMPORTANT

        function clickHandler() {

            localStorage.setItem("build_id", $(this).attr("data-row-buildID"));
            $(location).prop('href', '#showBuildPage'); //REMEMBER! To navigate to other pages by code.
        }

        $("#lvBuildList a").on("click", clickHandler);

    }
    Build.selectAll(options, callback);
}

//Get Heroes
function getHeroes() {

    console.info("Heroes have been retrieved from table.");

    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            htmlCode += "<li style='opacity: 0.95;'>" + "<a data-role='button' data-row-heroName=" + row['name'] + " href='#'>" +
                "<img src='img/heroes/" + row['name'] + "_icon.png' alt='" + row['name'] + "' width='100px' height='100px' style='padding:10px;'>" +
                "<h1>" + row['name'] + "</h1>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvHeroList");
        lv = lv.html(htmlCode);

        lv.listview("refresh"); //VERY IMPORTANT

        function clickHandler() {

            localStorage.setItem("hero_name", $(this).attr("data-row-heroName"));
            $(location).prop('href', '#showHeroPage'); //REMEMBER! To navigate to other pages by code.
        }

        $("#lvHeroList a").on("click", clickHandler);

    }
    Heroes.selectAll(options, callback);
}

//Show Current Build
function showCurrentBuild() {

    var id = localStorage.getItem("build_id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        var htmlCode = "";

        htmlCode += "<h1 align='center'>" + row['build_name'] + "</h1>" +
            "<h3 align='center'>" + row['hero_name']  + " | " +
            row['role_name'] + " | " + row['build_type_name'] + "</h3>";

        displayItem(row['item1'], $("#item1details"));

        if (row['item2'] != null) {
            displayItem(row['item2'], $("#item2details"));
        }

        if (row['item3'] != null) {
             displayItem(row['item3'], $("#item3details"));
        }

        if (row['item4'] != null) {
             displayItem(row['item4'], $("#item4details"));
        }

        if (row['item5'] != null) {
             displayItem(row['item5'], $("#item5details"));
        }

        if (row['item6'] != null) {
             displayItem(row['item6'], $("#item6details"));
        }

        $("#displayBuildDetails").html(htmlCode);
    }

    Build.select(options, callback);
}

// Display individual items on viewCurrentBuild page
function displayItem(item, container) {

    var options = [item];

    function callback(tx, results) {
        var row = results.rows[0];

        var htmlCode = "";

        htmlCode += "<td style='padding:5px;'><img src='img/items/" + row['img_src'] + ".png' alt='" + row['item_name'] + "' width='60px' height='60px'></td>" +
            "<td style='padding:5px;'>" + row['item_name'] + "</td>";

        container.html(htmlCode);
    }

    Items.select(options, callback);
}

//Show Current Hero
function showCurrentHero() {

    var name = localStorage.getItem("hero_name");
    var options = [name];

    function callback(tx, results) {
        var row = results.rows[0];

        var htmlCode = "";

        htmlCode += "<h1 align='center'>" + row['name'] + "</h1>" +
            "<p align='center'>" +
            "<img src='img/heroes/" + row['name'] + ".png' alt='" + row['name'] + "' width='241px' height='385px'>" +
            "</p>" +
            "<p>" + row['desc'] + "</p>" +
            "<b>Heroic Perk: </b>" + row['perk'] +
            "<h3>Abilities</h3>" + "<ul>" +
            "<li> (A): " + row['skill1'] + "</li>" +
            "<li> (B): " + row['skill2'] + "</li>" +
            "<li> Ult: " + row['skill3'] + "</li>" +
            "</ul>";

        $("#displayHeroDetails").html(htmlCode);
    }

    Heroes.select(options, callback);
}

//Get Builds by Hero
function getBuildsByHero() {

    console.info("Builds have been retrieved from table.");
    var hero = localStorage.getItem("hero_name");
    var options = [hero];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            htmlCode += "<li style='opacity: 0.95;'>" + "<a data-role='button' data-row-buildID=" + row['build_id'] + " href='#'>" +
                "<img src='img/roles/" + row['role_name'] + ".png' alt='" + row['role_name'] + "' width='80px' height='80px' style='padding:5px;'>" +
                "<h1>" + row['build_name'] + "</h1>" +
                "<p>" + row['hero_name'] + " | " + row['build_type_name'] + "</p>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvBuildByHeroList");
        lv = lv.html(htmlCode);

        lv.listview("refresh"); //VERY IMPORTANT

        function clickHandler() {

            localStorage.setItem("build_id", $(this).attr("data-row-buildID"));
            $(location).prop('href', '#showBuildPage'); //REMEMBER! To navigate to other pages by code.
        }

        $("#lvBuildByHeroList a").on("click", clickHandler);

    }
    Build.selectByHero(options, callback);
}

//Get Items
function getItems() {

    console.info("Items have been retrieved from table.");

    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            htmlCode += "<li style='opacity: 0.95;'>" + "<a data-role='button' data-row-itemID=" + row['item_id'] + " href='#'>" +
                "<img src='img/items/" + row['img_src'] + ".png' alt='" + row['item_name'] + "' width='96px' height='96px'>" +
                "<h1>" + row['item_name'] + "</h1>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvItemList");
        lv = lv.html(htmlCode);

        lv.listview("refresh");

        function clickHandler() {

            localStorage.setItem("item_id", $(this).attr("data-row-itemID"));
            $(location).prop('href', '#showItemPage');
        }

        $("#lvItemList a").on("click", clickHandler);
    }

    Items.selectAll(options, callback);
}

//Show Current Item
function showCurrentItem() {

    var item_id = localStorage.getItem("item_id");
    var options = [item_id];

    function callback(tx, results) {
        var row = results.rows[0];

        var htmlCode = "";

        htmlCode += "<h1 align='center'>" + row['item_name'] + "</h1>" +
            "<p align='center'>" +
            "<img src='img/items/" + row['img_src'] + ".png' alt='" + row['name'] + "' width='96px' height='96px'>" +
            "</p>" +
            "<div style='background-color: #3D4544; opacity: 0.9; padding: 5px;'><h3 align='center'>Stats:</h3>" + "<p align='center'>" + row['stats'] +
            "</p></div>";

        $("#displayItemDetails").html(htmlCode);
    }

    Items.select(options, callback);
}

//Get Items by Type
function getItemsByType(item_type) {

    var options = [item_type];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            htmlCode += "<li style='opacity: 0.95;'>" + "<a data-role='button' data-row-itemID=" + row['item_id'] + " href='#'>" +
                "<img src='img/items/" + row['img_src'] + ".png' alt='" + row['item_name'] + "' width='96px' height='96px'>" +
                "<h1>" + row['item_name'] + "</h1>" +
                "</a>" +
                "</li>";
        }

        var lv = $("#lvItemList");
        lv = lv.html(htmlCode);

        lv.listview("refresh");

        function clickHandler() {

            localStorage.setItem("item_id", $(this).attr("data-row-itemID"));
            $(location).prop('href', '#showItemPage');
        }

        $("#lvItemList a").on("click", clickHandler);
    }

    Items.selectByType(options, callback);
}

// Update Hero Dropdown on Add New Build Page
function updateHeroDropdown(){

    console.info("[Dropdown] Heroes have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboAddBuildHero");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            cbo.append("<option value='"+row['name']+"'>" + row['name'] + "</option>");
        }

        //var cbo = $("#cboAddBuildHero");
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    Heroes.selectAll(options, callback);
}

// Update Build Type Dropdown on Add New Build Page
function updateBuildTypeDropdown(){

    console.info("[Dropdown] Build Types have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboAddBuildType");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            cbo.append("<option value='"+row['build_type_name']+"'>" + row['build_type_name'] + "</option>");
        }

        //var cbo = $("#cboAddBuildType");
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    BuildTypes.selectAll(options, callback);
}

// Update Role Dropdown on Add New Build Page
function updateRoleDropdown(){

    console.info("[Dropdown] Roles have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboAddBuildRole");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            cbo.append("<option value='"+row['role_name']+"'>" + row['role_name'] + "</option>");
        }

        //var cbo = $("#cboAddBuildRole");
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    RoleTypes.selectAll(options, callback);
}

// Update Item Type Dropdown
function updateItemTypeDropdown(selectedDropdown){

    console.info("[Dropdown] Item Type have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = selectedDropdown;
        cbo.find('option')
            .remove()
            .end();

        selectedDropdown.append("<option selected>Select item type...</option>");

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            selectedDropdown.append("<option value='"+row['item_type_id']+"'>" + row['item_type_name'] + "</option>");
        }

        //var cbo = selectedDropdown;
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }
    ItemTypes.selectAll(options, callback);
}

// Update Items By Type Dropdown
function updateItemByTypeDropdown(mainDropdown, subDropdown) {

    var itemType = mainDropdown.val();
    console.info("Type: " + itemType);

    var options = [itemType];

    function callback(tx, results) {

        var cbo = subDropdown;
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];

            subDropdown.append("<option value='" + row['item_id'] + "'>" + row['item_name'] + "</option>");
        }

        //var cbo = subDropdown;
        cbo.selectmenu("refresh"); //VERY IMPORTANT

        console.info("[Dropdown] Items (sorted by type) have been retrieved from table.");
    }

    Items.selectByType(options, callback);
}

// Edit Selected Build
function editSelectedBuild() {

    var id = localStorage.getItem("build_id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        $("#txtEditBuildName").val(row['build_name']);

        var selectedHero = row['hero_name'];
        updateHeroEditDropdown(selectedHero);

        var selectedRole = row['role_name'];
        updateRoleEditDropdown(selectedRole);

        var selectedBuildType = row['build_type_name'];
        updateBuildTypeEditDropdown(selectedBuildType);

        var item1 = row['item1'];
        getItemType(item1, $("#cboEditItem1Type"), $("#cboEditItem1"));

        var item2 = row['item2'];
        if (item2 == "" || item2 == null) {
            updateItemTypeDropdown($("#cboEditItem2Type"));
        }
        else
        {
            getItemType(item2, $("#cboEditItem2Type"), $("#cboEditItem2"));
        }

        var item3 = row['item3'];
        if (item3 == "" || item3 == null) {
            updateItemTypeDropdown($("#cboEditItem3Type"));
        }
        else
        {
            getItemType(item3, $("#cboEditItem3Type"), $("#cboEditItem3"));
        }

        var item4 = row['item4'];
        if (item4 == "" || item4 == null) {
            updateItemTypeDropdown($("#cboEditItem4Type"));
        }
        else
        {
            getItemType(item4, $("#cboEditItem4Type"), $("#cboEditItem4"));
        }

        var item5 = row['item5'];
        if (item5 == "" || item5 == null) {
            updateItemTypeDropdown($("#cboEditItem5Type"));
        }
        else
        {
            getItemType(item5, $("#cboEditItem5Type"), $("#cboEditItem5"));
        }

        var item6 = row['item6'];
        if (item6 == "" || item6 == null) {
            updateItemTypeDropdown($("#cboEditItem6Type"));
        }

        else {
        getItemType(item6, $("#cboEditItem6Type"), $("#cboEditItem6"));
        }

    }
    Build.select(options, callback);
}

function getItemType(selectedItem, mainDropdown, subDropdown) {

    var options = [selectedItem];

    function callback(tx, results) {
        var row = results.rows[0];
        var item_type_id = row['item_type_id'];

        updateItemTypeEditDropdown(item_type_id, mainDropdown);
        updateItemEditDropdown(item_type_id, selectedItem, subDropdown);
    }

    Items.select(options, callback);
}

// Update Item Type Dropdown on frmEditBuild
function updateItemTypeEditDropdown(itemType, selectedDropdown){

    console.info("[Dropdown] Item Type have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = selectedDropdown;
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            if (row['item_type_id'] === itemType)
            {
                cbo.append("<option value='"+row['item_type_id']+"' selected>" + row['item_type_name'] + "</option>");
            }

            else{
                cbo.append("<option value='"+row['item_type_id']+"'>" + row['item_type_name'] + "</option>");
            }
        }
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }
    ItemTypes.selectAll(options, callback);
}

// Update dropdown for Item in frmEditBuild
function updateItemEditDropdown(itemTypeID, selectedItem, subDropdown){

    var itemType = itemTypeID;
    console.info("[updateItemEditDropdown] item 1 type: " + itemType);

    var options = [itemType];

    function callback(tx, results) {

        var cbo = subDropdown;
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            if (row['item_id'] === selectedItem)
            {
                cbo.append("<option value='"+row['item_id']+"' selected>" + row['item_name'] + "</option>");
            }

            else{
                cbo.append("<option value='"+row['item_id']+"'>" + row['item_name'] + "</option>");
            }

        }
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    Items.selectByType(options, callback);
}

// Update dropdown for Role in frmEditBuild
function updateBuildTypeEditDropdown(selectedRole){

    console.info("Types have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboEditBuildType");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            if (row['build_type_name'] === selectedRole)
            {
                cbo.append("<option value='"+row['build_type_name']+"' selected>" + row['build_type_name'] + "</option>");
            }

            else{
                cbo.append("<option value='"+row['build_type_name']+"'>" + row['build_type_name'] + "</option>");
            }

        }
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    BuildTypes.selectAll(options, callback);
}

// Update dropdown for Role in frmEditBuild
function updateRoleEditDropdown(selectedBuildType){

    console.info("Types have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboEditBuildRole");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            if (row['role_name'] === selectedBuildType)
            {
                cbo.append("<option value='"+row['role_name']+"' selected>" + row['role_name'] + "</option>");
            }

            else{
                cbo.append("<option value='"+row['role_name']+"'>" + row['role_name'] + "</option>");
            }

        }
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    RoleTypes.selectAll(options, callback);
}

// Update dropdown for Heroes in frmEditBuild
function updateHeroEditDropdown(selectedHero){

    console.info("Types have been retrieved from table.");
    var options = [];

    function callback(tx, results) {

        var cbo = $("#cboEditBuildHero");
        cbo.find('option')
            .remove()
            .end();

        for (var i = 0; i <results.rows.length; i++){

            var row = results.rows[i];

            if (row['name'] === selectedHero)
            {
                cbo.append("<option value='"+row['name']+"' selected>" + row['name'] + "</option>");
            }

            else{
                cbo.append("<option value='"+row['name']+"'>" + row['name'] + "</option>");
            }

        }
        cbo.selectmenu("refresh"); //VERY IMPORTANT
    }

    Heroes.selectAll(options, callback);
}

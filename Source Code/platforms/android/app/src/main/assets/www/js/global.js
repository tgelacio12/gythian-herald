/*
    PROG3185 Final Project
    global.js

    Revision History
        Tonnicca Gelacio, 2019-04-04: Created
        Tonnicca Gelacio, 2019-04-07: Updated
        Tonnicca Gelacio, 2019-04-09: Updated
        Tonnicca Gelacio, 2019-04-10: Updated
        Tonnicca Gelacio, 2019-04-12: Updated
        Tonnicca Gelacio, 2019-04-13: Updated
*/

function btnAddBuild_click() {
    addBuild();
}

function btnEditBuild_click() {
    $(location).prop('href', '#modifyBuildPage');
}

function btnUpdateBuild_click() {
    updateBuild();
}

function btnDeleteBuild_click() {
    deleteBuild();
}

function btnClearSettings_click() {
    clearDatabase();
}

function btnWP_click() {
    getItemsByType(1);
}

function btnCP_click() {
    getItemsByType(2);
}

function btnDef_click() {
    getItemsByType(3);
}

function btnUtil_click() {
    getItemsByType(4);
}

function btnAll_click() {
    getItems();
}

function cboAddItem1Type_change() {
    updateItemByTypeDropdown($("#cboAddItem1Type"), $("#cboAddItem1"));
}

function cboAddItem2Type_change() {
    updateItemByTypeDropdown($("#cboAddItem2Type"), $("#cboAddItem2"));
}

function cboAddItem3Type_change() {
    updateItemByTypeDropdown($("#cboAddItem3Type"), $("#cboAddItem3"));
}

function cboAddItem4Type_change() {
    updateItemByTypeDropdown($("#cboAddItem4Type"), $("#cboAddItem4"));
}

function cboAddItem5Type_change() {
    updateItemByTypeDropdown($("#cboAddItem5Type"), $("#cboAddItem5"));
}

function cboAddItem6Type_change() {
    updateItemByTypeDropdown($("#cboAddItem6Type"), $("#cboAddItem6"));
}

function cboEditItem1Type_change() {
    updateItemByTypeDropdown($("#cboEditItem1Type"), $("#cboEditItem1"));
}

function cboEditItem2Type_change() {
    updateItemByTypeDropdown($("#cboEditItem2Type"), $("#cboEditItem2"));
}

function cboEditItem3Type_change() {
    updateItemByTypeDropdown($("#cboEditItem3Type"), $("#cboEditItem3"));
}

function cboEditItem4Type_change() {
    updateItemByTypeDropdown($("#cboEditItem4Type"), $("#cboEditItem4"));
}

function cboEditItem5Type_change() {
    updateItemByTypeDropdown($("#cboEditItem5Type"), $("#cboEditItem5"));
}

function cboEditItem6Type_change() {
    updateItemByTypeDropdown($("#cboEditItem6Type"), $("#cboEditItem6"));
}

function addNewBuildPage_show() {
    updateHeroDropdown();
    updateBuildTypeDropdown();
    updateRoleDropdown();
    updateItemTypeDropdown($("#cboAddItem1Type"));
    updateItemTypeDropdown($("#cboAddItem2Type"));
    updateItemTypeDropdown($("#cboAddItem3Type"));
    updateItemTypeDropdown($("#cboAddItem4Type"));
    updateItemTypeDropdown($("#cboAddItem5Type"));
    updateItemTypeDropdown($("#cboAddItem6Type"));

}

function modifyBuildPage_show() {
    editSelectedBuild();
}

function viewBuildsPage_show() {
    getBuilds();
}

function viewBuildByHeroPage_show() {
    getBuildsByHero();
}

function showBuildPage_show() {
    showCurrentBuild();
}

function viewAllHeroesPage_show() {
    getHeroes();
}

function showHeroPage_show() {
    showCurrentHero();
}

function viewAllItemsPage_show() {
    getItems();
}

function showItemPage_show() {
    showCurrentItem();
}

function TGinit() {
    console.info("DOM is ready.");

    $("#btnAddBuild").on("click", btnAddBuild_click);
    $("#btnEditBuild").on("click", btnEditBuild_click);
    $("#btnUpdateBuild").on("click", btnUpdateBuild_click);
    $("#btnDeleteBuild").on("click", btnDeleteBuild_click);

    $("#btnClearSettings").on("click", btnClearSettings_click);

    $("#btnAll").on("click", btnAll_click);
    $("#btnWP").on("click", btnWP_click);
    $("#btnCP").on("click", btnCP_click);
    $("#btnDef").on("click", btnDef_click);
    $("#btnUtil").on("click", btnUtil_click);

    $("#cboAddItem1Type").on("change", cboAddItem1Type_change);
    $("#cboAddItem2Type").on("change", cboAddItem2Type_change);
    $("#cboAddItem3Type").on("change", cboAddItem3Type_change);
    $("#cboAddItem4Type").on("change", cboAddItem4Type_change);
    $("#cboAddItem5Type").on("change", cboAddItem5Type_change);
    $("#cboAddItem6Type").on("change", cboAddItem6Type_change);

    $("#cboEditItem1Type").on("change", cboEditItem1Type_change);
    $("#cboEditItem2Type").on("change", cboEditItem2Type_change);
    $("#cboEditItem3Type").on("change", cboEditItem3Type_change);
    $("#cboEditItem4Type").on("change", cboEditItem4Type_change);
    $("#cboEditItem5Type").on("change", cboEditItem5Type_change);
    $("#cboEditItem6Type").on("change", cboEditItem6Type_change);

    $("#viewAllHeroesPage").on("pageshow", viewAllHeroesPage_show);
    $("#showHeroPage").on("pageshow", showHeroPage_show);
    $("#viewAllItemsPage").on("pageshow", viewAllItemsPage_show);
    $("#showItemPage").on("pageshow", showItemPage_show);
    $("#viewBuildsPage").on("pageshow", viewBuildsPage_show);
    $("#showBuildPage").on("pageshow", showBuildPage_show);
    $("#viewBuildByHeroPage").on("pageshow", viewBuildByHeroPage_show);

    $("#addNewBuildPage").on("pageshow", addNewBuildPage_show);
    $("#modifyBuildPage").on("pageshow", modifyBuildPage_show);
}

function TGinitDB() {

    try {
        DB.TGCreateDatabase();

        if (db) {
            console.info("Creating tables...");
            DB.TGCreateTables();
        }

        else {
            console.error("Error: Cannot create tables: database does not exist.");
        }
    }

    catch (e) {
        console.error("Error: (Fatal) error in initDB(). Cannot proceed.");
    }

}

// $(document).ready block
$(document).ready(function () {
    TGinit();
    TGinitDB();
});

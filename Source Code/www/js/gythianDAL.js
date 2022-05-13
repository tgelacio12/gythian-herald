/*
    PROG3185 Final Project
    gythianDAL.js

    Revision History
        Tonnicca Gelacio, 2019-04-04: Created
        Tonnicca Gelacio, 2019-04-07: Updated
        Tonnicca Gelacio, 2019-04-09: Updated
        Tonnicca Gelacio, 2019-04-10: Updated
        Tonnicca Gelacio, 2019-04-12: Updated
        Tonnicca Gelacio, 2019-04-13: Updated
*/

//'Select All' for item_type table
var ItemTypes = {
    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM item_type;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (item_type) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//'Select All' for build_type table
var BuildTypes = {
    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM build_type;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (build_type) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//'Select All' for role_type table
var RoleTypes = {
    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM role_type;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (role_type) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//'Select All' for heroes table
var Heroes = {
    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM heroes;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (heroes) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM heroes WHERE name=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Select (hero) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

//'Select All' for items table
var Items = {
    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM items;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (items) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM items WHERE item_id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Select (item) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByType: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM items WHERE item_type_id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectByType (items) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

// CRUD for Build Table
var Build = {
    insert: function(options, callback){

        function txFunction(tx) {

            var sql = "INSERT INTO build (build_name, build_type_name, hero_name, role_name, " +
                "item1, item2, item3, item4, item5, item6) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Insert transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options, callback){

        function txFunction(tx) {

            var sql = "UPDATE build SET build_name=?, build_type_name=?, hero_name=?, role_name=?, " +
                "item1=?, item2=?, item3=?, item4=?, item5=?, item6=? WHERE build_id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Update transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options, callback){

        function txFunction(tx) {

            var sql = "DELETE FROM build WHERE build_id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Delete transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    select: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM build WHERE build_id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Select (build) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },

    selectAll: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM build;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectAll (build) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByHero: function(options, callback){

        function txFunction(tx) {

            var sql = "SELECT * FROM build WHERE hero_name=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("selectByHero (build) transaction is successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


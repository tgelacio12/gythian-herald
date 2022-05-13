/*
    PROG3185 Final Project
    database.js

    Revision History
        Tonnicca Gelacio, 2019-04-04: Created
        Tonnicca Gelacio, 2019-04-07: Updated
        Tonnicca Gelacio, 2019-04-09: Updated
        Tonnicca Gelacio, 2019-04-10: Updated
        Tonnicca Gelacio, 2019-04-12: Updated
        Tonnicca Gelacio, 2019-04-13: Updated

 */
var db;

function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    TGCreateDatabase: function() {

        var shortName = "GythianDB";
        var version = "1.0";
        var displayName = "DB for Gythian Herald app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating a database...");

        function dbCreateSuccess() {
            console.info("Database created successfully.");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    TGCreateTables: function () {

        function txFunction(tx) {

            var options = [];

            function successQuery() {
                console.info("Query executed successfully.");
            }

            //drop item_type table
            var dropItemTypeSQL = "DROP TABLE IF EXISTS item_type;";
            tx.executeSql(dropItemTypeSQL, options, successQuery, errorHandler);

            //create item_type table
            var createItemTypeSQL = "CREATE TABLE IF NOT EXISTS item_type(" +
                "item_type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "item_type_name VARCHAR(20) NOT NULL);";
            tx.executeSql(createItemTypeSQL, options, successQuery, errorHandler);

            //insert rows to item_type table
            var weaponTypeSQL = "INSERT INTO item_type(item_type_name) VALUES ('Weapon');";
            var crystalTypeSQL = "INSERT INTO item_type(item_type_name) VALUES ('Crystal');";
            var defenseTypeSQL = "INSERT INTO item_type(item_type_name) VALUES ('Defense');";
            var utilityTypeSQL = "INSERT INTO item_type(item_type_name) VALUES ('Utility');";

            var itemTypes = [weaponTypeSQL, crystalTypeSQL, defenseTypeSQL, utilityTypeSQL];

            for (var i=0; i < itemTypes.length; i++)
            {
                var itemTypeSQL = itemTypes[i];
                tx.executeSql(itemTypeSQL, options, successQuery, errorHandler);
            }


            //drop role_type table
            var dropRoleTypeSQL = "DROP TABLE IF EXISTS role_type;";
            tx.executeSql(dropRoleTypeSQL, options, successQuery, errorHandler);

            //create role_type table
            var createRoleTypeSQL = "CREATE TABLE IF NOT EXISTS role_type(" +
                "role_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "role_name VARCHAR(20) NOT NULL);";
            tx.executeSql(createRoleTypeSQL, options, successQuery, errorHandler);

            //insert rows to roles_type table
            var laneSQL = "INSERT INTO role_type(role_name) VALUES ('Laner');";
            var jungleSQL = "INSERT INTO role_type(role_name) VALUES ('Jungler');";
            var supportSQL = "INSERT INTO role_type(role_name) VALUES ('Captain');";

            var roles = [laneSQL, jungleSQL, supportSQL];

            for (var j=0; j < roles.length; j++)
            {
                var rolesSQL = roles[j];
                tx.executeSql(rolesSQL, options, successQuery, errorHandler);
            }

            //drop build_type table
            var dropBuildTypeSQL = "DROP TABLE IF EXISTS build_type;";
            tx.executeSql(dropBuildTypeSQL, options, successQuery, errorHandler);

            //create build_type table
            var createBuildTypeSQL = "CREATE TABLE IF NOT EXISTS build_type(" +
                "build_type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "build_type_name VARCHAR(20) NOT NULL);";
            tx.executeSql(createBuildTypeSQL, options, successQuery, errorHandler);

            //insert rows to build_type table
            var weaponBldSQL = "INSERT INTO build_type(build_type_name) VALUES ('Weapon');";
            var crystalBldSQL = "INSERT INTO build_type(build_type_name) VALUES ('Crystal');";
            var supportBldSQL = "INSERT INTO build_type(build_type_name) VALUES ('Captain/Support');";
            var hybridBldSQL = "INSERT INTO build_type(build_type_name) VALUES ('Hybrid');";

            var buildTypes = [weaponBldSQL, crystalBldSQL, supportBldSQL, hybridBldSQL];

            for (var k=0; k < buildTypes.length; k++)
            {
                var buildTypesSQL = buildTypes[k];
                tx.executeSql(buildTypesSQL, options, successQuery, errorHandler);
            }
            
            //drop 'Items' table
            var dropItemsSQL = "DROP TABLE IF EXISTS items;";
            tx.executeSql(dropItemsSQL, options, successQuery, errorHandler);

            //create 'Items' table
            var createItemsSQL = "CREATE TABLE IF NOT EXISTS items(" +
                "item_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "item_name VARCHAR(30) NOT NULL," +
                "item_type_id INTEGER NOT NULL," +
                "img_src VARCHAR(30) NOT NULL," +
                "stats VARCHAR(150)," +
                "FOREIGN KEY(item_type_id) REFERENCES item_type(item_type_id));";

            tx.executeSql(createItemsSQL, options, successQuery, errorHandler);

            //insert rows to 'Items' table
            var cpSGsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Shatterglass', 2, 'shatterglass', '+130 Crystal Power');";
            var cpSFsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Spellfire', 2, 'spellfire', '+80 Crystal Power');";
            var cpDEsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Dragons Eye', 2, 'dragons-eye', '+75 Crystal Power');";
            var cpACsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Alternating Current', 2, 'alternating-current', '+45 Crystal Power | +40% Attack Speed');";
            var cpBMsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Broken Myth', 2, 'broken-myth', '+50 Crystal Power | +45% Shield Pierce');";
            var wpSBsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Sorrowblade', 1, 'sorrowblade', '+130 Weapon Power');";
            var wpPSsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Poisoned Shiv', 1, 'poisoned-shiv', '+35 Weapon Power | +35% Attack Speed | +10% Weapon Lifesteal');";
            var wpTMsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Tyrants Monocle', 1, 'tyrants-monocle', '+50 Weapon Power | +35% Critical Chance | +15% Critical Damage');";
            var wpTBsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Tension Bow', 1, 'tension-bow', '+40 Weapon Power | +45% Armor Pierce');";
            var wpBSsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Bonesaw', 1, 'bonesaw', '+30 Weapon Power | +30% Attack Speed | +30% Armor Pierce');";
            var utilJBsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Journey Boots', 4, 'journey-boots', '+0.7 Movement Speed | +150 Max Health');";
            var utilWTsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('War Treads', 4, 'war-treads', '+0.7 Movement Speed | +400 Max Health');";
            var utilHCsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Halcyon Chargers', 4, 'halcyon-chargers', '+0.7 Movement Speed | +150 Max Health | +15% CDR | +250 Max Energy | +3.5 Energy Recharge');";
            var defFRsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Fountain of Renewal', 3, 'fountain-of-renewal', '+400 Max Health | +40 Armor | +40 Shield');";
            var defCrucisql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Crucible', 3, 'crucible', '+550 Max Health');";
            var defCPsql = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Capacitor Plate', 3, 'capacitor-plate', '+400 Max Health | +30 Armor | +30 Shield | +15% CDR | +2.5 Energy Recharge');";
            var defAegisSQL = "INSERT INTO items(item_name, item_type_id, img_src, stats) VALUES ('Aegis', 3, 'aegis', '+200 Max Health | +45 Armor | +45 Shield');";

            var items = [cpACsql, cpBMsql, cpDEsql, cpSFsql, cpSGsql, wpBSsql, wpPSsql, wpSBsql, wpTBsql, wpTMsql, utilHCsql, utilJBsql, utilWTsql, defAegisSQL, defCPsql, defCrucisql, defFRsql];

            for (var x=0; x < items.length; x++)
            {
                var itemSQL = items[x];
                tx.executeSql(itemSQL, options, successQuery, errorHandler);
            }


            //drop 'Heroes' table
            var dropHeroesSQL = "DROP TABLE IF EXISTS heroes;";
            tx.executeSql(dropHeroesSQL, options, successQuery, errorHandler);

            //create 'Heroes' table
            var createHeroesSQL = "CREATE TABLE IF NOT EXISTS heroes(" +
                "hero_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(30) NOT NULL," +
                "perk VARCHAR(30)," +
                "skill1 VARCHAR(30)," +
                "skill2 VARCHAR(30)," +
                "skill3 VARCHAR(30)," +
                "desc VARCHAR(100));";

            tx.executeSql(createHeroesSQL, options, successQuery, errorHandler);

            //insert rows to 'Heroes' table
            var rezaSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Reza', 'Firestarter', 'Scorcher', 'Troublemaker', 'Netherform Detonator', 'A fast, devastating fire mage with a demon netherform.');";
            var lyraSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Lyra', 'Principle Arcanum', 'Imperial Sigil', 'Bright Bulwark', 'Arcane Passage', 'Healer and zone mage who can create teleportation portals.');";
            var idrisSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Idris', 'Divergent Paths', 'Shroudstep', 'Chakram', 'Shimmer Strike', 'Nimble assassin who unlocks melee or ranged fighting styles.');";
            var fortressSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Fortress', 'Packmates', 'Truth of the Tooth', 'Law of the Claw', 'Attack of the Pack', 'Aggressive pack leader who swarms the enemy with great speed.');";
            var adagioSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Adagio', 'Arcane Renewal', 'Gift of Fire', 'Agent of Wrath', 'Verse of Judgment', 'Team healer and damage enhancer with a large area stun.');";
            var ringoSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Ringo', 'Double Down', 'Achilles Shot', 'Twirling Silver', 'Hellfire Brew', 'Fast-moving, fast-shooting gunslinger with an epic fireball.');";
            var lorelaiSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Lorelai', 'Thats Swell', 'Fish Food', 'Splashdown', 'Waterwall', 'Backline support, excelling at zone control and team utility.');";
            var varyaSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Varya', 'Chain Lightning', 'Stormforged Spear', 'Arc Recursion', 'Anvils Hammer', 'Shocking valkyrie who chains massive damage across enemy teams.');";
            var jouleSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Joule', 'Heavy Plating', 'Rocket Leap', 'Thunder Strike', 'Big Red Button', 'Heavily armored mech rider with a powerful energy beam.');";
            var skaarfSQL = "INSERT INTO heroes(name, perk, skill1, skill2, skill3, desc) VALUES ('Skaarf', 'Fan the Flames', 'Spitfire', 'Goop', 'Dragon Breath', 'Spits long-range fireballs and incinerates entire teams.');";

            var heroes = [rezaSQL, lyraSQL, idrisSQL, fortressSQL, adagioSQL, ringoSQL, lorelaiSQL, varyaSQL, jouleSQL, skaarfSQL];

            for (var y=0; y < heroes.length; y++)
            {
                var heroesSQL = heroes[y];
                tx.executeSql(heroesSQL, options, successQuery, errorHandler);
            }

            //create 'Build' table
            var createBuildSQL = "CREATE TABLE IF NOT EXISTS build(" +
                "build_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "build_name VARCHAR(30) NOT NULL," +
                "build_type_name VARCHAR(20) NOT NULL," +
                "hero_name VARCHAR(30) NOT NULL," +
                "role_name VARCHAR(20) NOT NULL," +
                "item1 INTEGER," +
                "item2 INTEGER," +
                "item3 INTEGER," +
                "item4 INTEGER," +
                "item5 INTEGER," +
                "item6 INTEGER," +
                "FOREIGN KEY(build_type_name) REFERENCES build_type(build_type_name)," +
                "FOREIGN KEY(hero_name) REFERENCES heroes(hero_name)," +
                "FOREIGN KEY(role_name) REFERENCES role_type(role_name)," +
                "FOREIGN KEY(item1) REFERENCES items(item_id)," +
                "FOREIGN KEY(item2) REFERENCES items(item_id)," +
                "FOREIGN KEY(item3) REFERENCES items(item_id)," +
                "FOREIGN KEY(item4) REFERENCES items(item_id)," +
                "FOREIGN KEY(item5) REFERENCES items(item_id)," +
                "FOREIGN KEY(item6) REFERENCES items(item_id));";

            tx.executeSql(createBuildSQL, options, successQuery, errorHandler);
        }

        function successTransaction() {
            console.info("Create table transaction successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    TGDropTables: function () {

        function txFunction(tx) {

            var options = [];

            function successDrop() {
                console.info("Tables dropped successfully.");
            }

            //drop item_type table
            var dropItemTypeSQL = "DROP TABLE IF EXISTS item_type;";
            tx.executeSql(dropItemTypeSQL, options, successDrop, errorHandler);

            //drop role_type table
            var dropRoleTypeSQL = "DROP TABLE IF EXISTS role_type;";
            tx.executeSql(dropRoleTypeSQL, options, successDrop, errorHandler);

            //drop build_type table
            var dropBuildTypeSQL = "DROP TABLE IF EXISTS build_type;";
            tx.executeSql(dropBuildTypeSQL, options, successDrop, errorHandler);

            //drop 'Items' table
            var dropItemsSQL = "DROP TABLE IF EXISTS items;";
            tx.executeSql(dropItemsSQL, options, successDrop, errorHandler);

            //drop 'Heroes' table
            var dropHeroesSQL = "DROP TABLE IF EXISTS heroes;";
            tx.executeSql(dropHeroesSQL, options, successDrop, errorHandler);

            //drop 'Build' table
            var dropBuildSQL = "DROP TABLE IF EXISTS build;";
            tx.executeSql(dropBuildSQL, options, successDrop, errorHandler);
        }

        function successTransaction() {
            console.info("Drop table transaction successful.");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }

};

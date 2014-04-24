var snd = new Array()
                function preloadOGG() {
                    total = preloadOGG.arguments.length;
                   for (i = 0; i < total; i++) {
                        snd[i] = new Audio()
                        snd[i].src = preloadOGG.arguments[i];
                    }
                }
preloadOGG(
"audio/ogg/badlanding.ogg",
"audio/ogg/bad_code.ogg",
"audio/ogg/bad_light.ogg",
"audio/ogg/begin.ogg",
"audio/ogg/break_door.ogg",
"audio/ogg/broken_cardreader.ogg",
"audio/ogg/cave.ogg",
"audio/ogg/computer_type.ogg",
"audio/ogg/dig.ogg",
"audio/ogg/empty_supply.ogg",
"audio/ogg/good_code.ogg",
"audio/ogg/inventory_click.ogg",
"audio/ogg/key_locked.ogg",
"audio/ogg/locked_door.ogg",
"audio/ogg/maproom.ogg",
"audio/ogg/open_compartment.ogg",
"audio/ogg/open_door.ogg",
"audio/ogg/open_toolbox.ogg",
"audio/ogg/pickup.ogg",
"audio/ogg/pickup_keys.ogg",
"audio/ogg/pick_keycard.ogg",
"audio/ogg/remove_power.ogg",
"audio/ogg/rocks.ogg",
"audio/ogg/sail.ogg",
"audio/ogg/slide_door.ogg",
"audio/ogg/spaceship.ogg",
"audio/ogg/touch_glass.ogg",
"audio/ogg/unlock_door.ogg",
"audio/ogg/walk_building.ogg",
"audio/ogg/walk_computer.ogg",
"audio/ogg/walk_ladder.ogg",
"audio/ogg/walk_sand.ogg",
"audio/ogg/waves.ogg",
"audio/ogg/wind.ogg"
);
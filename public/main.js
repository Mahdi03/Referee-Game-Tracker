        try {
            var gamesTableInput = document.querySelector("#gamesTableInput");
            var gameNumber = 0;
            if (gamesReffed === []) {
                function insertAfter(newNode, referenceNode) {
                    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                }
                var pNotification = document.createElement("p");
                pNotification.innerHTML = "After you start adding games, they will show up here.";
                insertAfter(pNotification, gamesTableInput);
            }

            function deleteGamesFromTable() {
                var tableRows = gamesTableInput.querySelectorAll("tr");
                for (var f = 0; f < tableRows.length; f++) {
                    tableRows[f].parentNode.removeChild(tableRows[f]);
                    /*
                    for (var j = 4; j > -1; j--) {
                        gamesTableInput.querySelectorAll("tr")[f].deleteCell(j);
                        console.log("yay");
                    }
                    */
                }
            }

            function listGames() {
                deleteGamesFromTable();
                gamesReffed.forEach(function(gameObject) {
                    var tr = document.createElement("tr");
                    tr.setAttribute("gameNumber", gameNumber);
                    gameNumber++;
                    Object.values(gameObject).forEach(function(gameDetail) {
                        var td = document.createElement("td");
                        var detail = "";
                        var type = "";
                        switch (gameDetail) {
                            case "cr":
                                detail = "Center";
                                type = "position"
                                break;
                            case "ar":
                                detail = "Assistant";
                                type = "position";
                                break;
                            case "u8":
                                detail = "U-8";
                                type = "division";
                                break;
                            case "u10":
                                detail = "U-10";
                                type = "division";
                                break;
                            case "u12":
                                detail = "U-12";
                                type = "division";
                                break;
                            case "u14":
                                detail = "U-14";
                                type = "division";
                                break;
                            case "u16":
                                detail = "U-16";
                                type = "division";
                                break;
                            case "u19":
                                detail = "U-19";
                                type = "division";
                                break;
                            case "boys":
                                detail = "Boys";
                                type = "gender";
                                break;
                            case "girls":
                                detail = "Girls";
                                type = "gender";
                                break;
                            default:
                                //console.log(new Date(gameDetail).toLocaleDateString('en', {year: "numeric", month: "numeric", day: "numeric"}));
                                detail = gameDetail;
                                type = "date";
                        }
                        td.appendChild(document.createTextNode(detail));
                        td.setAttribute("type", type);
                        tr.appendChild(td);
                    });
                    gamesTableInput.appendChild(tr);
                });
            }
            listGames();
            $("#gamesList").scrollTableBody();

            var dateClicked = 0;
            var divisionClicked = 0;
            var genderClicked = 0;
            var positionClicked = 0;
            var dateDirection = document.querySelector("#dateDirection");
            var divisionDirection = document.querySelector("#divisionDirection");
            var genderDirection = document.querySelector("#genderDirection");
            var positionDirection = document.querySelector("#positionDirection");
            var upAndDownArr = "<i class='fas fa-arrows-alt-v'></i>";
            var downArr = "<i class='fas fa-long-arrow-alt-down'></i>";
            var upArr = "<i class='fas fa-long-arrow-alt-up'></i>";

            function resetArrDirection() {
                dateDirection.innerHTML = upAndDownArr;
                divisionDirection.innerHTML = upAndDownArr;
                genderDirection.innerHTML = upAndDownArr;
                positionDirection.innerHTML = upAndDownArr;
            }

            function sortDate() {
                dateClicked++;
                if (dateClicked % 2 === 1) {
                    resetArrDirection();
                    dateDirection.innerHTML = downArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.date === "" || b.date === "") {
                            returnValue = 1;
                        } else if (new Date(a.date) > new Date(b.date)) {
                            returnValue = 1;
                        } else if (new Date(a.date) < new Date(b.date)) {
                            returnValue = -1;
                        } else if (new Date(a.date) === new Date(b.date)) {
                            returnValue = 0;
                        }
                        return returnValue;
                    });
                } else if (dateClicked % 2 === 0) {
                    resetArrDirection();
                    dateDirection.innerHTML = upArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.date === "" || b.date === "") {
                            returnValue = 1;
                        } else if (new Date(a.date) > new Date(b.date)) {
                            returnValue = -1;
                        } else if (new Date(a.date) < new Date(b.date)) {
                            returnValue = 1;
                        } else if (new Date(a.date) === new Date(b.date)) {
                            returnValue = 0;
                        }
                        return returnValue;
                    });
                }
                listGames();
            }

            function sortDivision() {
                divisionClicked++;
                if (divisionClicked % 2 === 1) {
                    resetArrDirection();
                    divisionDirection.innerHTML = downArr;
                    gamesReffed.sort(function(a, b) {
                        return a.division.substr(1) - b.division.substr(1);
                    });
                } else if (divisionClicked % 2 === 0) {
                    resetArrDirection();
                    divisionDirection.innerHTML = upArr;
                    gamesReffed.sort(function(a, b) {
                        return b.division.substr(1) - a.division.substr(1);
                    });
                }
                listGames();
            }

            function sortGender() {
                genderClicked++;
                if (genderClicked % 2 === 1) {
                    resetArrDirection();
                    genderDirection.innerHTML = downArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.gender === b.gender) {
                            returnValue = 0;
                        } else if (a.gender !== b.gender && a.gender === "boys") {
                            returnValue = -1;
                        } else if (a.gender !== b.gender && b.gender === "boys") {
                            returnValue = 1;
                        }
                        return returnValue;
                    });
                } else if (genderClicked % 2 === 0) {
                    resetArrDirection();
                    genderDirection.innerHTML = upArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.gender === b.gender) {
                            returnValue = 0;
                        } else if (a.gender !== b.gender && a.gender === "boys") {
                            returnValue = 1;
                        } else if (a.gender !== b.gender && b.gender === "boys") {
                            returnValue = -1;
                        }
                        return returnValue;
                    });
                }
                listGames();
            }

            function sortPosition() {
                positionClicked++;
                if (positionClicked % 2 === 1) {
                    resetArrDirection();
                    positionDirection.innerHTML = downArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.position === b.position) {
                            returnValue = 0;
                        } else if (a.position !== b.position && a.position === "cr") {
                            returnValue = -1;
                        } else if (a.position !== b.position && b.position === "cr") {
                            returnValue = 1;
                        }
                        return returnValue;
                    });
                } else if (positionClicked % 2 === 0) {
                    resetArrDirection();
                    positionDirection.innerHTML = upArr;
                    gamesReffed.sort(function(a, b) {
                        var returnValue;
                        if (a.position === b.position) {
                            returnValue = 0;
                        } else if (a.position !== b.position && a.position === "cr") {
                            returnValue = 1;
                        } else if (a.position !== b.position && b.position === "cr") {
                            returnValue = -1;
                        }
                        return returnValue;
                    });
                }
                listGames();
            }
        } finally {
            console.log("List Of Games in Table");

            //Analytics Table
            try {
                //Statistics Global Variables List
                var totalCenterPos = 0;
                var totalAssistantPos = 0;
                var totalU8Games = 0;
                var totalU10Games = 0;
                var totalU12Games = 0;
                var totalU14Games = 0;
                var totalU16Games = 0;
                var totalU19Games = 0;
                var u8BoysCenter = 0;
                var u8GirlsCenter = 0;
                var u8BoysAssistant = 0;
                var u8GirlsAssistant = 0;
                var u10BoysCenter = 0;
                var u10GirlsCenter = 0;
                var u10BoysAssistant = 0;
                var u10GirlsAssistant = 0;
                var u12BoysCenter = 0;
                var u12GirlsCenter = 0;
                var u12BoysAssistant = 0;
                var u12GirlsAssistant = 0;
                var u14BoysCenter = 0;
                var u14GirlsCenter = 0;
                var u14BoysAssistant = 0;
                var u14GirlsAssistant = 0;
                var u16BoysCenter = 0;
                var u16GirlsCenter = 0;
                var u16BoysAssistant = 0;
                var u16GirlsAssistant = 0;
                var u19BoysCenter = 0;
                var u19GirlsCenter = 0;
                var u19BoysAssistant = 0;
                var u19GirlsAssistant = 0;

                var statisticsList = document.querySelector("#statisticsList");
                /*
                //Count all major totals with one category each
                var gameTRs = document.querySelectorAll("[gameNumber]");
                for (var i = 0; i < gameTRs.length; i++) {
                    var tds = gameTRs[i].children;
                    for (var j = 1; j < tds.length; j++) {
                        var type = tds[j].getAttribute("type");
                        var value = tds[j].innerText;
                        if (type === "position") {
                            if (value === "Center") {
                                totalCenterPos++;
                            } else if (value === "Assistant") {
                                totalAssistantPos++;
                            }
                        } else if (type === "division") {
                            switch (value) {
                                case "U-8":
                                    totalU8Games++;
                                    break;
                                case "U-10":
                                    totalU10Games++;
                                    break;
                                case "U-12":
                                    totalU12Games++;
                                    break;
                                case "U-14":
                                    totalU14Games++;
                                    break;
                                case "U-16":
                                    totalU16Games++;
                                    break;
                            }
                        } else if (type === "gender") {
                            if (value === "Boys") {
                                totalBoysGames++;
                            } else if (value === "Girls") {
                                totalGirlsGames++;
                            }
                        }
                    }
                }*/
                // Use the reffedGames Object to iterate through and count each and every
                // type of games categorically
                for (var p = 0; p < gamesReffed.length; p++) {
                    var division = gamesReffed[p].division;
                    var gender = gamesReffed[p].gender;
                    var position = gamesReffed[p].position;
                    switch (division) {
                        case "u8":
                            totalU8Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u8BoysCenter++;
                                    } else if (gender === "girls") {
                                        u8GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u8BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u8GirlsAssistant++;
                                    }
                                    break;
                            }
                            break;
                        case "u10":
                            totalU10Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u10BoysCenter++;
                                    } else if (gender === "girls") {
                                        u10GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u10BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u10GirlsAssistant++;
                                    }
                                    break;
                            }
                            break;
                        case "u12":
                            totalU12Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u12BoysCenter++;
                                    } else if (gender === "girls") {
                                        u12GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u12BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u12GirlsAssistant++;
                                    }
                                    break;
                            }
                            break;
                        case "u14":
                            totalU14Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u14BoysCenter++;
                                    } else if (gender === "girls") {
                                        u14GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u14BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u14GirlsAssistant++;
                                    }
                                    break;
                            }
                            break;
                        case "u16":
                            totalU16Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u16BoysCenter++;
                                    } else if (gender === "girls") {
                                        u16GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u16BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u16GirlsAssistant++;
                                    }
                                    break;
                            }
                            break;
                        case "u19":
                            totalU19Games++;
                            switch (position) {
                                case "cr":
                                    if (gender === "boys") {
                                        u19BoysCenter++;
                                    } else if (gender === "girls") {
                                        u19GirlsCenter++;
                                    }
                                    break;
                                case "ar":
                                    if (gender === "boys") {
                                        u19BoysAssistant++;
                                    } else if (gender === "girls") {
                                        u19GirlsAssistant++;
                                    }
                                    break;
                            }
                    }
                    switch (position) {
                        case "cr":
                            totalCenterPos++;
                            break;
                        case "ar":
                            totalAssistantPos++;
                            break;
                    }

                }
                //Add All of the values to the table
                for (var k = 0, row; row = statisticsList.rows[k]; k++) {
                    //row is a variable here
                    var attr = row.getAttribute("rowdivision");
                    for (var l = 0, col; col = row.cells[l]; l++) {
                        //col is a variable here
                        if (attr === "u8" && l === 1) {
                            col.innerHTML = u8BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-8 Boys Centers");
                        } else if (attr === "u8" && l === 2) {
                            col.innerHTML = u8GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-8 Girls Centers");
                        } else if (attr === "u8" && l === 3) {
                            col.innerHTML = u8GirlsCenter + u8BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-8 Centers Total");
                        } else if (attr === "u8" && l === 4) {
                            col.innerHTML = u8BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-8 Boys ARs");
                        } else if (attr === "u8" && l === 5) {
                            col.innerHTML = u8GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-8 Girls ARs");
                        } else if (attr === "u8" && l === 6) {
                            col.innerHTML = u8BoysAssistant + u8GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-8 ARs Total");
                        } else if (attr === "u8" && l === 7) {
                            col.innerHTML = totalU8Games;
                            col.setAttribute("title", col.innerHTML + " U-8 Games Total");
                        } else if (attr === "u10" && l === 1) {
                            col.innerHTML = u10BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-10 Boys Centers");
                        } else if (attr === "u10" && l === 2) {
                            col.innerHTML = u10GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-10 Girls Centers");
                        } else if (attr === "u10" && l === 3) {
                            col.innerHTML = u10BoysCenter + u10GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-10 Centers Total");
                        } else if (attr === "u10" && l === 4) {
                            col.innerHTML = u10BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-10 Boys ARs");
                        } else if (attr === "u10" && l === 5) {
                            col.innerHTML = u10GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-10 Girls ARs");
                        } else if (attr === "u10" && l === 6) {
                            col.innerHTML = u10BoysAssistant + u10GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-10 ARs Total");
                        } else if (attr === "u10" && l === 7) {
                            col.innerHTML = totalU10Games;
                            col.setAttribute("title", col.innerHTML + " U-10 Games Total");
                        } else if (attr === "u12" && l === 1) {
                            col.innerHTML = u12BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-12 Boys Centers");
                        } else if (attr === "u12" && l === 2) {
                            col.innerHTML = u12GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-12 Girls Centers");
                        } else if (attr === "u12" && l === 3) {
                            col.innerHTML = u12BoysCenter + u12GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-12 Centers Total");
                        } else if (attr === "u12" && l === 4) {
                            col.innerHTML = u12BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-12 Boys ARs");
                        } else if (attr === "u12" && l === 5) {
                            col.innerHTML = u12GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-12 Girls ARs");
                        } else if (attr === "u12" && l === 6) {
                            col.innerHTML = u12BoysAssistant + u12GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-12 ARs Total");
                        } else if (attr === "u12" && l === 7) {
                            col.innerHTML = totalU12Games;
                            col.setAttribute("title", col.innerHTML + " U-12 Games Total");
                        } else if (attr === "u14" && l === 1) {
                            col.innerHTML = u14BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-14 Boys Centers");
                        } else if (attr === "u14" && l === 2) {
                            col.innerHTML = u14GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-14 Girls Centers");
                        } else if (attr === "u14" && l === 3) {
                            col.innerHTML = u14BoysCenter + u14GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-14 Centers Total");
                        } else if (attr === "u14" && l === 4) {
                            col.innerHTML = u14BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-14 Boys ARs");
                        } else if (attr === "u14" && l === 5) {
                            col.innerHTML = u14GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-14 Girls ARs");
                        } else if (attr === "u14" && l === 6) {
                            col.innerHTML = u14BoysAssistant + u14GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-14 ARs Total");
                        } else if (attr === "u14" && l === 7) {
                            col.innerHTML = totalU14Games;
                            col.setAttribute("title", col.innerHTML + " U-14 Games Total");
                        } else if (attr === "u16" && l === 1) {
                            col.innerHTML = u16BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-16 Boys Center");
                        } else if (attr === "u16" && l === 2) {
                            col.innerHTML = u16GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-16 Girls Center");
                        } else if (attr === "u16" && l === 3) {
                            col.innerHTML = u16BoysCenter + u16GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-16 Center Total");
                        } else if (attr === "u16" && l === 4) {
                            col.innerHTML = u16BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-16 Boys ARs");
                        } else if (attr === "u16" && l === 5) {
                            col.innerHTML = u16GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-16 Girls ARs");
                        } else if (attr === "u16" && l === 6) {
                            col.innerHTML = u16BoysAssistant + u16GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-16 ARs Total");
                        } else if (attr === "u16" && l === 7) {
                            col.innerHTML = totalU16Games;
                            col.setAttribute("title", col.innerHTML + " U-16 Games Total");
                        } else if (attr === "u19" && l === 1) {
                            col.innerHTML = u19BoysCenter;
                            col.setAttribute("title", col.innerHTML + " U-19 Boys Center");
                        } else if (attr === "u19" && l === 2) {
                            col.innerHTML = u19GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-19 Girls Center");
                        } else if (attr === "u19" && l === 3) {
                            col.innerHTML = u19BoysCenter + u19GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " U-19 Centers Total");
                        } else if (attr === "u19" && l === 4) {
                            col.innerHTML = u19BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " U-19 Boys ARs");
                        } else if (attr === "u19" && l === 5) {
                            col.innerHTML = u19GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-19 Girls ARs");
                        } else if (attr === "u19" && l === 6) {
                            col.innerHTML = u19BoysAssistant + u19GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " U-19 ARs Total");
                        } else if (attr === "u19" && l === 7) {
                            col.innerHTML = totalU19Games;
                            col.setAttribute("title", col.innerHTML + " U-19 Games Total");
                        } else if (attr === "total" && l === 1) {
                            col.innerHTML = u8BoysCenter + u10BoysCenter + u12BoysCenter + u14BoysCenter + u16BoysCenter + u19BoysCenter;
                            col.setAttribute("title", col.innerHTML + " Boys Games Centered Total");
                        } else if (attr === "total" && l === 2) {
                            col.innerHTML = u8GirlsCenter + u10GirlsCenter + u12GirlsCenter + u14GirlsCenter + u16GirlsCenter + u19GirlsCenter;
                            col.setAttribute("title", col.innerHTML + " Girls Games Centered Total");
                        } else if (attr === "total" && l === 3) {
                            col.innerHTML = totalCenterPos;
                            col.setAttribute("title", col.innerHTML + " Games Centered Total");
                        } else if (attr === "total" && l === 4) {
                            col.innerHTML = u8BoysAssistant + u10BoysAssistant + u12BoysAssistant + u14BoysAssistant + u16BoysAssistant + u19BoysAssistant;
                            col.setAttribute("title", col.innerHTML + " Boys Games AR-ed Total");
                        } else if (attr === "total" && l === 5) {
                            col.innerHTML = u8GirlsAssistant + u10GirlsAssistant + u12GirlsAssistant + u14GirlsAssistant + u16GirlsAssistant + u19GirlsAssistant;
                            col.setAttribute("title", col.innerHTML + " Girls Games AR-ed Total");
                        } else if (attr === "total" && l === 6) {
                            col.innerHTML = totalAssistantPos;
                            col.setAttribute("title", col.innerHTML + " Games AR-ed Total");
                        } else if (attr === "total" && l === 7) {
                            col.innerHTML = totalCenterPos + totalAssistantPos;
                            col.setAttribute("title", col.innerHTML + " Games Refereed Total");
                        }
                    }
                }
            } finally {
                console.log("Analytics Table");

                //Badge Eligibility
                try {
                    var intermediateEligibility = document.querySelector("#intermediateEligibility");
                    var advancedEligibility = document.querySelector("#advancedEligibility");
                    var nationalEligibility = document.querySelector("#nationalEligibility");
                    var eligible = "<span style='color: green;'>Eligible</span>";
                    var ineligible = "<span style='color: red;'>Ineligible</span>";
                    if (totalCenterPos >= 25 && u12BoysCenter + u12GirlsCenter >= 5) {
                        intermediateEligibility.innerHTML = eligible;
                    } else {
                        intermediateEligibility.innerHTML = ineligible;
                    }
                    if ((totalCenterPos >= 50 && u14BoysCenter + u14GirlsCenter >= 10) && u14BoysAssistant + u14GirlsAssistant >= 5) {
                        advancedEligibility.innerHTML = eligible;
                    } else {
                        advancedEligibility.innerHTML = ineligible;
                    }
                    if (totalCenterPos >= 100 && (u16BoysCenter + u16GirlsCenter >= 30 || u19BoysCenter + u19GirlsCenter >= 15) && (u16BoysAssistant + u16GirlsAssistant >= 25 || u19BoysAssistant + u19GirlsAssistant >= 10)) {
                        nationalEligibility.innerHTML = eligible;
                    } else {
                        nationalEligibility.innerHTML = ineligible;
                    }
                } finally {
                    console.log("Badge Eligibility Table");
                }
            }
        }
        console.error("If you are reading this, then congrats on knowing how to get here!!");
        console.log("I know there are many mistakes in my code, please, if you would like to help, go ahead!!");
        console.log("Here's my repo:\nhttps://github.com/Mahdi03/Referee-Game-Tracker.git");
        console.log("Thanks for helping out!!");
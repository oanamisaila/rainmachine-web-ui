/*
 *	Copyright (c) 2015 RainMachine, Green Electronics LLC
 *	All rights reserved.
 */

window.ui = window.ui || {};

(function(_main) {

 	var loop = null;
	var loopSlowLastRun = Date.now();
	var loopMediumLastRun = Date.now();
    var uiLastWateringState = false;
    var programsExpanded = false;
    var zonesExpanded = false;
	var stopCalls = false;
    var uiElems = {};
	var runs = 0;


	function showError(message)
	{
		 uiElems.error.innerHTML = message;
		 uiElems.error.style.display = "inline";
	}



	function uiLoop() {

		clearTag(uiElems.logs);

		var api = API.getApiVer();
		uiElems.logs.innerHTML = "Got API: " + JSON.stringify(api) + "<br>";

		var accessToken = API.auth('admin', true);
		if (accessToken) {
			API.setAccessToken(accessToken);
		} else {
			showError("Invalid login!");
			return;
		}

		uiElems.logs.innerHTML += "Logged in <br>";
		var datetime = API.getDateTime();
		uiElems.logs.innerHTML += "Date/Time: " + JSON.stringify(datetime)+ "<br>";

		var dailyStats = API.getDailyStats();

		if (!dailyStats) {
			showError("Cannot get dailyStats");
			return;
		}

		uiElems.logs.innerHTML += "Got dailystats <br>";


		var nextruns = API.getProgramsNextRun();
		uiElems.logs.innerHTML += "Next Runs: " + JSON.stringify(nextruns) +  "<br>";

		runs++;
		uiElems.apiruns.textContent = runs;
	}

	function uiStart()
	{
		//Load local settings
		Data.localSettings = Storage.restoreItem("localSettings") || Data.localSettings;

		uiElems.error = $('#error');
		uiElems.error.onclick = function() { makeHidden(this); };
		uiElems.run = $('#run');
		uiElems.run.onclick = function() { uiLoop(); };
		uiElems.apiruns = $('#apiruns');
		uiElems.logs = $('#logs');
	}

	//--------------------------------------------------------------------------------------------
	//
	//
	_main.showError = showError;
	_main.uiStart = uiStart;

} (window.ui.main = window.ui.main || {}));

window.addEventListener("load", window.ui.main.uiStart);

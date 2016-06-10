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


	function showError(message)
	{
		 uiElems.error.innerHTML = message;
		 uiElems.error.style.display = "inline";
	}



	function uiLoop() {
		var pastDays = 30;
		var queue = null;

		if (stopCalls) {
			return;
		}
		APIAsync.getWateringQueue()
			.then(function(o) { queue = o;})
			.error(function(o) { window.ui.main.showError("Error getting watering/queue"); });

		//for programs name and status
		APIAsync.getPrograms()
			.then(function(o) { Data.programs = o; })
			.error(function(o) { window.ui.main.showError("Error getting programs"); });

		//for programs name and status
		APIAsync.getPrograms()
			.then(function(o) { Data.programs = o; })
			.error(function(o) { window.ui.main.showError("Error getting programs"); });

		//for programs name and status
		APIAsync.getPrograms()
			.then(function(o) { Data.programs = o; })
			.error(function(o) { window.ui.main.showError("Error getting programs"); });

		//for programs name and status
		APIAsync.getPrograms()
			.then(function(o) { Data.programs = o; })
			.error(function(o) { window.ui.main.showError("Error getting programs"); });

		//for weather data in the  past + 7 future
		//APIAsync.getMixer(Util.getDateWithDaysDiff(pastDays), pastDays + 7)
		//	.then(function(o) { Data.mixerData = o.mixerDataByDate;  })
		//	.error(function(o) { window.ui.main.showError("Error getting mixer"); });
		//
		////for used water
		//APIAsync.getWateringLog(false, true,  Util.getDateWithDaysDiff(pastDays), pastDays)
		//	.then(function(o) { Data.waterLog = o;})
		//	.error(function(o) { window.ui.main.showError("Error getting waterlog"); });
		//
		//// for water saved gauge (entire year)
		//APIAsync.getWateringLog(false, false, Util.getDateWithDaysDiff(YEARDAYS + 7), YEARDAYS + 7)
		//	.then(function(o) { Data.waterLogSimple = o; })
		//	.error(function(o) { window.ui.main.showError("Error getting waterlog simple"); });
		//
		//APIAsync.getDailyStats(null, true)
		//	.then(function(o) {	makeHidden("#error"); Data.dailyDetails = o; }) //for water need in the future
		//	.error(function(o) { window.ui.main.showError("Error getting dailystats"); });

	}

	function uiStart()
	{
		//Load local settings
		Data.localSettings = Storage.restoreItem("localSettings") || Data.localSettings;

		uiElems.error = $('#error');
		uiElems.error.onclick = function() { makeHidden(this); };
		uiElems.STOP = $('#STOP');
		uiElems.STOP.onclick = function() { stopCalls = !stopCalls; };

		ui.login.login(function() {
        	loop = setInterval(uiLoop, 1000);
		});
	}

	//--------------------------------------------------------------------------------------------
	//
	//
	_main.showError = showError;
	_main.uiStart = uiStart;
	_main.weatherRefreshed = false;

} (window.ui.main = window.ui.main || {}));

window.addEventListener("load", window.ui.main.uiStart);

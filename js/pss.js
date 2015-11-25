/**
 * 
 */
console.log(this);

function debug(text)
{
	$("#debugData").val(text);
}

function checkNum(id)
{
	var num =$("#"+id).val();
	
	if (isNaN(num)){
		this.messageBox("Toto nie je číslo");
		$("#"+id).val(1);
	}
}

function saveTaskFnc()
{
	
	var taskName = $("#task_name").val().trim();
	if (taskName.length >0){
		var data = {
			task_name:taskName,
			task_count:$("#task_count").val(),
			task_comment:$("#task_comment").val()
		}
	
		var t= new js_comunication();
		t.addRawRequest("index.php?a=async","pss/saveTask",this,[data,"testFunc"]);
		t.sendData();
	}
	else{
		this.messageBox("Nazov ulohy musi byt udany !!!!");
	}
	
}

function testFunc(status,result)
{
	if (status)
	{
		
		var taskName = $("#task_name").val();
		
		$("#task_name").val("");
		$("#task_count").val("");
		$("#task_comment").val("");
		
		var str = onlineRes.fncs.sprintf("<option id='{lastId}'>{taskName}</option>",{lastId:result.lastId,taskName:taskName});
		
		$("#zoznam_dl").append(str);
		
	}
}

function getCountAmount()
{
	var id = $("#zoznam_dl").val();
	if (id != "-"){
		$("#saveButton").prop('disabled',false);
		$("#saveCompletedTask_btn").prop('disabled',false);
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/getTaskAmounts",this,[{taskId:id},"showAmountData"]);
		t.sendData();
	
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/getComplAmounts",this,[{taskId:id},"showComplData"]);
		t.sendData();
	}
	else{
		$("#saveButton").prop('disabled',true);
		$("#saveCompletedTask_btn").prop('disabled',true);
		$("#taskToCompl").html("0");
		$("#taskCompleted").html("0");
	}
}
	

function showAmountData(status,result)
{
	$("#taskToCompl").html(result.pocet);
}

function showComplData(status,result)
{
	$("#taskCompleted").html(result.pocet);
}

function messageBox(text)
{
	$("#dialogBox").html(text);
	$("#dialogBox").dialog({
						buttons: [
									{
										text: "Ok",
											icons: {
													primary: "ui-icon-heart"
													},
										click: function() {
											$( this ).dialog( "close" );
										}
// Uncommenting the following line would hide the text,
// resulting in the label being used as a tooltip
//showText: false
									}
						]});
	$("#dialogBox").dialog({title:"InfoBox"});
}

function saveNewCompletedTask()
{
	
	var taskId = $("#zoznam_dl").val();
	
	if (taskId != "-"){
			var data={ 
			taskId:taskId,
			taskDate:$("#datePicker").val(),
			taskComment:$("#task_comment").val()
		};
	
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/saveNewTask",this,[data,"afterSaveNewTask"]);
		t.sendData();
	}
	else
	{
		this.messageBox("Nie je nič vybrané")
		
	}
	
}

function tabAction(event,ui)
{
	var panel = ui.newPanel.selector;
	
	if (panel=="#tab3"){
		var t = new js_comunication();
		t.addRawRequest("index.php?a=async","pss/loadOverView",this, [{},"showOverView"]);
		t.sendData();
	}
	
}

function showOverView(status,result)
{
	$("#overView").html(result);
}

function afterSaveNewTask(status,result)
{
	if (status){
		this.getCountAmount();
	}
	else{
		this.debug(result.msg);
	}
}

$(document).ready(function(){
	
	$("#tabs").tabs();
	$("#tabs").tabs({activate:function(event,ui){tabAction(event,ui)}});
	
	$("#datePicker").datepicker();
	$("#datePicker").datepicker( "option", "dateFormat","yy-mm-dd");
	$("#datePicker").datepicker( "setDate", "yy-mm-dd");
	
	$("#saveButton").prop('disabled',true);
	$("#saveCompletedTask_btn").prop('disabled',true);
	
	$("#saveTaskBtn").click(function(e){
	 	saveTaskFnc();
	 });
//	
});
/**
 * 
 */

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
	var updateId = Number($("#updateTaskId").val());
	
	var taskName = $("#task_name").val().trim();
	
	if (!isNaN(updateId) && updateId !=0){
		
		var data = {
			task_id:updateId,
		 	task_name:taskName,
			task_count:$("#task_count").val(),
			task_comment:$("#task_comment_tab2").val()
		}		
		//console.log(["zle",data]);
		var t= new js_comunication();
		t.addRawRequest("index.php","pss/updateTaskData",this,[data,"afterUpdateTask",updateId]);
		t.sendData();
	}
	else{
		
		
		if (taskName.length >0){
		var data = {
				task_name:taskName,
				task_count:$("#task_count").val(),
				task_comment:$("#task_comment_tab2").val()
			}
	
			var t= new js_comunication();
			t.addRawRequest("index.php","pss/saveTask",this,[data,"afterInsertTask"]);
			t.sendData();
		}
		else{
			this.messageBox("Nazov ulohy musi byt udany !!!!");
		}
	}
}
function afterUpdateTask(status,result,taskId)
{
	if (status){
		var taskName = $("#task_name").val().trim();
		console.log(["chra",taskId,taskName]);
		$("#zoznam_dl option[value='"+taskId+"']").text(taskName).change();
		
		$("#task_name").val("");
		$("#task_count").val("");
		$("#task_comment_tab2").val("");
		
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/loadTasks",this, [{},"showAvaibleTasks"]);
		t.sendData();
		
	}
	else{
		this.messageBox(result);
	}
}

function afterInsertTask(status,result)
{
	if (status)
	{
		
		var taskName = $("#task_name").val();
		
		$("#task_name").val("");
		$("#task_count").val("");
		$("#task_comment_tab2").val("");
		
		var str = onlineRes.fncs.sprintf("<option id='{lastId}'>{taskName}</option>",{lastId:result.lastId,taskName:taskName});
		
		$("#zoznam_dl").append(str);
		
		this.runTabAction("#tab2");
		
		
	}
	else{
		this.messageBox(result);
	}
}

function resetSubtasks()
{
	$("#subTasks_dl").empty();
	$("#subTasks_dl").append("<option id='-'>-</option>");
}

function getCountAmount()
{
	this.resetSubtasks();
	
	var id = $("#zoznam_dl").val();
	var name = $("#zoznam_dl :selected").text();
	
	if (id != "-"){
		
		$("#task_name").val(name);
		
		$("#taskType").text("v skupine "+name);
		
		$("#saveButton").prop('disabled',false);
		$("#saveCompletedTask_btn").prop('disabled',false);
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/getTaskAmounts",this,[{taskId:id},"showAmountData"]);
		t.sendData();
	
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/getComplAmounts",this,[{taskId:id},"showComplData"]);
		t.sendData();
		
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/getSubTasks",this,[{taskId:id},"showSubTasks"]);
		t.sendData();
		
	}
	else{
		
		$("#taskType").text("v hlavnom zozname..");
		
		$("#saveButton").prop('disabled',true);
		
		$("#saveSubTask").css("display","none");
		
		$("#saveCompletedTask_btn").prop('disabled',true);
		$("#taskToCompl").html("0");
		$("#taskCompleted").html("0");
	}
}

function showSubTasks(status,result)
{
	//console.log([status,result]);
	if (status){
		var subLn = result.length;
		for (var i=0; i<subLn; i++){
			var str = "<option value='{id}'>{name}</option>";
			str = onlineRes.fncs.sprintf(str,{id:result[i].id,name:result[i].name});
			console.log(str);
			$("#subTasks_dl").append(str);
		}
	}
}
	

function showAmountData(status,result)
{
	$("#taskToCompl").html(result.pocet);
	$("#comment_lbl").html(result.comment);
	
	$("#task_count").val(result.pocet);
	$("#task_comment_tab2").val(result.comment);
	
}

function showComplData(status,result)
{
	$("#taskCompleted").html(result.pocet);
	$("#saveSubTask").css("display","inline");
	//this.showSubTasks()
}

function insertNewSubTask()
{
	var parentId = Number($("#zoznam_dl").val());
	
	if (!isNaN(parentId) && parentId !=0){
		var data = {
				parentId:parentId,
				taskName:$("#task_name").val(),
				taskCount:$("#task_count").val(),
				taskComment:$("#task_comment_tab2").val()
		}
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/insertNewSubTask",this,[data,"afterNewSubTaskInsert"]);
		t.sendData();
	}
	
}

function afterNewSubTaskInsert(status,result)
{
	if (status){
		messageBox("Poduloha uspesne pridana....");
		
		$("#task_name").val("");
		$("#task_count").val("");
		$("#task_comment_tab2").val("");
		
		
		var str = "<option id='{id}'>{name}</option>";
		str = onlineRes.fncs.sprintf(str,{id:result.lastId,name:$("#task_name").val()});
		$("#subTasks_dl").append(str);
	}else{
		messageBox(result.result);
	}
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
	
	var subTaskId = $("#subTasks_dl").val();
	
	console.log([taskId,subTaskId]);
	if (taskId != "-" && subTaskId == "-"){
			var data={ 
			taskId:taskId,
			taskDate:$("#datePicker").val(),
			taskComment:$("#task_comment").val()
		};
	
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/saveNewTask",this,[data,"afterSaveNewTask"]);
		t.sendData();
	}
	else if (taskId != "-" && subTaskId != '-')	{
		var data={ 
				//taskId:taskId,
				subTaskId:subTaskId,
				taskDate:$("#datePicker").val(),
				taskComment:$("#task_comment").val()
			};
		
			var t = new js_comunication();
			t.addRawRequest("index.php","pss/saveNewSubTask",this,[data,"afterSaveNewSubTask",subTaskId]);
			t.sendData();
	}
	else
	{
		this.messageBox("Nie je nič vybrané")
		
	}
	
}

function afterSaveNewSubTask(status,result,subTaskId)
{
	if (status)	{
		this.loadSubTaskStatus(subTaskId);
		
		}
}

function loadSubTaskStatus(subTaskId)
{
	var t = new js_comunication();
	t.addRawRequest("index.php","pss/getSubTaskAmount",this,[{subTaskId:subTaskId},"showSubTaskAmount"]);
	t.sendData();
	
	var t = new js_comunication();
	t.addRawRequest("index.php","pss/getSubTaskStatus",this,[{subTaskId:subTaskId},"showSubTaskStatus"]);
	t.sendData();
}

function showSubTaskAmount(status,result)
{
	if (status){
		$("#taskSubToCompl").html(result.pocet);
	}
}

function getSubCountAmount()
{
	var id = $("#subTasks_dl").val();
	
	if (id !="-"){
		this.loadSubTaskStatus(id);
	}else{
		$("#taskSubToCompl").html("0");
		$("#taskSubCompleted").html("0");
	}
	
	
}

function showSubTaskStatus(status,result)
{
	if (status){
		$("#taskSubCompleted").html(result.pocet);
	}
}



function runTabAction(tab)
{
	if (tab == "#tab2"){
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/loadTasks",this, [{},"showAvaibleTasks"]);
		t.sendData();
	}
}

function tabAction(event,ui)
{
	var panel = ui.newPanel.selector;
	
	if (panel=="#tab3"){
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/loadOverView",this, [{},"showOverView"]);
		t.sendData();
	}
	if (panel =="#tab2"){
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/loadTasks",this, [{},"showAvaibleTasks"]);
		t.sendData();
	}
	
}

function deleteTask(id)
{
	var st = confirm("Naozaj zmazať ? Pozor zmažú sa aj priradené ulohy...");
	
	if (st){
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/deleteTask",this, [{taskId:id},"afterDeleteTask",id]);
		t.sendData();
	}
}

function editTask(id)
{
	var t = new js_comunication();
	t.addRawRequest("index.php","pss/loadTaskData",this, [{taskId:id},"insertTaskData",id]);
	t.sendData();
}

function insertTaskData(status,result,taskId)
{
	if (status){
		$("#updateTaskId").val(taskId);
		
		$("#task_name").val(result.name);
		$("#task_count").val(result.pocet);
		$("#task_comment_tab2").val(result.comment);
	}
	else{
		this.messageBox(result);
	}
}


function afterDeleteTask(status,result,taskId)
{
	if (status){
		$("#zoznam_dl option[value='"+taskId+"']").remove();
		
		var t = new js_comunication();
		t.addRawRequest("index.php","pss/loadTasks",this, [{},"showAvaibleTasks"]);
		t.sendData();
	}
	else{
		this.messageBox(result);
	}
}

function showAvaibleTasks(status,result)
{
	
	$("#editView").html(result);
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
		this.messageBox(result.msg);
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
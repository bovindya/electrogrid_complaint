(document).ready(function()
{
	 $("#alertSuccess").hide();
 	 $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
 	$("#alertSuccess").hide();
 	$("#alertError").text("");
 	$("#alertError").hide();

	// Form validation-------------------
	var status = validateComplaintForm();
	if (status != true)
	{
		 $("#alertError").text(status);
 		 $("#alertError").show();
 		 return;
 	}
 	
	// If valid-------------------------
 	var type = ($("#hidcomplaintidSave").val() == "") ? "POST" : "PUT";

	$.ajax(
 	{
 		url : "ComplaintsAPI",
 		type : type,
 		data : $("#formComplaint").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 		{
 			onComplaintSaveComplete(response.responseText, status);
 		}
 	}); 
 });

function onComplaintSaveComplete(response, status)
	{
		if (status == "success")
		{
			 var resultSet = JSON.parse(response);
 			 if (resultSet.status.trim() == "success")
			 {
 				$("#alertSuccess").text("Successfully saved.");
 				$("#alertSuccess").show();
 				$("#divComplaintsGrid").html(resultSet.data);
 			 } 
 			 else if (resultSet.status.trim() == "error")
			 {
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			 }
 		} 
 		else if (status == "error")
 		{
 			$("#alertError").text("Error while saving.");
 			$("#alertError").show();
 		} 
 		else
 		{
 			$("#alertError").text("Unknown error while saving..");
 			$("#alertError").show();
 		}
		$("#hidcomplaintidSave").val("");
 		$("#formComplaint")[0].reset();
}

	// UPDATE==========================================
	$(document).on("click", ".btnUpdate", function(event)
	{
		 $("#hidcomplaintidSave").val($(this).data("complaintid"));
		 $("#customername").val($(this).closest("tr").find('td:eq(0)').text());
		 $("#date").val($(this).closest("tr").find('td:eq(1)').text());
		 $("#location").val($(this).closest("tr").find('td:eq(2)').text());
 		 $("#problem").val($(this).closest("tr").find('td:eq(3)').text());
 		$("#problemstatus").val($(this).closest("tr").find('td:eq(4)').text());
 		$("#phonenumber").val($(this).closest("tr").find('td:eq(5)').text());
	});
	
	
	
	$(document).on("click", ".btnRemove", function(event)
	{
 		$.ajax(
 		{
 			url : "ComplaintsAPI",
 			type : "DELETE",
 			data : "complaintid=" + $(this).data("complaintid"),
 			dataType : "text",
 			complete : function(response, status)
 			{
 				onItemDeleteComplete(response.responseText, status);
 			}
 		});
	});


	function onComplaintDeleteComplete(response, status)
	{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 			{
 				$("#alertSuccess").text("Successfully deleted.");
 				$("#alertSuccess").show();
 				$("#divComplaintsGrid").html(resultSet.data);
 			} 
 			else if (resultSet.status.trim() == "error")
 			{
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
 			}
 		} 
 		else if (status == "error")
 		{
 				$("#alertError").text("Error while deleting.");
 				$("#alertError").show();
 		} 
 		else
 		{
 				$("#alertError").text("Unknown error while deleting..");
 				$("#alertError").show();
 		}
}
	

	// CLIENT-MODEL================================================================
	function validateComplaintForm()
	{
		// CODE
		if ($("#customername").val().trim() == "")
		{
 			return "Insert customer name.";
 		}

		// NAME
		if ($("#date").val().trim() == "")
 		{
 			return "Insert date.";
 		}

		// PRICE-------------------------------
		if ($("#location").val().trim() == "")
 		{
 			return "Insert location.";
 		}
 		
		if ($("#problem").val().trim() == "")
 		{
 			return "Insert problem.";
 		}

		// PRICE-------------------------------
		if ($("#problemstatus").val().trim() == "")
 		{
 			return "Insert problem status.";
 		}
		
		if ($("#phonenumber").val().trim() == "")
		{
 			return "Insert Item phonenumber.";
 		}

		return true;
	}
	
	
	
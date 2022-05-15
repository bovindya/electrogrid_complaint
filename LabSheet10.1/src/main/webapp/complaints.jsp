<%@page import="com.Complaint"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Complaint Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/items.js"></script>
</head>
<body>
<div class="container"><div class="row"><div class="col-6">

	<h1>Complaint Management </h1>

	<form id="formComplaint" name="formComplaint">
 		customer name:
 		<input id="customername" name="customername" type="text" class="form-control form-control-sm">
 		<br> 
 		date:
		<input id="date" name="date" type="text" class="form-control form-control-sm">
 		<br> 
 		location:
 		<input id="location" name="location" type="text" class="form-control form-control-sm">
 		<br> 
 		problem:
		<input id="problem" name="problem" type="text" class="form-control form-control-sm">
 		<br>
 		problem status:
 		<input id="problemstatus" name="problemstatus" type="text" class="form-control form-control-sm">
 		<br> 
 		phone number:
		<input id="phonenumber" name="phonenumber" type="text" class="form-control form-control-sm">
 		<br>
 		
 		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 		<input type="hidden" id="hidcomplaintidSave" name="hidcomplaintidSave" value="">
	</form>
	
	<div id="alertSuccess" class="alert alert-success"></div>
	<div id="alertError" class="alert alert-danger"></div>

	<br>
	<div id="divComplaintsGrid">
 		<%
 			Complaint complaintObj = new Complaint();
 			out.print(complaintObj.readComplaints());
 		%>
	</div>
</div> </div> </div>
</body>
</html>
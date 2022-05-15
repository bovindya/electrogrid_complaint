package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Complaint;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@WebServlet("/ComplaintsAPI")

public class ComplaintsAPI extends HttpServlet {
	
private static final long serialVersionUID = 1L;
    
	Complaint complaintObj = new Complaint(); 
	
    public ComplaintsAPI() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//NOT USED
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		String output = complaintObj.insertComplaint(request.getParameter("customername"),
							request.getParameter("date"),
							request.getParameter("location"),
							request.getParameter("problem"),
							request.getParameter("problemstatus"),
							request.getParameter("phonenumber"));
		
		response.getWriter().write(output);
		doGet(request, response);
	}

	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
    {
		Map<String, String> map = new HashMap<String, String>();
		try
		{
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ?
					scanner.useDelimiter("\\A").next() : "";
			scanner.close();
	 
			String[] params = queryString.split("&");
			for (String param : params)
			{ 
				String[] p = param.split("=");
				map.put(p[0], p[1]);
		    }
		 }
				
		 catch (Exception e)
	     {
		 }
		 
		return map;
	}


	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = complaintObj.updateComplaint( paras.get("hidcomplaintidSave").toString(),
				  						   paras.get("customername").toString(),
										   paras.get("date").toString(),
										   paras.get("location").toString(),
										   paras.get("problem").toString(),
										   paras.get("problemstatus").toString(),
										   paras.get("phonenumber").toString());
			
		response.getWriter().write(output);
	}
			
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = complaintObj.deleteComplaint(paras.get("complaintid").toString());
		response.getWriter().write(output);
	}

}


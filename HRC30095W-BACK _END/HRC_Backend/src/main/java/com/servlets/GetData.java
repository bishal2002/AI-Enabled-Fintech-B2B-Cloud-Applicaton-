package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.HighRadius.Winter_internship;

/**
 * Servlet implementation class GetData
 */
@WebServlet("/GetData")
public class GetData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetData() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		ArrayList<Winter_internship> invoices = new ArrayList<>();
		try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");
		PreparedStatement ps=con.prepareStatement("select * from winter_internship limit 500");
		
		ResultSet rs=ps.executeQuery();
		while(rs.next())
		{
			Winter_internship inv = new Winter_internship();
			inv.setSl_no(rs.getInt("sl_no"));
			inv.setBusiness_code(rs.getString("business_code"));
			inv.setCust_number(rs.getInt("cust_number"));
			inv.setClear_date(rs.getString("clear_date"));
			inv.setBuisness_year(rs.getString("buisness_year"));
			inv.setDoc_id(rs.getString("doc_id"));
			inv.setPosting_date(rs.getString("posting_date"));
			inv.setDue_in_date(rs.getString("due_in_date"));
			inv.setInvoice_currency(rs.getString("invoice_currency"));
			inv.setDocument_type(rs.getString("document_type"));
			inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
			inv.setBaseline_create_date(rs.getString("baseline_create_date"));
			inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
			inv.setInvoice_id(rs.getInt("invoice_id"));
			inv.setIsOpen(rs.getInt("isOpen"));
			inv.setAging_bucket(rs.getString("aging_bucket"));
			inv.setIs_deleted(rs.getInt("is_deleted"));


			invoices.add(inv);
		}
		//inv.put("invoices", invoices);

	}catch (Exception e) {
		e.printStackTrace();
	}
		Gson gson = new Gson();
		String jsonResponse  = gson.toJson(invoices);
		response.setHeader("Access-Control-Allow-Origin", "*");
	    response.getWriter().append(jsonResponse);
}	

	
	}



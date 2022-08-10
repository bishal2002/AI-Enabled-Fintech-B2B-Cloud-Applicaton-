package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.HighRadius.InvoiceDAO;
import com.pojo.Invoice;

/**
 * Servlet implementation class EditInvoice
 */
@WebServlet("/edit")
public class EditInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//	}
//
//	/**
//	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
//	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		// TODO Auto-generated method stub
		try {
			String sl_no = request.getParameter("sl_no");
			String invoice_currency = request.getParameter("invoice_currency");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			 
			int slno = Integer.parseInt(sl_no);
			
			Invoice existingInvoice = InvoiceDAO.selectInvoice(slno);
			
			if(sl_no==null) {
				sl_no=Integer.toString(existingInvoice.getSl_no());
			}
			if(invoice_currency==null) {
				invoice_currency=existingInvoice.getInvoice_currency();
			}
			if(cust_payment_terms==null) {
				cust_payment_terms=existingInvoice.getCust_payment_terms();
			}
			
			Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");
			 String query="UPDATE winter_internship SET invoice_currency =? ,cust_payment_terms=? WHERE sl_no=?";
			 PreparedStatement st= con.prepareStatement(query);
			 st.setString(1, invoice_currency);
			 st.setString(2, cust_payment_terms);
			 st.setString(3, sl_no);
			 st.executeUpdate();
			 System.out.println(st);
			 con.close();
			
			Invoice updatedinvoice = InvoiceDAO.selectInvoice(slno);
			Gson gson = new GsonBuilder().serializeNulls().create();
			response.setHeader("Access-Control-Allow-Origin", "*");
			String invoices  = gson.toJson(updatedinvoice);
//			response.setContentType("application/json");
			response.getWriter().append(invoices);
			try {
				response.getWriter().write(invoices);//getWriter() returns a PrintWriter object that can send character text to the client. 
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			
			//CORS POLICY -- ISSUE
			
			
			}
		catch (Exception e){
			e.printStackTrace();
		}
		
	}

}

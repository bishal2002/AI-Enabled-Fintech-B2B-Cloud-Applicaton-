package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.HighRadius.Winter_internship;
import com.google.gson.Gson;



/**
 * Servlet implementation class SearchInvoice
 */
@WebServlet("/SearchInvoice")
public class AdvancedSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdvancedSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		int rowCount = 12;*/
		
		try {
			HashMap<Object, Object> Response  = new HashMap<Object,Object>();
			ArrayList<Winter_internship> invoice = new ArrayList<>();
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","Root");			
			//String page = request.getParameter("page");
			String doc_id=request.getParameter("doc_id");
			String buisness_year=request.getParameter("buisness_year");
			String cust_number=request.getParameter("cust_number");
			String invoice_id=request.getParameter("invoice_id");

			
			
			Statement st = con.createStatement();
			String sql_statement = "SELECT * FROM winter_internship" +"WHERE doc_id = " + doc_id + "and cust_number = " +cust_number + 
					"and buisness_year = " + buisness_year + "and invoice_id = " + invoice_id;
					;// + "%' LIMIT " + page +"," + rowCount;
			ResultSet rs = st.executeQuery(sql_statement);

		
			while(rs.next()) {
				Winter_internship inv = new Winter_internship();
				inv.setDoc_id(rs.getString("doc_id"));
				inv.setCust_number(rs.getInt("Cust_number"));
				inv.setInvoice_id(rs.getInt("Invoice_id"));
				inv.setBuisness_year(rs.getString("Buisness_year"));
				invoice.add(inv);
			}
			
			/*Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices = gson.toJson(data);

			out.print(invoices);
			response.setStatus(200);
			out.flush();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}*/
			Gson gson = new Gson();
			String invoices  = gson.toJson(Response);
			response.setContentType("application/json");
			try {
				response.getWriter().write(invoices);//getWriter() returns a PrintWriter object that can send character text to the client. 
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			rs.close();
			st.close();
			con.close();
			
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

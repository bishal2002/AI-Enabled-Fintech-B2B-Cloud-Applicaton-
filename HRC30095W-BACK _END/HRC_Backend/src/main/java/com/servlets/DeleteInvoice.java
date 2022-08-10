package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.HighRadius.*;

/**
 * Servlet implementation class DeleteInvoice
 */
@WebServlet("/delete")
public class DeleteInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			String sl_no = request.getParameter("sl_no");
			int id = Integer.parseInt(sl_no);

			Connection con = dbconnection.createConnect();
			String query = "DELETE FROM winter_internship WHERE sl_no = ?";
			

				PreparedStatement st = con.prepareStatement(query);
				st.setInt(1, id);
				st.executeUpdate();
				System.out.print(st);
				con.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		response.setHeader("Access-Control-Allow-Origin", "*");
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub


//		doGet(request, response);
	}

	

}

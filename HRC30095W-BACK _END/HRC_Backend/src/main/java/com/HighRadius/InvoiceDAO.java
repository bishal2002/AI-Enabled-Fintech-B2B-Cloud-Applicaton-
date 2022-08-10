package com.HighRadius;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.pojo.Invoice;

public class InvoiceDAO {


	 public static Invoice selectInvoice(int id) {
         Invoice invoice = null;
        
         try { 
        	 Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","root");
        		 String query="SELECT  sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1, due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted from winter_internship where sl_no=?";
        		 PreparedStatement st= con.prepareStatement(query);
        		 st.setInt(1, id);
        		 System.out.println(st);
        		 ResultSet rs = st.executeQuery();
        		 while (rs.next()) {
        			invoice = new Invoice();
	                invoice.setSl_no(rs.getInt("sl_no"));
	                invoice.setBusiness_code(rs.getString("business_code"));
	 				invoice.setCust_number(rs.getInt("cust_number"));
	 				invoice.setClear_date(rs.getString("clear_date"));
	 				invoice.setBuisness_year(rs.getString("buisness_year"));
	 				invoice.setDoc_id(rs.getString("doc_id"));
	 				invoice.setPosting_date(rs.getString("posting_date"));
	 				invoice.setDocument_create_date(rs.getString("document_create_date"));
	 				invoice.setDocument_create_date1(rs.getString("document_create_date1"));
	 				invoice.setDue_in_date(rs.getString("due_in_date"));
	 				invoice.setInvoice_currency(rs.getString("invoice_currency"));
	 				invoice.setDocument_type(rs.getString("document_type"));
	 				invoice.setPosting_id(rs.getInt("posting_id"));
	 				invoice.setArea_business(rs.getString("area_business"));
	 				invoice.setTotal_open_amount(rs.getInt("total_open_amount"));
	 				invoice.setBaseline_create_date(rs.getString("baseline_create_date"));
	 				invoice.setCust_payment_terms(rs.getString("cust_payment_terms"));
	 				invoice.setInvoice_id(rs.getInt("invoice_id"));
	 				invoice.setIsOpen(rs.getInt("isOpen"));
	 				invoice.setAging_bucket(rs.getString("aging_bucket"));
	 				invoice.setIs_deleted(rs.getInt("is_deleted"));
	 				
             }
         } catch (SQLException e) {
             e.printStackTrace();
         }
         return invoice;
     }
}

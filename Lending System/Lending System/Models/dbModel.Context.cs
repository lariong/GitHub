﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Lending_System.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class db_lendingEntities : DbContext
    {
        public db_lendingEntities()
            : base("name=db_lendingEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tbl_customer> tbl_customer { get; set; }
        public virtual DbSet<tbl_department> tbl_department { get; set; }
        public virtual DbSet<tbl_terminal> tbl_terminal { get; set; }
        public virtual DbSet<tbl_user> tbl_user { get; set; }
        public virtual DbSet<tbl_user_rank> tbl_user_rank { get; set; }
        public virtual DbSet<tbl_fees> tbl_fees { get; set; }
        public virtual DbSet<tbl_loan_type_charges> tbl_loan_type_charges { get; set; }
        public virtual DbSet<tbl_amortization> tbl_amortization { get; set; }
        public virtual DbSet<tbl_loan_processing> tbl_loan_processing { get; set; }
        public virtual DbSet<tbl_loan_type> tbl_loan_type { get; set; }
        public virtual DbSet<tbl_loan_processing_amortization_schedule> tbl_loan_processing_amortization_schedule { get; set; }
        public virtual DbSet<tbl_loan_ledger> tbl_loan_ledger { get; set; }
    }
}
